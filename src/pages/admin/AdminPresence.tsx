
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PresenceDashboard from "@/components/admin/presence/PresenceDashboard";
import MemberTable from "@/components/admin/presence/MemberTable";
import MemberDialog from "@/components/admin/presence/MemberDialog";
import EventTable from "@/components/admin/presence/EventTable";
import EventDialog from "@/components/admin/presence/EventDialog";
import { useMembers } from "@/hooks/presence/use-members";
import { usePresenceEvents } from "@/hooks/presence/use-presence-events";
import { MemberProps, MemberFormValues } from "@/types/member";
import { PresenceEventProps, PresenceEventFormValues } from "@/types/presence";
import { useNavigate } from "react-router-dom";

const AdminPresence = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  // Member state
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberProps | undefined>(undefined);

  // Event state
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<PresenceEventProps | undefined>(undefined);

  // Hooks
  const {
    members,
    isLoading: isMembersLoading,
    createMember,
    updateMember,
    deleteMember,
  } = useMembers();

  const {
    events,
    isLoading: isEventsLoading,
    createEvent,
    updateEvent,
    deleteEvent,
  } = usePresenceEvents();

  // Member handlers
  const handleAddMember = () => {
    setSelectedMember(undefined);
    setIsMemberDialogOpen(true);
  };

  const handleEditMember = (member: MemberProps) => {
    setSelectedMember(member);
    setIsMemberDialogOpen(true);
  };

  const handleSaveMember = (formData: MemberFormValues) => {
    if (selectedMember) {
      updateMember({ id: selectedMember.id, ...formData });
    } else {
      createMember(formData);
    }
    setIsMemberDialogOpen(false);
  };

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

  return (
    <AdminLayout title="Controle de Presença">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="members">Membros</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
          </TabsList>

          {activeTab === "members" && (
            <Button onClick={handleAddMember} size="sm">
              <Plus className="mr-1 h-4 w-4" /> Adicionar Membro
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

        <TabsContent value="members" className="space-y-4">
          {isMembersLoading ? (
            <div className="text-center py-8">Carregando membros...</div>
          ) : (
            <MemberTable
              members={members}
              onEdit={handleEditMember}
              onDelete={deleteMember}
            />
          )}
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

      <MemberDialog
        isOpen={isMemberDialogOpen}
        onClose={() => setIsMemberDialogOpen(false)}
        onSave={handleSaveMember}
        member={selectedMember}
      />

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
