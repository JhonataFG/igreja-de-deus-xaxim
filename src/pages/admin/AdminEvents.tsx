
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Edit, Plus, Search, Trash2 } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { EventProps } from "@/components/EventCard";

// Mock data - in a real app this would come from an API or database
const initialEvents: EventProps[] = [
  {
    id: "1",
    title: "Culto de Louvor e Adoração",
    date: "26/10/2023",
    time: "19:00 - 21:00",
    location: "Templo Principal",
    description: "Um momento especial de adoração e comunhão com Deus. Venha participar deste tempo maravilhoso de louvor e adoração.",
    image: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "2",
    title: "Encontro de Jovens",
    date: "28/10/2023",
    time: "18:00 - 21:30",
    location: "Salão de Eventos",
    description: "Um encontro dinâmico para jovens com música, mensagem bíblica e muita diversão. Traga seus amigos!",
    image: "https://images.unsplash.com/photo-1523803326055-13179de6cc78?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "3",
    title: "Estudo Bíblico Semanal",
    date: "30/10/2023",
    time: "19:30 - 21:00",
    location: "Sala de Estudos",
    description: "Aprofunde seu conhecimento da Palavra de Deus em nosso estudo bíblico semanal. Todos são bem-vindos.",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&auto=format&fit=crop&q=80"
  }
];

const AdminEvents = () => {
  const [events, setEvents] = useState<EventProps[]>(initialEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (id: string) => {
    setEventToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (eventToDelete) {
      setEvents(events.filter(event => event.id !== eventToDelete));
      toast({
        title: "Evento excluído",
        description: "O evento foi removido com sucesso.",
      });
      setIsDeleteDialogOpen(false);
      setEventToDelete(null);
    }
  };

  return (
    <AdminLayout title="Gerenciamento de Eventos">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar eventos..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Evento
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Local</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {event.date}
                      </div>
                    </TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive" 
                          onClick={() => handleDeleteClick(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Nenhum evento encontrado
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
            <AlertDialogTitle>Excluir Evento</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.
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

export default AdminEvents;
