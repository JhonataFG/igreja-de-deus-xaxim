
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { GalleryItem, GalleryFormValues } from "@/types/gallery";

export const useGallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setGalleryItems(data as GalleryItem[]);
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

  const createGalleryItem = async (values: GalleryFormValues) => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .insert([values])
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

  const deleteGalleryItem = async (id: string) => {
    try {
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

  const getCategories = () => {
    const categories = new Set<string>();
    galleryItems.forEach(item => categories.add(item.category));
    return Array.from(categories);
  };

  const getFilteredGalleryItems = () => {
    return galleryItems.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  return {
    galleryItems,
    loading,
    searchTerm,
    setSearchTerm,
    filteredGalleryItems: getFilteredGalleryItems(),
    categories: getCategories(),
    fetchGalleryItems,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem
  };
};
