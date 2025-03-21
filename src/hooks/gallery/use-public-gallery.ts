
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GalleryItem } from "@/types/gallery";

export const usePublicGallery = (limit?: number) => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      if (data) {
        setGalleryItems(data as GalleryItem[]);
        
        // Extract unique categories
        const uniqueCategories = new Set<string>();
        data.forEach(item => uniqueCategories.add(item.category));
        setCategories(Array.from(uniqueCategories));
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      setError('Não foi possível carregar os itens da galeria.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, [limit]);

  return {
    galleryItems,
    categories,
    loading,
    error,
    fetchGalleryItems
  };
};
