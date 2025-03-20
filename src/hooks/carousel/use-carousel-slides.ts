
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CarouselSlide } from "@/types/carousel";

export const useCarouselSlides = () => {
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchCarouselSlides = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('carousel')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) {
        throw error;
      }

      if (data) {
        setSlides(data as CarouselSlide[]);
      }
    } catch (error) {
      console.error('Error fetching carousel slides:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os slides do carrossel.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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

      setSlides(slides.filter(slide => slide.id !== id));
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

  const moveSlide = async (id: string, direction: 'up' | 'down') => {
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
        
        // Update local state
        const updatedSlides = [...slides];
        const temp = updatedSlides[currentIndex].order_position;
        updatedSlides[currentIndex].order_position = updatedSlides[newIndex].order_position;
        updatedSlides[newIndex].order_position = temp;
        
        setSlides(updatedSlides.sort((a, b) => a.order_position - b.order_position));
        
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

  const getFilteredSlides = () => {
    return slides.filter(slide => 
      slide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slide.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {
    fetchCarouselSlides();
  }, []);

  return {
    slides,
    loading,
    searchTerm,
    setSearchTerm,
    filteredSlides: getFilteredSlides(),
    fetchCarouselSlides,
    deleteSlide,
    moveSlide
  };
};
