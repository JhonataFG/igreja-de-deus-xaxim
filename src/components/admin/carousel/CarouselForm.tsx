
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CarouselSlide } from "@/types/carousel";

// Extensão dos tipos existentes para o formulário
export interface CarouselFormValues {
  title: string;
  subtitle: string;
  image: string;
  order_position: number;
}

const formSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  subtitle: z.string().min(3, "O subtítulo deve ter pelo menos 3 caracteres"),
  image: z.string().url("Insira uma URL válida para a imagem"),
  order_position: z.number().int().positive("A posição deve ser um número positivo"),
});

interface CarouselFormProps {
  defaultValues?: CarouselFormValues;
  onSubmit: (values: CarouselFormValues) => void;
  isSubmitting: boolean;
  maxPosition: number;
}

const CarouselForm = ({ defaultValues, onSubmit, isSubmitting, maxPosition }: CarouselFormProps) => {
  const form = useForm<CarouselFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      title: "",
      subtitle: "",
      image: "",
      order_position: maxPosition + 1
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título do slide" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtítulo</FormLabel>
              <FormControl>
                <Input placeholder="Subtítulo do slide" {...field} />
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
              <FormLabel>URL da Imagem</FormLabel>
              <FormControl>
                <Input placeholder="https://exemplo.com/imagem.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="order_position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Posição</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min={1} 
                  {...field} 
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : defaultValues ? "Atualizar Slide" : "Criar Slide"}
        </Button>
      </form>
    </Form>
  );
};

export default CarouselForm;
