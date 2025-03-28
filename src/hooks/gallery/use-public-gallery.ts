
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GalleryItem, GalleryAlbum } from "@/types/gallery";

export const usePublicGallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [galleryAlbums, setGalleryAlbums] = useState<GalleryAlbum[]>([]);
  const [albumImages, setAlbumImages] = useState<{[key: string]: GalleryItem[]}>({});
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        
        // Fetch single images (where album_id is null)
        const { data: images, error: imagesError } = await supabase
          .from('gallery')
          .select('*')
          .is('album_id', null)
          .order('created_at', { ascending: false });
        
        if (imagesError) throw imagesError;
        
        // Fetch albums
        const { data: albums, error: albumsError } = await supabase
          .from('gallery_albums')
          .select('*, items_count:gallery(count)')
          .order('created_at', { ascending: false });
        
        if (albumsError) throw albumsError;
        
        // Process data
        const processedAlbums = albums.map(album => ({
          ...album,
          items_count: (album.items_count as any)?.count || 0
        }));
        
        // Extract categories
        const allCategories = new Set<string>();
        
        if (images) {
          images.forEach(item => {
            if (item.category) allCategories.add(item.category);
          });
          setGalleryItems(images as GalleryItem[]);
        }
        
        if (processedAlbums) {
          processedAlbums.forEach(album => {
            if (album.category) allCategories.add(album.category);
          });
          setGalleryAlbums(processedAlbums as GalleryAlbum[]);
          
          // Pre-fetch album images for the first few albums
          for (const album of processedAlbums.slice(0, 3)) {
            fetchAlbumImages(album.id);
          }
        }
        
        setCategories(Array.from(allCategories));
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const fetchAlbumImages = async (albumId: string) => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('album_id', albumId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        setAlbumImages(prev => ({
          ...prev,
          [albumId]: data as GalleryItem[]
        }));
      }
      
      return data as GalleryItem[];
    } catch (error) {
      console.error(`Error fetching album images for album ${albumId}:`, error);
      return [];
    }
  };

  const getAlbumImages = async (albumId: string) => {
    if (albumImages[albumId]) {
      return albumImages[albumId];
    }
    
    return await fetchAlbumImages(albumId);
  };

  return {
    galleryItems,
    galleryAlbums,
    loading,
    categories,
    getAlbumImages,
    albumImages
  };
};
