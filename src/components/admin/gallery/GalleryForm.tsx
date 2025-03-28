
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
import { useRef, useState, useEffect } from "react";
import { X } from "lucide-react";
import { useEvents } from "@/hooks/events/use-events";

// Form schema for single image
const singleImageSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  category: z.string().min(1, "A categoria é obrigatória"),
  image: z.string().min(1, "A imagem é obrigatória"),
  event_id: z.string().optional().nullable(),
});

// Form schema for album
const albumSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  category: z.string().min(1, "A categoria é obrigatória"),
  cover_image: z.string().min(1, "A imagem de capa é obrigatória"),
  event_id: z.string().optional().nullable(),
  images: z.array(z.string()).min(1, "Pelo menos uma imagem deve ser adicionada ao álbum"),
});

interface GalleryFormProps {
  defaultValues?: GalleryFormValues | GalleryAlbumFormValues;
  onSubmit: (values: GalleryFormValues | GalleryAlbumFormValues) => void;
  isSubmitting: boolean;
  categories: string[];
  isAlbum: boolean;
}

const GalleryForm = ({ defaultValues, onSubmit, isSubmitting, categories, isAlbum }: GalleryFormProps) => {
  const imageUploadRef = useRef<ImageUploadRef>(null);
  const coverImageUploadRef = useRef<ImageUploadRef>(null);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const { events, loading: eventsLoading } = useEvents();
  const [imagesError, setImagesError] = useState<string | null>(null);

  // Use appropriate schema based on isAlbum
  const schema = isAlbum ? albumSchema : singleImageSchema;
  
  // Type assertion to tell TypeScript which type to use
  const form = useForm<typeof isAlbum extends true ? GalleryAlbumFormValues : GalleryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: isAlbum 
      ? {
          title: "",
          description: "",
          category: "",
          cover_image: "",
          event_id: null,
          images: [],
          ...defaultValues as GalleryAlbumFormValues,
        } 
      : {
          title: "",
          description: "",
          category: "",
          image: "",
          event_id: null,
          ...defaultValues as GalleryFormValues,
        },
  });

  useEffect(() => {
    // If we're editing an album, fetch and set its images
    if (isAlbum && defaultValues && 'images' in defaultValues) {
      setAdditionalImages(defaultValues.images);
    }
  }, [isAlbum, defaultValues]);

  useEffect(() => {
    // Validate album images whenever they change
    if (isAlbum && additionalImages.length === 0) {
      setImagesError("Pelo menos uma imagem deve ser adicionada ao álbum");
    } else {
      setImagesError(null);
    }
  }, [additionalImages, isAlbum]);

  const handleAddImage = async () => {
    if (!tempImage) return;
    
    setAdditionalImages([...additionalImages, tempImage]);
    setTempImage(null);
    
    // Reset the file input
    const fileInput = document.getElementById('additional-image') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...additionalImages];
    newImages.splice(index, 1);
    setAdditionalImages(newImages);
  };

  const handleFormSubmit = async (values: GalleryFormValues | GalleryAlbumFormValues) => {
    try {
      // For single image
      if (!isAlbum) {
        // Upload the image if needed
        if (imageUploadRef.current) {
          const imageUrl = await imageUploadRef.current.uploadImage();
          if (imageUrl) {
            (values as GalleryFormValues).image = imageUrl;
          }
        }
      } 
      // For album
      else {
        // Custom validation for album images
        if (additionalImages.length === 0) {
          setImagesError("Pelo menos uma imagem deve ser adicionada ao álbum");
          return;
        }
        
        // Upload the cover image if needed
        if (coverImageUploadRef.current) {
          const coverImageUrl = await coverImageUploadRef.current.uploadImage();
          if (coverImageUrl) {
            (values as GalleryAlbumFormValues).cover_image = coverImageUrl;
          }
        }
        
        // Add images to form values
        (values as GalleryAlbumFormValues).images = additionalImages;
      }
      
      // Submit the form
      onSubmit(values);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  // Form rendering based on isAlbum
  if (isAlbum) {
    // Album form
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título do Álbum</FormLabel>
                <FormControl>
                  <Input placeholder="Título do álbum" {...field} />
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
                    placeholder="Descrição do álbum" 
                    rows={3}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select 
                    value={field.value} 
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                      <SelectItem value="nova-categoria">
                        Nova Categoria
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {form.watch("category") === "nova-categoria" && (
              <FormItem>
                <FormLabel>Nova Categoria</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Nome da nova categoria" 
                    onChange={(e) => form.setValue("category", e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}

            <FormField
              control={form.control}
              name="event_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evento Relacionado (opcional)</FormLabel>
                  <Select 
                    value={field.value || ""} 
                    onValueChange={(value) => field.onChange(value || null)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um evento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">Nenhum evento</SelectItem>
                      {events.map(event => (
                        <SelectItem key={event.id} value={event.id}>
                          {event.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="cover_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem de Capa</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={(url) => {
                      field.onChange(url || "");
                    }}
                    bucketName="gallery"
                    label="Imagem de Capa"
                    hint="Recomendado: 1200 x 800 pixels, máximo 5MB"
                    previewMode={true}
                    ref={coverImageUploadRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Imagens do Álbum</FormLabel>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
              {additionalImages.map((imgUrl, index) => (
                <div key={index} className="relative rounded-md overflow-hidden border border-gray-200">
                  <img src={imgUrl} alt={`Imagem ${index + 1}`} className="w-full h-32 object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 rounded-full"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
              <ImageUpload
                value={tempImage}
                onChange={(url) => setTempImage(url)}
                bucketName="gallery"
                label="Adicionar Imagem"
                hint="Adicione imagens ao álbum"
                previewMode={true}
              />
              
              <div className="flex justify-end mt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddImage}
                  disabled={!tempImage}
                >
                  Adicionar ao Álbum
                </Button>
              </div>
            </div>
            
            {imagesError && (
              <p className="text-sm font-medium text-destructive">
                {imagesError}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting || additionalImages.length === 0}>
            {isSubmitting ? "Salvando..." : "Salvar Álbum"}
          </Button>
        </form>
      </Form>
    );
  }

  // Single image form
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descrição da imagem" 
                  rows={3}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select 
                  value={field.value} 
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                    <SelectItem value="nova-categoria">
                      Nova Categoria
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {form.watch("category") === "nova-categoria" && (
            <FormItem>
              <FormLabel>Nova Categoria</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Nome da nova categoria" 
                  onChange={(e) => form.setValue("category", e.target.value)}
                />
              </FormControl>
            </FormItem>
          )}

          <FormField
            control={form.control}
            name="event_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Evento Relacionado (opcional)</FormLabel>
                <Select 
                  value={field.value || ""} 
                  onValueChange={(value) => field.onChange(value || null)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um evento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="">Nenhum evento</SelectItem>
                    {events.map(event => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                    field.onChange(url || "");
                  }}
                  bucketName="gallery"
                  hint="Recomendado: 1200 x 800 pixels, máximo 5MB"
                  previewMode={true}
                  ref={imageUploadRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar Imagem"}
        </Button>
      </form>
    </Form>
  );
};

export default GalleryForm;
