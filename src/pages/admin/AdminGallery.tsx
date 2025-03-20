
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, Tag } from "lucide-react";
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
import { GalleryItemProps } from "@/components/GalleryItem";

// Mock data - in a real app this would come from an API or database
const initialGalleryItems: GalleryItemProps[] = [
  {
    id: "1",
    title: "Culto de Páscoa",
    description: "Celebração especial do Domingo de Páscoa, com apresentações do coral e encenação da ressurreição de Jesus.",
    category: "Celebrações",
    image: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "2",
    title: "Retiro de Jovens",
    description: "Jovens da igreja participando de atividades ao ar livre, estudos bíblicos e momentos de adoração durante o retiro anual.",
    category: "Jovens",
    image: "https://images.unsplash.com/photo-1523986490752-c28064f26be3?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "3",
    title: "Ação Social na Comunidade",
    description: "Membros da igreja servindo a comunidade local com distribuição de alimentos, roupas e assistência às famílias necessitadas.",
    category: "Ação Social",
    image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=600&auto=format&fit=crop&q=80"
  }
];

const AdminGallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItemProps[]>(initialGalleryItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredItems = galleryItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setGalleryItems(galleryItems.filter(item => item.id !== itemToDelete));
      toast({
        title: "Item excluído",
        description: "O item foi removido da galeria com sucesso.",
      });
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <AdminLayout title="Gerenciamento da Galeria">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar na galeria..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Imagem
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div key={item.id} className="relative group overflow-hidden rounded-lg border bg-card shadow-sm">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-all group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium truncate">{item.title}</h3>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Tag className="h-3 w-3 mr-1" />
                        {item.category}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm text-destructive" 
                      onClick={() => handleDeleteClick(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                Nenhum item encontrado na galeria
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Imagem</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta imagem da galeria? Esta ação não pode ser desfeita.
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

export default AdminGallery;
