
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CarouselForm, { CarouselFormValues } from "./CarouselForm";
import { CarouselSlide } from "@/types/carousel";

interface CarouselDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CarouselFormValues) => Promise<boolean>;
  slide?: CarouselSlide;
  title: string;
  maxPosition: number;
}

const CarouselDialog = ({ 
  isOpen, 
  onOpenChange, 
  onSubmit, 
  slide, 
  title,
  maxPosition 
}: CarouselDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: CarouselFormValues) => {
    setIsSubmitting(true);
    const success = await onSubmit(values);
    setIsSubmitting(false);
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <CarouselForm 
          defaultValues={slide ? {
            title: slide.title,
            subtitle: slide.subtitle,
            image: slide.image,
            order_position: slide.order_position,
          } : undefined}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          maxPosition={maxPosition}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CarouselDialog;
