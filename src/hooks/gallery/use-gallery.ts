
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { GalleryItem, GalleryFormValues, GalleryAlbum, GalleryAlbumFormValues } from "@/types/gallery";
import { v4 as uuidv4 } from "uuid";

export const useGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);
  const { toast } = useToast();

  const fetchItems = async () => {
    try {
      setLoading(true);
      
      // Fetch single images (not in albums)
      const { data: galleryData, error: galleryError } = await supabase
        .from('gallery')
        .select('*')
        .is('album_id', null)
        .order('created_at', { ascending: false });

      if (galleryError) {
        throw galleryError;
      }

      // Fetch albums with count of images
      const { data: albumsData, error: albumsError } = await supabase
        .from('gallery_albums')
        .select(`
          id, 
          title, 
          description, 
          category, 
          cover_image, 
          created_at,
          event_id,
          (SELECT count(*) FROM gallery WHERE album_id = gallery_albums.id) as items_count
        `)
        .order('created_at', { ascending: false });

      if (albumsError) {
        throw albumsError;
      }

      if (galleryData) {
        setItems(galleryData as GalleryItem[]);
      }

      if (albumsData) {
        setAlbums(albumsData as GalleryAlbum[]);
      }

      // Extract unique categories
      const allItems = [...galleryData, ...albumsData];
      const uniqueCategories = [...new Set(allItems.map(item => item.category))];
      setCategories(uniqueCategories);
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

  const createAlbum = async (values: GalleryAlbumFormValues): Promise<boolean> => {
    try {
      // First, create the album
      const { data: albumData, error: albumError } = await supabase
        .from('gallery_albums')
        .insert({
          title: values.title,
          description: values.description,
          category: values.category,
          cover_image: values.cover_image,
          event_id: values.event_id || null
        })
        .select()
        .single();

      if (albumError) {
        throw albumError;
      }

      if (!albumData) {
        throw new Error('Failed to create album');
      }

      // Then, create all the images for this album
      const imagesToInsert = values.images.map(image => ({
        title: values.title, // Use album title as default for all images
        description: values.description, // Use album description as default
        category: values.category,
        image: image,
        album_id: albumData.id,
        event_id: values.event_id || null
      }));

      // Insert all images
      if (imagesToInsert.length > 0) {
        const { error: imagesError } = await supabase
          .from('gallery')
          .insert(imagesToInsert);

        if (imagesError) {
          throw imagesError;
        }
      }

      // Refresh the gallery items
      fetchItems();

      toast({
        title: "Álbum criado",
        description: "O álbum foi criado com sucesso.",
      });

      return true;
    } catch (error) {
      console.error('Error creating album:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o álbum.",
        variant: "destructive",
      });
      return false;
    }
  };

  const createItem = async (values: GalleryFormValues): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .insert([values])
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        setItems([data[0] as GalleryItem, ...items]);
        
        // Update categories if a new one was added
        if (!categories.includes(values.category)) {
          setCategories([...categories, values.category]);
        }
        
        toast({
          title: "Item adicionado",
          description: "O item foi adicionado à galeria com sucesso.",
        });
        
        return true;
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

  const updateItem = async (id: string, values: GalleryFormValues): Promise<boolean> => {
    try {
      // Get the current item to check if image has changed
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
        setItems(items.map(item => item.id === id ? data[0] as GalleryItem : item));
        
        // Update categories if a new one was added
        if (!categories.includes(values.category)) {
          setCategories([...categories, values.category]);
        }
        
        toast({
          title: "Item atualizado",
          description: "O item da galeria foi atualizado com sucesso.",
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

  const updateAlbum = async (id: string, values: GalleryAlbumFormValues): Promise<boolean> => {
    try {
      // Get the current album to check if cover image has changed
      const { data: currentAlbum } = await supabase
        .from('gallery_albums')
        .select('cover_image')
        .eq('id', id)
        .single();
      
      // If cover image URL has changed and it's from storage, delete the old image
      if (currentAlbum && currentAlbum.cover_image !== values.cover_image && 
          currentAlbum.cover_image.includes('storage.googleapis.com')) {
        try {
          const fileName = currentAlbum.cover_image.split('/').pop();
          if (fileName) {
            await supabase.storage.from('gallery').remove([fileName]);
          }
        } catch (error) {
          console.error('Error deleting old cover image:', error);
          // Continue with update even if image deletion fails
        }
      }

      // Update the album
      const { data, error } = await supabase
        .from('gallery_albums')
        .update({
          title: values.title,
          description: values.description,
          category: values.category,
          cover_image: values.cover_image,
          event_id: values.event_id || null
        })
        .eq('id', id)
        .select();

      if (error) {
        throw error;
      }

      // Refresh data after update
      fetchItems();
      
      toast({
        title: "Álbum atualizado",
        description: "O álbum foi atualizado com sucesso.",
      });
      
      return true;
    } catch (error) {
      console.error('Error updating album:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o álbum.",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const deleteItem = async (id: string): Promise<boolean> => {
    try {
      // First, get the item to check if it has an image from storage
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

      setItems(items.filter(item => item.id !== id));
      
      toast({
        title: "Item excluído",
        description: "O item foi removido da galeria com sucesso.",
      });
      
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

  const deleteAlbum = async (id: string): Promise<boolean> => {
    try {
      // Get all images in the album
      const { data: albumImages } = await supabase
        .from('gallery')
        .select('image')
        .eq('album_id', id);
      
      // Get the album cover image
      const { data: album } = await supabase
        .from('gallery_albums')
        .select('cover_image')
        .eq('id', id)
        .single();
      
      // Delete all images in the album first
      const { error: deleteImagesError } = await supabase
        .from('gallery')
        .delete()
        .eq('album_id', id);
      
      if (deleteImagesError) {
        throw deleteImagesError;
      }
      
      // Then delete the album
      const { error: deleteAlbumError } = await supabase
        .from('gallery_albums')
        .delete()
        .eq('id', id);
      
      if (deleteAlbumError) {
        throw deleteAlbumError;
      }
      
      // Delete image files from storage if they're stored there
      try {
        // Delete album cover image if it's in storage
        if (album?.cover_image && album.cover_image.includes('storage.googleapis.com')) {
          const coverFileName = album.cover_image.split('/').pop();
          if (coverFileName) {
            await supabase.storage.from('gallery').remove([coverFileName]);
          }
        }
        
        // Delete all album images from storage
        if (albumImages) {
          const fileNames = albumImages
            .filter(img => img.image.includes('storage.googleapis.com'))
            .map(img => img.image.split('/').pop());
          
          if (fileNames.length > 0) {
            await supabase.storage.from('gallery').remove(fileNames);
          }
        }
      } catch (error) {
        console.error('Error deleting album images from storage:', error);
        // Continue even if storage deletion fails
      }
      
      // Refresh data
      fetchItems();
      
      toast({
        title: "Álbum excluído",
        description: "O álbum e todas as suas imagens foram removidos com sucesso.",
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting album:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o álbum.",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const getFilteredItems = () => {
    let filtered = [...items];
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    return filtered;
  };

  const getFilteredAlbums = () => {
    let filtered = [...albums];
    
    if (searchTerm) {
      filtered = filtered.filter(album => 
        album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(album => album.category === selectedCategory);
    }
    
    return filtered;
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    albums,
    loading,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredItems: getFilteredItems(),
    filteredAlbums: getFilteredAlbums(),
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    createAlbum,
    updateAlbum,
    deleteAlbum
  };
};
