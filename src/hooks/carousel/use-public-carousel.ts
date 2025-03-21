
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CarouselSlide } from "@/types/carousel";

export const usePublicCarousel = () => {
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCarouselSlides = async () => {
    try {
      setLoading(true);
      setError(null);
      
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
      setError('Não foi possível carregar os slides do carrossel.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarouselSlides();
  }, []);

  return {
    slides,
    loading,
    error,
    fetchCarouselSlides
  };
};
