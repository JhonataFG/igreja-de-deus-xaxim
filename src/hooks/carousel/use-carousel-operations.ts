
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CarouselSlide } from "@/types/carousel";
import { CarouselFormValues } from "@/components/admin/carousel/CarouselForm";

export const useCarouselOperations = () => {
  const { toast } = useToast();

  const fetchCarouselSlides = async () => {
    try {
      const { data, error } = await supabase
        .from('carousel')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) {
        throw error;
      }

      return data as CarouselSlide[];
    } catch (error) {
      console.error('Error fetching carousel slides:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os slides do carrossel.",
        variant: "destructive",
      });
      return null;
    }
  };

  const createSlide = async (values: CarouselFormValues) => {
    try {
      const { data, error } = await supabase
        .from('carousel')
        .insert([values])
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        toast({
          title: "Slide criado",
          description: "O slide foi adicionado ao carrossel com sucesso.",
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error creating slide:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o slide.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateSlide = async (id: string, values: CarouselFormValues) => {
    try {
      const { data, error } = await supabase
        .from('carousel')
        .update(values)
        .eq('id', id)
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        toast({
          title: "Slide atualizado",
          description: "O slide foi atualizado com sucesso.",
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating slide:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o slide.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteSlide = async (id: string) => {
    try {
      const { error } = await supabase
        .from('carousel')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: "Slide excluído",
        description: "O slide foi removido do carrossel com sucesso.",
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting slide:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o slide.",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const moveSlide = async (slides: CarouselSlide[], id: string, direction: 'up' | 'down') => {
    const currentIndex = slides.findIndex(slide => slide.id === id);
    
    if (
      (direction === 'up' && currentIndex > 0) ||
      (direction === 'down' && currentIndex < slides.length - 1)
    ) {
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      
      try {
        const currentSlide = slides[currentIndex];
        const targetSlide = slides[newIndex];
        
        // Swap positions in database
        const updates = [
          { id: currentSlide.id, order_position: targetSlide.order_position },
          { id: targetSlide.id, order_position: currentSlide.order_position }
        ];
        
        for (const update of updates) {
          const { error } = await supabase
            .from('carousel')
            .update({ order_position: update.order_position })
            .eq('id', update.id);
            
          if (error) throw error;
        }
        
        toast({
          title: "Ordem atualizada",
          description: "A ordem dos slides foi atualizada com sucesso.",
        });
        
        return true;
      } catch (error) {
        console.error('Error updating slide order:', error);
        toast({
          title: "Erro",
          description: "Não foi possível atualizar a ordem dos slides.",
          variant: "destructive",
        });
        
        return false;
      }
    }
    
    return false;
  };

  return {
    fetchCarouselSlides,
    createSlide,
    updateSlide,
    deleteSlide,
    moveSlide
  };
};
