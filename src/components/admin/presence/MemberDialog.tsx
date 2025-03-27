
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MemberProps, MemberFormValues } from "@/types/member";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

interface MemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: MemberFormValues) => void;
  member?: MemberProps;
}

const MemberDialog = ({ isOpen, onClose, onSave, member }: MemberDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<MemberFormValues>({
    name: "",
    email: null,
    phone: null,
    address: null,
    birth_date: null,
    status: "active",
    photo_url: null,
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        email: member.email,
        phone: member.phone,
        address: member.address,
        birth_date: member.birth_date,
        status: member.status,
        photo_url: member.photo_url,
      });
      setPhotoPreview(member.photo_url);
    } else {
      setFormData({
        name: "",
        email: null,
        phone: null,
        address: null,
        birth_date: null,
        status: "active",
        photo_url: null,
      });
      setPhotoFile(null);
      setPhotoPreview(null);
    }
  }, [member, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || null,
    }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  const uploadPhoto = async (): Promise<string | null> => {
    if (!photoFile) {
      return formData.photo_url;
    }

    setIsUploading(true);
    try {
      const fileExt = photoFile.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('members')
        .upload(filePath, photoFile);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('members').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast({
        title: "Erro ao fazer upload da foto",
        description: "Não foi possível carregar a foto. Tente novamente.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isUploading) return;

    setIsUploading(true);
    try {
      // Upload photo if changed
      const photoUrl = await uploadPhoto();
      
      // Update form data with new photo URL
      const updatedData = {
        ...formData,
        photo_url: photoUrl,
      };
      
      // Save member with updated data
      onSave(updatedData);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erro ao salvar membro",
        description: "Ocorreu um erro ao salvar as informações do membro.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{member ? "Editar Membro" : "Adicionar Novo Membro"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="flex justify-center mb-4">
            <div className="space-y-2 text-center">
              <div className="flex justify-center">
                <Avatar className="h-24 w-24 border-2 border-border">
                  {photoPreview ? (
                    <AvatarImage src={photoPreview} alt="Foto do membro" />
                  ) : (
                    <AvatarFallback className="bg-muted">
                      <UserRound className="h-12 w-12 text-muted-foreground" />
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              <div>
                <Label htmlFor="photo" className="cursor-pointer text-primary">
                  <div className="flex items-center justify-center gap-1">
                    <Upload className="h-4 w-4" />
                    <span>{photoPreview ? "Alterar foto" : "Adicionar foto"}</span>
                  </div>
                </Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome*</Label>
              <Input
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birth_date">Data de Nascimento</Label>
              <Input
                id="birth_date"
                name="birth_date"
                type="date"
                value={formData.birth_date || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Endereço</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isUploading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MemberDialog;
