
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MemberProps, MemberFormValues } from "@/types/member";
import { useToast } from "@/hooks/use-toast";

export const useMembers = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const getMembers = async (): Promise<MemberProps[]> => {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching members:", error);
      throw error;
    }

    return data || [];
  };

  const createMember = async (member: MemberFormValues): Promise<MemberProps> => {
    const { data, error } = await supabase
      .from("members")
      .insert([member])
      .select()
      .single();

    if (error) {
      console.error("Error creating member:", error);
      throw error;
    }

    return data;
  };

  const updateMember = async ({
    id,
    ...member
  }: MemberFormValues & { id: string }): Promise<MemberProps> => {
    const { data, error } = await supabase
      .from("members")
      .update(member)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating member:", error);
      throw error;
    }

    return data;
  };

  const deleteMember = async (id: string): Promise<void> => {
    const { error } = await supabase.from("members").delete().eq("id", id);

    if (error) {
      console.error("Error deleting member:", error);
      throw error;
    }
  };

  const membersQuery = useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
  });

  const createMemberMutation = useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast({
        title: "Membro criado",
        description: "O membro foi adicionado com sucesso.",
      });
    },
    onError: (error) => {
      console.error("Error creating member:", error);
      toast({
        title: "Erro ao criar membro",
        description: "Ocorreu um erro ao adicionar o membro.",
        variant: "destructive",
      });
    },
  });

  const updateMemberMutation = useMutation({
    mutationFn: updateMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast({
        title: "Membro atualizado",
        description: "O membro foi atualizado com sucesso.",
      });
    },
    onError: (error) => {
      console.error("Error updating member:", error);
      toast({
        title: "Erro ao atualizar membro",
        description: "Ocorreu um erro ao atualizar o membro.",
        variant: "destructive",
      });
    },
  });

  const deleteMemberMutation = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast({
        title: "Membro excluído",
        description: "O membro foi excluído com sucesso.",
      });
    },
    onError: (error) => {
      console.error("Error deleting member:", error);
      toast({
        title: "Erro ao excluir membro",
        description: "Ocorreu um erro ao excluir o membro.",
        variant: "destructive",
      });
    },
  });

  return {
    members: membersQuery.data || [],
    isLoading: membersQuery.isLoading,
    isError: membersQuery.isError,
    createMember: createMemberMutation.mutate,
    updateMember: updateMemberMutation.mutate,
    deleteMember: deleteMemberMutation.mutate,
  };
};
