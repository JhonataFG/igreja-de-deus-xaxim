
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus, UserPlus } from "lucide-react";
import MemberTable from "@/components/admin/presence/MemberTable";
import MemberDialog from "@/components/admin/presence/MemberDialog";
import { useMembers } from "@/hooks/presence/use-members";
import { MemberProps, MemberFormValues } from "@/types/member";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminMembers = () => {
  // Member state
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberProps | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Hooks
  const {
    members,
    isLoading: isMembersLoading,
    createMember,
    updateMember,
    deleteMember,
  } = useMembers();

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

  const generateRandomMembers = async () => {
    try {
      setIsGenerating(true);
      
      // Sample data for generating random members
      const firstNames = [
        "Maria", "João", "Ana", "Pedro", "Luiza", "Carlos", "Juliana", "José", "Fernanda", "Lucas",
        "Beatriz", "Rafael", "Amanda", "Guilherme", "Isabela", "Paulo", "Camila", "Daniel", "Mariana", "Felipe",
        "Gabriela", "Bruno", "Carolina", "Matheus", "Sofia"
      ];
      
      const lastNames = [
        "Silva", "Santos", "Oliveira", "Souza", "Pereira", "Lima", "Costa", "Rodrigues", "Almeida", "Ferreira",
        "Carvalho", "Gomes", "Martins", "Araújo", "Ribeiro", "Barbosa", "Cardoso", "Moreira", "Mendes", "Dias"
      ];
      
      const addresses = [
        "Rua das Flores", "Avenida Principal", "Rua dos Cravos", "Alameda das Rosas", "Avenida Central",
        "Rua do Comércio", "Travessa da Paz", "Avenida Brasil", "Rua São Paulo", "Rua Rio de Janeiro"
      ];
      
      // Create array to hold all new member data
      const membersToCreate = [];
      
      // Generate 50 random members
      for (let i = 0; i < 50; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const name = `${firstName} ${lastName}`;
        
        // Generate random email (some can be null)
        const email = Math.random() > 0.2 ? 
          `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`.normalize('NFD').replace(/[\u0300-\u036f]/g, "") : null;
        
        // Generate random phone (some can be null)
        const phone = Math.random() > 0.3 ? 
          `(${Math.floor(Math.random() * 90) + 10}) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}` : null;
        
        // Generate random address (some can be null)
        const address = Math.random() > 0.4 ? 
          `${addresses[Math.floor(Math.random() * addresses.length)]}, ${Math.floor(Math.random() * 1000) + 1}` : null;
        
        // Generate random birth date (some can be null)
        const birthDate = Math.random() > 0.3 ? 
          new Date(Date.now() - Math.floor(Math.random() * 40 * 365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0] : null;
        
        // Status (mostly active)
        const status = Math.random() > 0.2 ? 'active' : 'inactive';
        
        membersToCreate.push({
          name,
          email,
          phone,
          address,
          birth_date: birthDate,
          status,
          photo_url: null,
        });
      }
      
      // Batch insert all members at once
      const { error } = await supabase
        .from("members")
        .insert(membersToCreate);
      
      if (error) throw error;
      
      toast({
        title: "Membros gerados",
        description: "50 membros foram adicionados com sucesso.",
      });
      
      // Refresh member list
      window.location.reload();
      
    } catch (error) {
      console.error("Error generating members:", error);
      toast({
        title: "Erro ao gerar membros",
        description: "Ocorreu um erro ao gerar os membros.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AdminLayout title="Gerenciamento de Membros">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Membros</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={generateRandomMembers}
            disabled={isGenerating}
          >
            <UserPlus className="mr-1 h-4 w-4" /> 
            {isGenerating ? "Gerando..." : "Gerar 50 Membros"}
          </Button>
          <Button onClick={handleAddMember} size="sm">
            <Plus className="mr-1 h-4 w-4" /> Adicionar Membro
          </Button>
        </div>
      </div>

      {isMembersLoading ? (
        <div className="text-center py-8">Carregando membros...</div>
      ) : (
        <MemberTable
          members={members}
          onEdit={handleEditMember}
          onDelete={deleteMember}
        />
      )}

      <MemberDialog
        isOpen={isMemberDialogOpen}
        onClose={() => setIsMemberDialogOpen(false)}
        onSave={handleSaveMember}
        member={selectedMember}
      />
    </AdminLayout>
  );
};

export default AdminMembers;
