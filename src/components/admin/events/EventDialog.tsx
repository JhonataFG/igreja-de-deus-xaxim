
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EventForm from "./EventForm";
import { EventFormValues, EventProps } from "@/types/event";

interface EventDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: EventFormValues) => void;
  event?: EventProps;
  title: string;
}

const EventDialog = ({ isOpen, onOpenChange, onSubmit, event, title }: EventDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: EventFormValues) => {
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
        <EventForm 
          defaultValues={event ? {
            title: event.title,
            date: event.date,
            time: event.time,
            location: event.location,
            description: event.description,
            image: event.image,
          } : undefined}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
