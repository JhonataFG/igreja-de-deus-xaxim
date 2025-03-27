import { ChangeEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  bucketName: string;
  label?: string;
  hint?: string;
}

const ImageUpload = ({ value, onChange, bucketName, label = "Imagem", hint }: ImageUploadProps) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value);
  const { toast } = useToast();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erro ao fazer upload",
        description: "A imagem deve ter no máximo 5MB",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Erro ao fazer upload",
        description: "O arquivo deve ser uma imagem",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);

      // Create a unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage.from(bucketName).upload(fileName, file);

      if (error) throw error;

      // Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(fileName);

      // Set the image URL
      setPreview(publicUrl);
      onChange(publicUrl);

      toast({
        title: "Upload realizado",
        description: "A imagem foi enviada com sucesso",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Erro ao fazer upload",
        description: "Não foi possível enviar a imagem",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {preview ? (
        <div className="relative">
          <img src={preview} alt="Preview" className="w-full h-60 object-cover rounded-md" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-8 flex flex-col items-center justify-center gap-2">
          <Image className="h-12 w-12 text-gray-400" />
          <div className="text-center">
            <p className="text-sm text-gray-600">Clique para selecionar uma imagem</p>
            {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
          </div>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            ref={fileInputRef}
          />
          <Label htmlFor="image-upload" className="cursor-pointer">
            <Button
              type="button"
              variant="outline"
              disabled={isUploading}
              className="mt-3"
              onClick={handleButtonClick}
            >
              {isUploading ? (
                <>Enviando...</>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" /> Fazer upload
                </>
              )}
            </Button>
          </Label>
        </div>
      )}
      {value && !preview && <div className="text-sm text-muted-foreground mt-2">URL: {value}</div>}
    </div>
  );
};

export default ImageUpload;
