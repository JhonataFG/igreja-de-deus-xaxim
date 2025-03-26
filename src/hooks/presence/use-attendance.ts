
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MemberWithAttendance } from "@/types/presence";
import { useToast } from "@/hooks/use-toast";

export const useAttendance = (eventId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const getMembersWithAttendance = async (): Promise<MemberWithAttendance[]> => {
    // First get all members
    const { data: members, error: membersError } = await supabase
      .from("members")
      .select("*")
      .order("name");

    if (membersError) {
      console.error("Error fetching members:", membersError);
      throw membersError;
    }

    if (!members || members.length === 0) {
      return [];
    }

    // Then get attendance records for this event
    const { data: attendance, error: attendanceError } = await supabase
      .from("member_attendance")
      .select("*")
      .eq("event_id", eventId);

    if (attendanceError) {
      console.error("Error fetching attendance:", attendanceError);
      throw attendanceError;
    }

    // Combine the data
    const membersWithAttendance = members.map((member) => {
      const attendanceRecord = attendance?.find((a) => a.member_id === member.id);
      return {
        ...member,
        attendance: attendanceRecord
          ? {
              id: attendanceRecord.id,
              attended: attendanceRecord.attended,
              notes: attendanceRecord.notes,
            }
          : null,
      };
    });

    return membersWithAttendance;
  };

  const toggleAttendance = async ({
    memberId,
    attended,
    notes,
  }: {
    memberId: string;
    attended: boolean;
    notes?: string;
  }): Promise<void> => {
    // Check if attendance record exists
    const { data: existingRecord, error: checkError } = await supabase
      .from("member_attendance")
      .select("*")
      .eq("member_id", memberId)
      .eq("event_id", eventId)
      .maybeSingle();

    if (checkError) {
      console.error("Error checking attendance record:", checkError);
      throw checkError;
    }

    if (existingRecord) {
      // Update existing record
      const { error: updateError } = await supabase
        .from("member_attendance")
        .update({ attended, notes })
        .eq("id", existingRecord.id);

      if (updateError) {
        console.error("Error updating attendance:", updateError);
        throw updateError;
      }
    } else {
      // Create new record
      const { error: insertError } = await supabase.from("member_attendance").insert([
        {
          member_id: memberId,
          event_id: eventId,
          attended,
          notes,
        },
      ]);

      if (insertError) {
        console.error("Error creating attendance record:", insertError);
        throw insertError;
      }
    }
  };

  const attendanceQuery = useQuery({
    queryKey: ["attendance", eventId],
    queryFn: getMembersWithAttendance,
    enabled: !!eventId,
  });

  const toggleAttendanceMutation = useMutation({
    mutationFn: toggleAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance", eventId] });
      queryClient.invalidateQueries({ queryKey: ["presence_events_summary"] });
      toast({
        title: "Presença atualizada",
        description: "O registro de presença foi atualizado com sucesso.",
      });
    },
    onError: (error) => {
      console.error("Error toggling attendance:", error);
      toast({
        title: "Erro ao registrar presença",
        description: "Ocorreu um erro ao atualizar o registro de presença.",
        variant: "destructive",
      });
    },
  });

  return {
    membersWithAttendance: attendanceQuery.data || [],
    isLoading: attendanceQuery.isLoading,
    isError: attendanceQuery.isError,
    toggleAttendance: toggleAttendanceMutation.mutate,
  };
};
