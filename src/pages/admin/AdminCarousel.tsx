
import { useState } from "react";
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

// Mock data for carousel slides
interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  order: number;
}

const initialSlides: CarouselSlide[] = [
  {
    id: "1",
    title: "Bem-vindo à Igreja da Paz",
    subtitle: "Uma comunidade viva de fé, esperança e amor",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format&fit=crop&q=80",
    order: 1
  },
  {
    id: "2",
    title: "Cultos aos Domingos",
    subtitle: "Venha adorar conosco todos os domingos às 10h e 18h",
    image: "https://images.unsplash.com/photo-1492563817904-5650241d13ed?w=800&auto=format&fit=crop&q=80",
    order: 2
  },
  {
    id: "3",
    title: "Ministério Infantil",
    subtitle: "Ensinando os pequenos no caminho em que devem andar",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80",
    order: 3
  }
];

const AdminCarousel = () => {
  const [slides, setSlides] = useState<CarouselSlide[]>(initialSlides);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const sortedSlides = [...slides].sort((a, b) => a.order - b.order);
  
  const filteredSlides = sortedSlides.filter(slide => 
    slide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slide.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (id: string) => {
    setSlideToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (slideToDelete) {
      setSlides(slides.filter(slide => slide.id !== slideToDelete));
      toast({
        title: "Slide excluído",
        description: "O slide foi removido do carrossel com sucesso.",
      });
      setIsDeleteDialogOpen(false);
      setSlideToDelete(null);
    }
  };

  const moveSlide = (id: string, direction: 'up' | 'down') => {
    const updatedSlides = [...slides];
    const currentIndex = updatedSlides.findIndex(slide => slide.id === id);
    
    if (
      (direction === 'up' && currentIndex > 0) ||
      (direction === 'down' && currentIndex < updatedSlides.length - 1)
    ) {
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      
      // Swap the orders
      const currentOrder = updatedSlides[currentIndex].order;
      updatedSlides[currentIndex].order = updatedSlides[newIndex].order;
      updatedSlides[newIndex].order = currentOrder;
      
      setSlides(updatedSlides);
      
      toast({
        title: "Ordem atualizada",
        description: "A ordem dos slides foi atualizada com sucesso.",
      });
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
              {filteredSlides.length > 0 ? (
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
                    <TableCell>{slide.order}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => moveSlide(slide.id, 'up')}
                          disabled={slide.order === 1}
                        >
                          <MoveUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => moveSlide(slide.id, 'down')}
                          disabled={slide.order === slides.length}
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
