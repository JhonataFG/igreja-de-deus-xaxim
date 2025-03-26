import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Clipboard, Check, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  whatsapp: string | null;
  subject: string;
  message: string;
  created_at: string;
  status: "contatado" | "não contatado";
};

export default function AdminContact() {
  const { toast } = useToast();
  
  const fetchContactSubmissions = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data as ContactSubmission[];
  };

  const {
    data: submissions,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["contactSubmissions"],
    queryFn: fetchContactSubmissions,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const copyToClipboard = (text: string, type: 'email' | 'whatsapp' = 'email') => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: `O ${type === 'email' ? 'email' : 'número de WhatsApp'} foi copiado para a área de transferência.`,
    });
  };

  const updateStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "contatado" ? "não contatado" : "contatado";
    
    const { error } = await supabase
      .from("contact_submissions")
      .update({ status: newStatus })
      .eq("id", id);
    
    if (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status do contato.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Status atualizado",
      description: `Contato marcado como "${newStatus}".`,
    });
    
    refetch();
  };

  return (
    <AdminLayout title="Mensagens de Contato">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Mensagens de Contato</h1>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 text-destructive p-4 rounded-md">
            Erro ao carregar mensagens. Por favor, tente novamente mais tarde.
          </div>
        ) : submissions?.length === 0 ? (
          <div className="bg-muted p-8 text-center rounded-md">
            <p className="text-muted-foreground">
              Nenhuma mensagem de contato recebida ainda.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>WhatsApp</TableHead>
                  <TableHead>Assunto</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions?.map((submission) => (
                  <TableRow key={submission.id} className="group">
                    <TableCell className="font-medium">
                      {formatDate(submission.created_at)}
                    </TableCell>
                    <TableCell>{submission.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="truncate max-w-32">{submission.email}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard(submission.email, 'email')}
                          title="Copiar email"
                        >
                          <Clipboard className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      {submission.whatsapp ? (
                        <div className="flex items-center gap-2">
                          <span className="truncate max-w-32">{submission.whatsapp}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => copyToClipboard(submission.whatsapp || '', 'whatsapp')}
                            title="Copiar WhatsApp"
                          >
                            <Phone className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm italic">Não informado</span>
                      )}
                    </TableCell>
                    <TableCell>{submission.subject}</TableCell>
                    <TableCell>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          submission.status === "contatado" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {submission.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8"
                          onClick={() => updateStatus(submission.id, submission.status)}
                        >
                          <Check className="h-3.5 w-3.5 mr-1" />
                          {submission.status === "contatado" ? "Marcar como não contatado" : "Marcar como contatado"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Detalhes das Mensagens</h2>
          <div className="grid gap-6">
            {submissions?.map((submission) => (
              <div key={`detail-${submission.id}`} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{submission.subject}</h3>
                    <div className="text-sm text-muted-foreground">
                      De: {submission.name} ({submission.email})
                      {submission.whatsapp && (
                        <span className="ml-2 flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5" />
                          {submission.whatsapp}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 ml-1"
                            onClick={() => copyToClipboard(submission.whatsapp || '', 'whatsapp')}
                            title="Copiar WhatsApp"
                          >
                            <Clipboard className="h-3.5 w-3.5" />
                          </Button>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-sm text-muted-foreground">
                      {formatDate(submission.created_at)}
                    </div>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        submission.status === "contatado" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {submission.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-line">{submission.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
