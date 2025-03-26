
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAttendance } from "@/hooks/presence/use-attendance";
import AttendanceList from "@/components/admin/presence/AttendanceList";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const AdminAttendance = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");

  const {
    membersWithAttendance,
    isLoading,
    toggleAttendance,
  } = useAttendance(eventId || "");

  // Fetch event details
  const { isLoading: isEventLoading } = useQuery({
    queryKey: ["event", eventId],
    queryFn: async () => {
      if (!eventId) return null;
      
      const { data, error } = await supabase
        .from("presence_events")
        .select("*")
        .eq("id", eventId)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setEventTitle(data.title);
        setEventDate(data.date);
      }
      
      return data;
    },
    enabled: !!eventId,
  });

  const handleToggleAttendance = (memberId: string, attended: boolean) => {
    if (eventId) {
      toggleAttendance({ memberId, attended });
    }
  };

  const handleBack = () => {
    navigate("/admin/presence");
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    
    try {
      // Try to parse as ISO date first
      return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      // If parsing fails, try to parse as yyyy-MM-dd
      try {
        const [year, month, day] = dateString.split("-").map(Number);
        return format(new Date(year, month - 1, day), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
      } catch (error) {
        return dateString;
      }
    }
  };

  if (isLoading || isEventLoading) {
    return (
      <AdminLayout title="Registrar Presença">
        <div className="text-center py-8">Carregando...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Registrar Presença">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-xl font-bold">{eventTitle}</h2>
            <p className="text-muted-foreground">{formatDate(eventDate)}</p>
          </div>
        </div>

        <AttendanceList
          members={membersWithAttendance}
          onToggleAttendance={handleToggleAttendance}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminAttendance;
