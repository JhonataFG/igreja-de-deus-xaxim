
import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, MoveUp, MoveDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

// Carousel slide interface
interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  order_position: number;
}

const AdminCarousel = () => {
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCarouselSlides();
  }, []);

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
  
  const filteredSlides = slides.filter(slide => 
    slide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slide.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (id: string) => {
    setSlideToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (slideToDelete) {
      try {
        const { error } = await supabase
          .from('carousel')
          .delete()
          .eq('id', slideToDelete);

        if (error) {
          throw error;
        }

        setSlides(slides.filter(slide => slide.id !== slideToDelete));
        toast({
          title: "Slide excluído",
          description: "O slide foi removido do carrossel com sucesso.",
        });
      } catch (error) {
        console.error('Error deleting slide:', error);
        toast({
          title: "Erro",
          description: "Não foi possível excluir o slide.",
          variant: "destructive",
        });
      } finally {
        setIsDeleteDialogOpen(false);
        setSlideToDelete(null);
      }
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
      } catch (error) {
        console.error('Error updating slide order:', error);
        toast({
          title: "Erro",
          description: "Não foi possível atualizar a ordem dos slides.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <AdminLayout title="Gerenciamento do Carrossel">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar slides..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Slide
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagem</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Subtítulo</TableHead>
                <TableHead>Ordem</TableHead>
                <TableHead className="w-[140px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Carregando slides...
                  </TableCell>
                </TableRow>
              ) : filteredSlides.length > 0 ? (
                filteredSlides.map((slide) => (
                  <TableRow key={slide.id}>
                    <TableCell>
                      <div className="h-16 w-28 rounded overflow-hidden bg-muted">
                        <img 
                          src={slide.image} 
                          alt={slide.title} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{slide.title}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{slide.subtitle}</TableCell>
                    <TableCell>{slide.order_position}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => moveSlide(slide.id, 'up')}
                          disabled={slide.order_position === Math.min(...slides.map(s => s.order_position))}
                        >
                          <MoveUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => moveSlide(slide.id, 'down')}
                          disabled={slide.order_position === Math.max(...slides.map(s => s.order_position))}
                        >
                          <MoveDown className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive" 
                          onClick={() => handleDeleteClick(slide.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhum slide encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Slide</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este slide do carrossel? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminCarousel;
