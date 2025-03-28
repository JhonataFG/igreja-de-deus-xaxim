
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GalleryItem, GalleryAlbum } from "@/types/gallery";

export const usePublicGallery = (limit?: number) => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch individual gallery items (not in albums)
      let itemsQuery = supabase
        .from('gallery')
        .select('*')
        .is('album_id', null)
        .order('created_at', { ascending: false });
      
      if (limit) {
        itemsQuery = itemsQuery.limit(limit);
      }

      const { data: itemsData, error: itemsError } = await itemsQuery;

      if (itemsError) {
        throw itemsError;
      }

      // Fetch albums with count of images
      let albumsQuery = supabase
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
      
      if (limit) {
        albumsQuery = albumsQuery.limit(limit);
      }

      const { data: albumsData, error: albumsError } = await albumsQuery;

      if (albumsError) {
        throw albumsError;
      }

      // Set the data
      setItems(itemsData as GalleryItem[]);
      setAlbums(albumsData as GalleryAlbum[]);

      // Extract unique categories
      const allItems = [...itemsData, ...albumsData];
      const uniqueCategories = [...new Set(allItems.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      setError('Não foi possível carregar a galeria.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAlbumItems = async (albumId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch album details
      const { data: albumData, error: albumError } = await supabase
        .from('gallery_albums')
        .select('*')
        .eq('id', albumId)
        .single();

      if (albumError) {
        throw albumError;
      }

      // Fetch items in the album
      const { data: albumItems, error: itemsError } = await supabase
        .from('gallery')
        .select('*')
        .eq('album_id', albumId)
        .order('created_at', { ascending: false });

      if (itemsError) {
        throw itemsError;
      }

      return {
        album: albumData as GalleryAlbum,
        items: albumItems as GalleryItem[]
      };
    } catch (error) {
      console.error('Error fetching album items:', error);
      setError('Não foi possível carregar os itens do álbum.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getFilteredItems = () => {
    if (selectedCategory === "all") {
      return items;
    }
    return items.filter(item => item.category === selectedCategory);
  };

  const getFilteredAlbums = () => {
    if (selectedCategory === "all") {
      return albums;
    }
    return albums.filter(album => album.category === selectedCategory);
  };

  useEffect(() => {
    fetchGallery();
  }, [limit]);

  return {
    items: getFilteredItems(),
    albums: getFilteredAlbums(),
    allItems: items,
    allAlbums: albums,
    loading,
    error,
    categories,
    selectedCategory,
    setSelectedCategory,
    fetchGallery,
    fetchAlbumItems
  };
};
