
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { GalleryItem, GalleryFormValues, GalleryAlbum, GalleryAlbumFormValues } from "@/types/gallery";

export const useGallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [galleryAlbums, setGalleryAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      // Fetch single images (where album_id is null)
      const { data: singleItems, error: singleItemsError } = await supabase
        .from('gallery')
        .select('*')
        .is('album_id', null)
        .order('created_at', { ascending: false });

      if (singleItemsError) {
        throw singleItemsError;
      }

      // Fetch albums
      const { data: albums, error: albumsError } = await supabase
        .from('gallery_albums')
        .select('*, items_count:gallery(count)')
        .order('created_at', { ascending: false });

      if (albumsError) {
        throw albumsError;
      }

      // Process albums to get correct count
      const processedAlbums = albums.map(album => ({
        ...album,
        items_count: (album.items_count as any)?.count || 0
      }));

      if (singleItems) {
        setGalleryItems(singleItems as GalleryItem[]);
      }
      
      if (albums) {
        setGalleryAlbums(processedAlbums as GalleryAlbum[]);
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os itens da galeria.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createGalleryItem = async (values: GalleryFormValues | GalleryAlbumFormValues, isAlbum: boolean) => {
    try {
      if (isAlbum) {
        const albumValues = values as GalleryAlbumFormValues;
        // First create the album
        const { data: albumData, error: albumError } = await supabase
          .from('gallery_albums')
          .insert([{
            title: albumValues.title,
            description: albumValues.description,
            category: albumValues.category,
            cover_image: albumValues.cover_image,
            event_id: albumValues.event_id || null
          }])
          .select();

        if (albumError) {
          throw albumError;
        }

        if (albumData && albumData[0]) {
          const albumId = albumData[0].id;
          
          // Then create all the gallery items associated with this album
          const galleryItems = albumValues.images.map(imageUrl => ({
            title: albumValues.title,
            description: albumValues.description,
            category: albumValues.category,
            image: imageUrl,
            album_id: albumId,
            event_id: albumValues.event_id || null
          }));
          
          const { data: itemsData, error: itemsError } = await supabase
            .from('gallery')
            .insert(galleryItems)
            .select();
            
          if (itemsError) {
            throw itemsError;
          }
          
          // Refresh the gallery data
          await fetchGalleryItems();
          
          toast({
            title: "Álbum adicionado",
            description: "O álbum foi adicionado à galeria com sucesso.",
          });
          return true;
        }
      } else {
        // Create a single gallery item
        const itemValues = values as GalleryFormValues;
        const { data, error } = await supabase
          .from('gallery')
          .insert([itemValues])
          .select();

        if (error) {
          throw error;
        }

        if (data) {
          setGalleryItems([data[0] as GalleryItem, ...galleryItems]);
          toast({
            title: "Item adicionado",
            description: "O item foi adicionado à galeria com sucesso.",
          });
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error creating gallery item:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o item à galeria.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateGalleryItem = async (id: string, values: GalleryFormValues) => {
    try {
      // Get the current gallery item to check if image has changed
      const { data: currentItem } = await supabase
        .from('gallery')
        .select('image')
        .eq('id', id)
        .single();
      
      // If image URL has changed and it's from storage, delete the old image
      if (currentItem && currentItem.image !== values.image && 
          currentItem.image.includes('storage.googleapis.com')) {
        try {
          const fileName = currentItem.image.split('/').pop();
          if (fileName) {
            await supabase.storage.from('gallery').remove([fileName]);
          }
        } catch (error) {
          console.error('Error deleting old image:', error);
          // Continue with update even if image deletion fails
        }
      }

      const { data, error } = await supabase
        .from('gallery')
        .update(values)
        .eq('id', id)
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        setGalleryItems(galleryItems.map(item => item.id === id ? data[0] as GalleryItem : item));
        toast({
          title: "Item atualizado",
          description: "O item foi atualizado com sucesso.",
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating gallery item:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o item da galeria.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteGalleryItem = async (id: string, isAlbum = false) => {
    try {
      if (isAlbum) {
        // First get all images in the album
        const { data: albumImages } = await supabase
          .from('gallery')
          .select('id, image')
          .eq('album_id', id);
        
        // Delete all images in the album
        if (albumImages && albumImages.length > 0) {
          const imageIds = albumImages.map(img => img.id);
          await supabase.from('gallery').delete().in('id', imageIds);
          
          // Delete image files from storage
          for (const img of albumImages) {
            if (img.image && img.image.includes('storage.googleapis.com')) {
              try {
                const fileName = img.image.split('/').pop();
                if (fileName) {
                  await supabase.storage.from('gallery').remove([fileName]);
                }
              } catch (error) {
                console.error('Error deleting album image file:', error);
                // Continue with deletion even if file removal fails
              }
            }
          }
        }
        
        // Delete the album cover image
        const { data: album } = await supabase
          .from('gallery_albums')
          .select('cover_image')
          .eq('id', id)
          .single();
        
        if (album?.cover_image && album.cover_image.includes('storage.googleapis.com')) {
          try {
            const fileName = album.cover_image.split('/').pop();
            if (fileName) {
              await supabase.storage.from('gallery').remove([fileName]);
            }
          } catch (error) {
            console.error('Error deleting album cover image:', error);
            // Continue with deletion even if file removal fails
          }
        }
        
        // Finally delete the album
        const { error } = await supabase
          .from('gallery_albums')
          .delete()
          .eq('id', id);

        if (error) {
          throw error;
        }
        
        setGalleryAlbums(galleryAlbums.filter(album => album.id !== id));
        toast({
          title: "Álbum excluído",
          description: "O álbum foi removido da galeria com sucesso.",
        });
      } else {
        // Delete a single gallery item
        // First, get the gallery item to check if it has an image from storage
        const { data: item } = await supabase
          .from('gallery')
          .select('image')
          .eq('id', id)
          .single();
        
        // If item has a storage image, delete it
        if (item?.image && item.image.includes('storage.googleapis.com')) {
          try {
            const fileName = item.image.split('/').pop();
            if (fileName) {
              await supabase.storage.from('gallery').remove([fileName]);
            }
          } catch (error) {
            console.error('Error deleting gallery image:', error);
            // Continue with item deletion even if image deletion fails
          }
        }

        const { error } = await supabase
          .from('gallery')
          .delete()
          .eq('id', id);

        if (error) {
          throw error;
        }

        setGalleryItems(galleryItems.filter(item => item.id !== id));
        toast({
          title: "Item excluído",
          description: "O item foi removido da galeria com sucesso.",
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o item da galeria.",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const getAlbumItems = async (albumId: string) => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('album_id', albumId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data as GalleryItem[];
    } catch (error) {
      console.error('Error fetching album items:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as imagens do álbum.",
        variant: "destructive",
      });
      return [];
    }
  };

  const getCategories = () => {
    const categoriesSet = new Set<string>();
    galleryItems.forEach(item => categoriesSet.add(item.category));
    galleryAlbums.forEach(album => categoriesSet.add(album.category));
    return Array.from(categoriesSet);
  };

  const getFilteredGalleryItems = () => {
    return galleryItems.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getFilteredGalleryAlbums = () => {
    return galleryAlbums.filter(album => 
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  return {
    galleryItems,
    galleryAlbums,
    loading,
    searchTerm,
    setSearchTerm,
    filteredGalleryItems: getFilteredGalleryItems(),
    filteredGalleryAlbums: getFilteredGalleryAlbums(),
    categories: getCategories(),
    fetchGalleryItems,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    getAlbumItems
  };
};
