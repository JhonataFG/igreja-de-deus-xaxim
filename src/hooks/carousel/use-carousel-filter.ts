
import { useState } from "react";
import { CarouselSlide } from "@/types/carousel";

export const useCarouselFilter = (slides: CarouselSlide[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const getFilteredSlides = () => {
    return slides.filter(slide => 
      slide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slide.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getMaxOrderPosition = () => {
    if (slides.length === 0) return 0;
    return Math.max(...slides.map(slide => slide.order_position));
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredSlides: getFilteredSlides(),
    maxOrderPosition: getMaxOrderPosition()
  };
};
