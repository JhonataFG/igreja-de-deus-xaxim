
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PresenceDashboard from "@/components/admin/presence/PresenceDashboard";
import EventTable from "@/components/admin/presence/EventTable";
import EventDialog from "@/components/admin/presence/EventDialog";
import { usePresenceEvents } from "@/hooks/presence/use-presence-events";
import { PresenceEventProps, PresenceEventFormValues } from "@/types/presence";
import { useNavigate } from "react-router-dom";

const AdminPresence = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  // Event state
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<PresenceEventProps | undefined>(undefined);

  // Hooks
  const {
    events,
    isLoading: isEventsLoading,
    createEvent,
    updateEvent,
    deleteEvent,
  } = usePresenceEvents();

  // Event handlers
  const handleAddEvent = () => {
    setSelectedEvent(undefined);
    setIsEventDialogOpen(true);
  };

  const handleEditEvent = (event: PresenceEventProps) => {
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
  };

  const handleSaveEvent = (formData: PresenceEventFormValues) => {
    if (selectedEvent) {
      updateEvent({ id: selectedEvent.id, ...formData });
    } else {
      createEvent(formData);
    }
    setIsEventDialogOpen(false);
  };

  const handleTakeAttendance = (eventId: string) => {
    navigate(`/admin/presence/attendance/${eventId}`);
  };

  const handleGoToMembers = () => {
    navigate('/admin/members');
  };

  return (
    <AdminLayout title="Controle de Presença">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
          </TabsList>

          {activeTab === "dashboard" && (
            <Button onClick={handleGoToMembers} variant="outline" size="sm">
              Gerenciar Membros
            </Button>
          )}

          {activeTab === "events" && (
            <Button onClick={handleAddEvent} size="sm">
              <Plus className="mr-1 h-4 w-4" /> Adicionar Evento
            </Button>
          )}
        </div>

        <TabsContent value="dashboard" className="space-y-4">
          <PresenceDashboard />
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          {isEventsLoading ? (
            <div className="text-center py-8">Carregando eventos...</div>
          ) : (
            <EventTable
              events={events}
              onEdit={handleEditEvent}
              onDelete={deleteEvent}
              onTakeAttendance={handleTakeAttendance}
            />
          )}
        </TabsContent>
      </Tabs>

      <EventDialog
        isOpen={isEventDialogOpen}
        onClose={() => setIsEventDialogOpen(false)}
        onSave={handleSaveEvent}
        event={selectedEvent}
      />
    </AdminLayout>
  );
};

export default AdminPresence;
