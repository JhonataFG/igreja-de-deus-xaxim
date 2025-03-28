
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, Tag, Images } from "lucide-react";
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
import { useGallery } from "@/hooks/gallery/use-gallery";
import { GalleryFormValues, GalleryAlbumFormValues } from "@/types/gallery";
import GalleryDialog from "@/components/admin/gallery/GalleryDialog";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const AdminGallery = () => {
  const {
    loading,
    searchTerm,
    setSearchTerm,
    filteredGalleryItems,
    filteredGalleryAlbums,
    categories,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem
  } = useGallery();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: string, isAlbum: boolean} | null>(null);
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("single");
  const { toast } = useToast();

  const handleDeleteClick = (id: string, isAlbum = false) => {
    setItemToDelete({id, isAlbum});
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      const success = await deleteGalleryItem(itemToDelete.id, itemToDelete.isAlbum);
      if (success) {
        setIsDeleteDialogOpen(false);
        setItemToDelete(null);
      }
    }
  };

  const handleEditClick = (id: string) => {
    setEditingItem(id);
    setIsGalleryDialogOpen(true);
  };

  const handleAddNewClick = () => {
    setEditingItem(null);
    setIsGalleryDialogOpen(true);
  };

  const handleGallerySubmit = async (values: GalleryFormValues | GalleryAlbumFormValues, isAlbum: boolean) => {
    if (editingItem) {
      return await updateGalleryItem(editingItem, values as GalleryFormValues);
    } else {
      return await createGalleryItem(values, isAlbum);
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
        <Button onClick={handleAddNewClick}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Imagem / Álbum
        </Button>
      </div>

      <Tabs defaultValue="single" onValueChange={setActiveTab}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="single" className="flex-1">Imagens</TabsTrigger>
          <TabsTrigger value="albums" className="flex-1">Álbuns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="single">
          <Card>
            <CardContent className="p-6">
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Carregando itens da galeria...
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGalleryItems.length > 0 ? (
                    filteredGalleryItems.map((item) => (
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
                          {item.event_id && (
                            <Badge variant="outline" className="mt-2">
                              Vinculado a um evento
                            </Badge>
                          )}
                        </div>
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="secondary" 
                            size="icon" 
                            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
                            onClick={() => handleEditClick(item.id)}
                          >
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
                      Nenhuma imagem encontrada na galeria
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="albums">
          <Card>
            <CardContent className="p-6">
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Carregando álbuns da galeria...
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGalleryAlbums.length > 0 ? (
                    filteredGalleryAlbums.map((album) => (
                      <div key={album.id} className="relative group overflow-hidden rounded-lg border bg-card shadow-sm">
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={album.cover_image}
                            alt={album.title}
                            className="h-full w-full object-cover transition-all group-hover:scale-105"
                          />
                          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center">
                            <Images className="h-3 w-3 mr-1" />
                            {album.items_count} fotos
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium truncate">{album.title}</h3>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Tag className="h-3 w-3 mr-1" />
                              {album.category}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{album.description}</p>
                          {album.event_id && (
                            <Badge variant="outline" className="mt-2">
                              Vinculado a um evento
                            </Badge>
                          )}
                        </div>
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="secondary" 
                            size="icon" 
                            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm text-destructive" 
                            onClick={() => handleDeleteClick(album.id, true)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      Nenhum álbum encontrado na galeria
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {itemToDelete?.isAlbum ? "Excluir Álbum" : "Excluir Imagem"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {itemToDelete?.isAlbum 
                ? "Tem certeza que deseja excluir este álbum e todas as suas imagens? Esta ação não pode ser desfeita."
                : "Tem certeza que deseja excluir esta imagem da galeria? Esta ação não pode ser desfeita."}
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

      <GalleryDialog
        isOpen={isGalleryDialogOpen}
        onOpenChange={setIsGalleryDialogOpen}
        onSubmit={handleGallerySubmit}
        item={editingItem ? filteredGalleryItems.find(i => i.id === editingItem) : undefined}
        title={editingItem ? "Editar Imagem" : "Nova Imagem / Álbum"}
        categories={categories}
      />
    </AdminLayout>
  );
};

export default AdminGallery;
