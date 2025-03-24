
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

export default function AdminContact() {
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
          <div className="grid gap-6">
            {submissions?.map((submission) => (
              <div key={submission.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{submission.subject}</h3>
                    <div className="text-sm text-muted-foreground">
                      De: {submission.name} ({submission.email})
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(submission.created_at)}
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-line">{submission.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
