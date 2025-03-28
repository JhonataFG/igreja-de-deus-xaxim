
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EventFormValues } from "@/types/event";
import ImageUpload, { ImageUploadRef } from "@/components/admin/common/ImageUpload";
import { useRef } from "react";

const formSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  date: z.string().min(1, "A data é obrigatória"),
  time: z.string().min(1, "O horário é obrigatório"),
  location: z.string().min(3, "O local deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  image: z.string().min(1, "A imagem é obrigatória"),
});

interface EventFormProps {
  defaultValues?: EventFormValues;
  onSubmit: (values: EventFormValues) => void;
  isSubmitting: boolean;
}

const EventForm = ({ defaultValues, onSubmit, isSubmitting }: EventFormProps) => {
  const imageUploadRef = useRef<ImageUploadRef>(null);
  
  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      image: "",
    },
  });

  const handleSubmit = async (values: EventFormValues) => {
    try {
      // Upload the image first if there's a pending upload
      if (imageUploadRef.current) {
        const imageUrl = await imageUploadRef.current.uploadImage();
        if (imageUrl) {
          values.image = imageUrl;
        }
      }
      
      // Then submit the form with the updated image URL
      onSubmit(values);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título do evento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Local</FormLabel>
              <FormControl>
                <Input placeholder="Local do evento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagem</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={(url) => {
                    field.onChange(url || ""); // Only update the form with a URL if in preview mode
                  }}
                  bucketName="events"
                  hint="Recomendado: 1200 x 630 pixels, máximo 5MB"
                  previewMode={true}
                  ref={imageUploadRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descreva o evento" 
                  rows={4}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : defaultValues ? "Atualizar Evento" : "Criar Evento"}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
