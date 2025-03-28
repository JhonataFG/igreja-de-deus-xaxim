
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GalleryFormValues, GalleryAlbumFormValues } from "@/types/gallery";
import ImageUpload, { ImageUploadRef } from "@/components/admin/common/ImageUpload";
import { useRef, useState } from "react";
import { EventProps } from "@/types/event";
import { useEvents } from "@/hooks/events/use-events";
import { X, Plus } from "lucide-react";

interface GalleryFormProps {
  defaultValues?: GalleryFormValues | GalleryAlbumFormValues;
  onSubmit: (values: GalleryFormValues | GalleryAlbumFormValues) => void;
  isSubmitting: boolean;
  categories: string[];
  isAlbum?: boolean;
}

const singleImageSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  category: z.string().min(1, "A categoria é obrigatória"),
  image: z.string().min(1, "A imagem é obrigatória"),
  event_id: z.string().nullable().optional(),
  album_id: z.string().nullable().optional(),
});

const albumSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  category: z.string().min(1, "A categoria é obrigatória"),
  cover_image: z.string().min(1, "A imagem de capa é obrigatória"),
  event_id: z.string().nullable().optional(),
  images: z.array(z.string()).min(1, "Adicione pelo menos uma imagem ao álbum"),
});

const GalleryForm = ({ defaultValues, onSubmit, isSubmitting, categories, isAlbum = false }: GalleryFormProps) => {
  const mainImageUploadRef = useRef<ImageUploadRef>(null);
  const [additionalImages, setAdditionalImages] = useState<Array<{id: string, file: File | null, url: string | null}>>([]);
  const [additionalImageRefs, setAdditionalImageRefs] = useState<{[key: string]: React.RefObject<ImageUploadRef>}>({});
  const { events, loading: eventsLoading } = useEvents();

  const form = useForm<GalleryFormValues | GalleryAlbumFormValues>({
    resolver: zodResolver(isAlbum ? albumSchema : singleImageSchema),
    defaultValues: defaultValues || (isAlbum ? {
      title: "",
      description: "",
      category: categories.length > 0 ? categories[0] : "",
      cover_image: "",
      event_id: null,
      images: [],
    } : {
      title: "",
      description: "",
      category: categories.length > 0 ? categories[0] : "",
      image: "",
      event_id: null,
    }),
  });

  const handleSubmit = async (values: GalleryFormValues | GalleryAlbumFormValues) => {
    try {
      // Upload the main image
      if (mainImageUploadRef.current) {
        const imageUrl = await mainImageUploadRef.current.uploadImage();
        if (imageUrl) {
          if (isAlbum) {
            (values as GalleryAlbumFormValues).cover_image = imageUrl;
          } else {
            (values as GalleryFormValues).image = imageUrl;
          }
        }
      }
      
      // Upload additional images for album
      if (isAlbum) {
        const albumValues = values as GalleryAlbumFormValues;
        albumValues.images = [];
        
        for (const imageId in additionalImageRefs) {
          const ref = additionalImageRefs[imageId];
          if (ref.current) {
            const imageUrl = await ref.current.uploadImage();
            if (imageUrl) {
              albumValues.images.push(imageUrl);
            }
          }
        }
      }
      
      // Submit the form with the updated image URLs
      onSubmit(values);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const addImageField = () => {
    const newId = `img-${Date.now()}`;
    setAdditionalImages([...additionalImages, {id: newId, file: null, url: null}]);
    
    const newRef = useRef<ImageUploadRef>(null);
    setAdditionalImageRefs(prev => ({
      ...prev,
      [newId]: newRef
    }));
  };

  const removeImageField = (id: string) => {
    setAdditionalImages(additionalImages.filter(img => img.id !== id));
    
    const newRefs = {...additionalImageRefs};
    delete newRefs[id];
    setAdditionalImageRefs(newRefs);
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
                <Input placeholder="Título da imagem" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="nova">Nova Categoria</SelectItem>
                  )}
                  <SelectItem value="nova">Nova Categoria</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("category") === "nova" && (
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nova Categoria</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Nome da nova categoria" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="event_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Evento Relacionado (opcional)</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value || undefined}
                value={field.value || undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um evento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">Nenhum</SelectItem>
                  {!eventsLoading && events.map((event: EventProps) => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.title} ({event.date})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={isAlbum ? "cover_image" : "image"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isAlbum ? "Imagem de Capa" : "Imagem"}</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={(url, file) => {
                    field.onChange(url || "");
                  }}
                  bucketName="gallery"
                  hint="Recomendado: 1200 x 800 pixels, máximo 5MB"
                  previewMode={true}
                  ref={mainImageUploadRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isAlbum && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <FormLabel>Imagens Adicionais</FormLabel>
              <Button 
                type="button" 
                variant="outline" 
                onClick={addImageField}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Adicionar Imagem
              </Button>
            </div>
            
            {additionalImages.length === 0 && (
              <div className="text-center py-4 text-muted-foreground border border-dashed rounded-md">
                Adicione imagens ao álbum clicando no botão acima
              </div>
            )}
            
            {additionalImages.map((img, index) => (
              <div key={img.id} className="relative pt-6 pb-2 px-4 border rounded-md">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 text-destructive"
                  onClick={() => removeImageField(img.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium mb-2">Imagem {index + 1}</div>
                <ImageUpload
                  value={img.url}
                  onChange={(url, file) => {
                    const newImages = [...additionalImages];
                    newImages[index].url = url;
                    newImages[index].file = file || null;
                    setAdditionalImages(newImages);
                  }}
                  bucketName="gallery"
                  hint="Recomendado: 1200 x 800 pixels, máximo 5MB"
                  previewMode={true}
                  ref={additionalImageRefs[img.id]}
                />
              </div>
            ))}
          </div>
        )}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descreva a imagem" 
                  rows={4}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Salvando..." : defaultValues 
            ? (isAlbum ? "Atualizar Álbum" : "Atualizar Item") 
            : (isAlbum ? "Criar Álbum" : "Adicionar à Galeria")}
        </Button>
      </form>
    </Form>
  );
};

export default GalleryForm;
