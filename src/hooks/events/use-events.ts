
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { EventProps, EventFormValues } from "@/types/event";

export const useEvents = () => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setEvents(data as EventProps[]);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os eventos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (values: EventFormValues) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([values])
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        setEvents([data[0] as EventProps, ...events]);
        toast({
          title: "Evento criado",
          description: "O evento foi adicionado com sucesso.",
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o evento.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateEvent = async (id: string, values: EventFormValues) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .update(values)
        .eq('id', id)
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        setEvents(events.map(event => event.id === id ? data[0] as EventProps : event));
        toast({
          title: "Evento atualizado",
          description: "O evento foi atualizado com sucesso.",
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating event:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o evento.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setEvents(events.filter(event => event.id !== id));
      toast({
        title: "Evento excluído",
        description: "O evento foi removido com sucesso.",
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o evento.",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const getFilteredEvents = () => {
    return events.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    searchTerm,
    setSearchTerm,
    filteredEvents: getFilteredEvents(),
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent
  };
};
