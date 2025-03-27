
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MemberTable from "@/components/admin/presence/MemberTable";
import MemberDialog from "@/components/admin/presence/MemberDialog";
import { useMembers } from "@/hooks/presence/use-members";
import { MemberProps, MemberFormValues } from "@/types/member";

const AdminMembers = () => {
  // Member state
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberProps | undefined>(undefined);

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

  return (
    <AdminLayout title="Gerenciamento de Membros">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Membros</h2>
        <Button onClick={handleAddMember} size="sm">
          <Plus className="mr-1 h-4 w-4" /> Adicionar Membro
        </Button>
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
