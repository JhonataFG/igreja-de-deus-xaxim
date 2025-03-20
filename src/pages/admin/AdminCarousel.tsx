
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import CarouselHeader from "@/components/admin/carousel/CarouselHeader";
import CarouselTable from "@/components/admin/carousel/CarouselTable";
import DeleteSlideDialog from "@/components/admin/carousel/DeleteSlideDialog";
import { useCarouselSlides } from "@/hooks/carousel/use-carousel-slides";

const AdminCarousel = () => {
  const { 
    loading, 
    searchTerm, 
    setSearchTerm, 
    filteredSlides, 
    deleteSlide, 
    moveSlide 
  } = useCarouselSlides();
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSlideToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (slideToDelete) {
      const success = await deleteSlide(slideToDelete);
      if (success) {
        setIsDeleteDialogOpen(false);
        setSlideToDelete(null);
      }
    }
  };

  const handleEditClick = (id: string) => {
    // Edit functionality will be implemented later
    console.log("Edit slide:", id);
  };

  const handleAddNewClick = () => {
    // Add new slide functionality will be implemented later
    console.log("Add new slide");
  };

  return (
    <AdminLayout title="Gerenciamento do Carrossel">
      <CarouselHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddNewClick={handleAddNewClick}
      />

      <CarouselTable 
        slides={filteredSlides}
        loading={loading}
        onMoveSlide={moveSlide}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      <DeleteSlideDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </AdminLayout>
  );
};

export default AdminCarousel;
