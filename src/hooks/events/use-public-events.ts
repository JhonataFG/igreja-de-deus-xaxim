
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { EventProps } from "@/types/event";

export const usePublicEvents = (limit?: number) => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });
      
      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      if (data) {
        setEvents(data as EventProps[]);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Não foi possível carregar os eventos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [limit]);

  return {
    events,
    loading,
    error,
    fetchEvents
  };
};
