
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GalleryForm from "./GalleryForm";
import { GalleryFormValues, GalleryItem } from "@/types/gallery";

interface GalleryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: GalleryFormValues) => Promise<boolean>;
  item?: GalleryItem;
  title: string;
  categories: string[];
}

const GalleryDialog = ({ isOpen, onOpenChange, onSubmit, item, title, categories }: GalleryDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: GalleryFormValues) => {
    setIsSubmitting(true);
    const success = await onSubmit(values);
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
        <GalleryForm 
          defaultValues={item ? {
            title: item.title,
            description: item.description,
            category: item.category,
            image: item.image,
          } : undefined}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          categories={categories}
        />
      </DialogContent>
    </Dialog>
  );
};

export default GalleryDialog;
