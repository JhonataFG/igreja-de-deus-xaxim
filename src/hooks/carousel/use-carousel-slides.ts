
import { useState, useEffect } from "react";
import { CarouselSlide } from "@/types/carousel";
import { CarouselFormValues } from "@/components/admin/carousel/CarouselForm";
import { useCarouselOperations } from "./use-carousel-operations";
import { useCarouselFilter } from "./use-carousel-filter";

export const useCarouselSlides = () => {
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { 
    fetchCarouselSlides,
    createSlide: createSlideOperation,
    updateSlide: updateSlideOperation,
    deleteSlide: deleteSlideOperation,
    moveSlide: moveSlideOperation
  } = useCarouselOperations();
  
  const { 
    searchTerm, 
    setSearchTerm, 
    filteredSlides, 
    maxOrderPosition 
  } = useCarouselFilter(slides);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchCarouselSlides();
      if (data) {
        setSlides(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const createSlide = async (values: CarouselFormValues) => {
    const success = await createSlideOperation(values);
    if (success) {
      await fetchData();
    }
    return success;
  };

  const updateSlide = async (id: string, values: CarouselFormValues) => {
    const success = await updateSlideOperation(id, values);
    if (success) {
      await fetchData();
    }
    return success;
  };

  const deleteSlide = async (id: string) => {
    const success = await deleteSlideOperation(id);
    if (success) {
      setSlides(slides.filter(slide => slide.id !== id));
    }
    return success;
  };

  const moveSlide = async (id: string, direction: 'up' | 'down') => {
    const success = await moveSlideOperation(slides, id, direction);
    if (success) {
      // Update local state to reflect order changes
      const currentIndex = slides.findIndex(slide => slide.id === id);
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      
      const updatedSlides = [...slides];
      const temp = updatedSlides[currentIndex].order_position;
      updatedSlides[currentIndex].order_position = updatedSlides[newIndex].order_position;
      updatedSlides[newIndex].order_position = temp;
      
      setSlides(updatedSlides.sort((a, b) => a.order_position - b.order_position));
    }
    return success;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    slides,
    loading,
    searchTerm,
    setSearchTerm,
    filteredSlides,
    maxOrderPosition,
    fetchCarouselSlides: fetchData,
    createSlide,
    updateSlide,
    deleteSlide,
    moveSlide
  };
};
