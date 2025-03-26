
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PresenceEventProps, PresenceEventFormValues, AttendanceSummary } from "@/types/presence";
import { useToast } from "@/hooks/use-toast";

export const usePresenceEvents = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const getEvents = async (): Promise<PresenceEventProps[]> => {
    const { data, error } = await supabase
      .from("presence_events")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching events:", error);
      throw error;
    }

    return data || [];
  };

  const createEvent = async (event: PresenceEventFormValues): Promise<PresenceEventProps> => {
    const { data, error } = await supabase
      .from("presence_events")
      .insert([event])
      .select()
      .single();

    if (error) {
      console.error("Error creating event:", error);
      throw error;
    }

    return data;
  };

  const updateEvent = async ({
    id,
    ...event
  }: PresenceEventFormValues & { id: string }): Promise<PresenceEventProps> => {
    const { data, error } = await supabase
      .from("presence_events")
      .update(event)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating event:", error);
      throw error;
    }

    return data;
  };

  const deleteEvent = async (id: string): Promise<void> => {
    const { error } = await supabase.from("presence_events").delete().eq("id", id);

    if (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  };

  const getEventsSummary = async (): Promise<AttendanceSummary[]> => {
    // Fetch all events
    const { data: events, error: eventsError } = await supabase
      .from("presence_events")
      .select("*")
      .order("date", { ascending: false })
      .limit(5);

    if (eventsError) {
      console.error("Error fetching events for summary:", eventsError);
      throw eventsError;
    }

    if (!events || events.length === 0) {
      return [];
    }

    // Fetch total members count
    const { count: totalMembers, error: membersError } = await supabase
      .from("members")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");

    if (membersError) {
      console.error("Error fetching members count:", membersError);
      throw membersError;
    }

    // For each event, fetch attendance info
    const summaries = await Promise.all(
      events.map(async (event) => {
        const { count: presentMembers, error: attendanceError } = await supabase
          .from("member_attendance")
          .select("*", { count: "exact", head: true })
          .eq("event_id", event.id)
          .eq("attended", true);

        if (attendanceError) {
          console.error(`Error fetching attendance for event ${event.id}:`, attendanceError);
          throw attendanceError;
        }

        const attendancePercentage = totalMembers ? (presentMembers / totalMembers) * 100 : 0;

        return {
          eventId: event.id,
          eventTitle: event.title,
          date: event.date,
          totalMembers: totalMembers || 0,
          presentMembers: presentMembers || 0,
          attendancePercentage: Math.round(attendancePercentage),
        };
      })
    );

    return summaries;
  };

  const eventsQuery = useQuery({
    queryKey: ["presence_events"],
    queryFn: getEvents,
  });

  const eventsSummaryQuery = useQuery({
    queryKey: ["presence_events_summary"],
    queryFn: getEventsSummary,
  });

  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["presence_events"] });
      queryClient.invalidateQueries({ queryKey: ["presence_events_summary"] });
      toast({
        title: "Evento criado",
        description: "O evento foi adicionado com sucesso.",
      });
    },
    onError: (error) => {
      console.error("Error creating event:", error);
      toast({
        title: "Erro ao criar evento",
        description: "Ocorreu um erro ao adicionar o evento.",
        variant: "destructive",
      });
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["presence_events"] });
      queryClient.invalidateQueries({ queryKey: ["presence_events_summary"] });
      toast({
        title: "Evento atualizado",
        description: "O evento foi atualizado com sucesso.",
      });
    },
    onError: (error) => {
      console.error("Error updating event:", error);
      toast({
        title: "Erro ao atualizar evento",
        description: "Ocorreu um erro ao atualizar o evento.",
        variant: "destructive",
      });
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["presence_events"] });
      queryClient.invalidateQueries({ queryKey: ["presence_events_summary"] });
      toast({
        title: "Evento excluído",
        description: "O evento foi excluído com sucesso.",
      });
    },
    onError: (error) => {
      console.error("Error deleting event:", error);
      toast({
        title: "Erro ao excluir evento",
        description: "Ocorreu um erro ao excluir o evento.",
        variant: "destructive",
      });
    },
  });

  return {
    events: eventsQuery.data || [],
    eventsSummary: eventsSummaryQuery.data || [],
    isLoading: eventsQuery.isLoading,
    isSummaryLoading: eventsSummaryQuery.isLoading,
    isError: eventsQuery.isError || eventsSummaryQuery.isError,
    createEvent: createEventMutation.mutate,
    updateEvent: updateEventMutation.mutate,
    deleteEvent: deleteEventMutation.mutate,
  };
};
