
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GalleryForm from "./GalleryForm";
import { GalleryFormValues, GalleryItem, GalleryAlbumFormValues } from "@/types/gallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GalleryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: GalleryFormValues | GalleryAlbumFormValues, isAlbum: boolean) => Promise<boolean>;
  item?: GalleryItem;
  title: string;
  categories: string[];
}

const GalleryDialog = ({ isOpen, onOpenChange, onSubmit, item, title, categories }: GalleryDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("single");

  const handleSubmit = async (values: GalleryFormValues | GalleryAlbumFormValues) => {
    setIsSubmitting(true);
    const success = await onSubmit(values, activeTab === "album");
    setIsSubmitting(false);
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        {!item && (
          <Tabs defaultValue="single" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="single">Imagem Única</TabsTrigger>
              <TabsTrigger value="album">Álbum de Fotos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="single">
              <GalleryForm 
                defaultValues={undefined}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                categories={categories}
                isAlbum={false}
              />
            </TabsContent>
            
            <TabsContent value="album">
              <GalleryForm 
                defaultValues={undefined}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                categories={categories}
                isAlbum={true}
              />
            </TabsContent>
          </Tabs>
        )}
        
        {item && (
          <GalleryForm 
            defaultValues={item}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            categories={categories}
            isAlbum={false}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GalleryDialog;
