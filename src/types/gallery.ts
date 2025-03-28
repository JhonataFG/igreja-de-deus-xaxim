
export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  created_at: string;
  event_id?: string | null;
  album_id?: string | null;
}

export interface GalleryFormValues {
  title: string;
  description: string;
  category: string;
  image: string;
  event_id?: string | null;
  album_id?: string | null;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  description: string;
  category: string;
  cover_image: string;
  created_at: string;
  event_id?: string | null;
  items_count: number;
}

export interface GalleryAlbumFormValues {
  title: string;
  description: string;
  category: string;
  cover_image: string;
  event_id?: string | null;
  images: string[];
}
