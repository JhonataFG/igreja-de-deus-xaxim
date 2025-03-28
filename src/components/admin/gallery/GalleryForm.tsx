
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
import { GalleryFormValues } from "@/types/gallery";
import ImageUpload from "@/components/admin/common/ImageUpload";
import { useRef } from "react";

interface GalleryFormProps {
  defaultValues?: GalleryFormValues;
  onSubmit: (values: GalleryFormValues) => void;
  isSubmitting: boolean;
  categories: string[];
}

const formSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  category: z.string().min(1, "A categoria é obrigatória"),
  image: z.string().min(1, "A imagem é obrigatória"),
});

const GalleryForm = ({ defaultValues, onSubmit, isSubmitting, categories }: GalleryFormProps) => {
  const imageUploadRef = useRef<{ uploadImage: () => Promise<string | null> }>(null);
  
  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
      category: categories.length > 0 ? categories[0] : "",
      image: "",
    },
  });

  const handleSubmit = async (values: GalleryFormValues) => {
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagem</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={(url, file) => {
                    field.onChange(url || ""); // Only update the form with a URL if in preview mode
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
          {isSubmitting ? "Salvando..." : defaultValues ? "Atualizar Item" : "Adicionar à Galeria"}
        </Button>
      </form>
    </Form>
  );
};

export default GalleryForm;
