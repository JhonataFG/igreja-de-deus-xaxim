
import { ChangeEvent, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null, file?: File | null) => void;
  bucketName: string;
  label?: string;
  hint?: string;
  previewMode?: boolean;
}

export interface ImageUploadRef {
  uploadImage: () => Promise<string | null>;
}

const ImageUpload = forwardRef<ImageUploadRef, ImageUploadProps>(({ 
  value, 
  onChange, 
  bucketName, 
  label = "Imagem", 
  hint,
  previewMode = false
}, ref) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erro ao selecionar imagem",
        description: "A imagem deve ter no máximo 5MB",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Erro ao selecionar imagem",
        description: "O arquivo deve ser uma imagem",
        variant: "destructive",
      });
      return;
    }

    // Create a local preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setSelectedFile(file);
    
    // Pass the file to parent component without uploading yet
    onChange(previewMode ? objectUrl : null, file);
  };

  // This function will be called by the parent component when the form is submitted
  const uploadImage = async (): Promise<string | null> => {
    if (!selectedFile) return value; // Return existing value if no new file selected

    try {
      setIsUploading(true);

      // Create a unique filename
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage.from(bucketName).upload(fileName, selectedFile);

      if (error) throw error;

      // Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(fileName);

      // Update the preview with the real URL
      setPreview(publicUrl);
      
      toast({
        title: "Upload realizado",
        description: "A imagem foi enviada com sucesso",
      });
      
      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Erro ao fazer upload",
        description: "Não foi possível enviar a imagem",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
      setSelectedFile(null); // Clear the selected file after upload
    }
  };

  // Expose the uploadImage function via ref
  useImperativeHandle(ref, () => ({
    uploadImage
  }));

  const handleRemoveImage = () => {
    if (selectedFile) {
      // If there's a local preview, revoke the object URL to prevent memory leaks
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setSelectedFile(null);
    onChange(null, null);
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
          {selectedFile && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 text-center">
              Imagem selecionada: {selectedFile.name}
            </div>
          )}
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
            onChange={handleImageSelection}
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
                  <Upload className="mr-2 h-4 w-4" /> Selecionar imagem
                </>
              )}
            </Button>
          </Label>
        </div>
      )}
      {value && !preview && <div className="text-sm text-muted-foreground mt-2">URL: {value}</div>}
    </div>
  );
});

ImageUpload.displayName = "ImageUpload";

export default ImageUpload;
