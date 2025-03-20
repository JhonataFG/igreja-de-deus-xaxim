
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { useEvents } from "@/hooks/events/use-events";
import { EventFormValues } from "@/types/event";
import EventDialog from "@/components/admin/events/EventDialog";

const AdminEvents = () => {
  const {
    loading,
    searchTerm,
    setSearchTerm,
    filteredEvents,
    createEvent,
    updateEvent,
    deleteEvent
  } = useEvents();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setEventToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (eventToDelete) {
      const success = await deleteEvent(eventToDelete);
      if (success) {
        setIsDeleteDialogOpen(false);
        setEventToDelete(null);
      }
    }
  };

  const handleEditClick = (id: string) => {
    setEditingEvent(id);
    setIsEventDialogOpen(true);
  };

  const handleAddNewClick = () => {
    setEditingEvent(null);
    setIsEventDialogOpen(true);
  };

  const handleEventSubmit = async (values: EventFormValues) => {
    if (editingEvent) {
      return await updateEvent(editingEvent, values);
    } else {
      return await createEvent(values);
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
        <Button onClick={handleAddNewClick}>
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Carregando eventos...
                  </TableCell>
                </TableRow>
              ) : filteredEvents.length > 0 ? (
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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleEditClick(event.id)}
                        >
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

      <EventDialog
        isOpen={isEventDialogOpen}
        onOpenChange={setIsEventDialogOpen}
        onSubmit={handleEventSubmit}
        event={editingEvent ? filteredEvents.find(e => e.id === editingEvent) : undefined}
        title={editingEvent ? "Editar Evento" : "Novo Evento"}
      />
    </AdminLayout>
  );
};

export default AdminEvents;
