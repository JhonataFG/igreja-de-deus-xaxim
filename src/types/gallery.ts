
export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  created_at: string;
}

export interface GalleryFormValues {
  title: string;
  description: string;
  category: string;
  image: string;
}
