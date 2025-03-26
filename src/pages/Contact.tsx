
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor informe um e-mail válido.",
  }),
  whatsapp: z.string().optional(),
  subject: z.string().min(5, {
    message: "O assunto deve ter pelo menos 5 caracteres.",
  }),
  message: z.string().min(10, {
    message: "A mensagem deve ter pelo menos 10 caracteres.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Submit form data to Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: data.name,
          email: data.email,
          whatsapp: data.whatsapp,
          subject: data.subject,
          message: data.message
        }]);
      
      if (error) {
        throw error;
      }
      
      toast.success("Mensagem enviada com sucesso!", {
        description: "Entraremos em contato em breve.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Erro ao enviar mensagem", {
        description: "Por favor, tente novamente mais tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-24 bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-8">
            Entre em Contato
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            Estamos aqui para responder suas perguntas e ouvir seus comentários. 
            Preencha o formulário abaixo ou use nossos dados de contato.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Formulário de contato */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-serif font-semibold mb-6">Envie uma mensagem</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input placeholder="seu.email@exemplo.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="(11) 98765-4321" {...field} />
                        </FormControl>
                        <FormDescription>
                          Informe seu número de WhatsApp para contato mais rápido (opcional).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assunto</FormLabel>
                        <FormControl>
                          <Input placeholder="Assunto da mensagem" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Escreva sua mensagem aqui..."
                            className="min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Compartilhe detalhes para que possamos melhor ajudá-lo.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Enviar Mensagem
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Informações de contato */}
            <div className="flex flex-col gap-10">
              <div className="bg-primary p-8 rounded-xl text-white">
                <h2 className="text-2xl font-serif font-semibold mb-6">Informações de Contato</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-lg">Endereço</h3>
                      <p className="text-white/80 mt-1">
                        Rua dos Fiéis, 123<br />
                        Bairro Esperança<br />
                        São Paulo - SP
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-lg">Telefone</h3>
                      <p className="text-white/80 mt-1">(11) 1234-5678</p>
                      <p className="text-white/80">(11) 98765-4321 (WhatsApp)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-lg">E-mail</h3>
                      <p className="text-white/80 mt-1">contato@igrejadapaz.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-serif font-semibold mb-6">Horários de Culto</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Domingo - Culto da Família</span>
                    <span>9:00 e 19:00</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Quarta - Culto de Oração</span>
                    <span>19:30</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Sexta - Culto de Jovens</span>
                    <span>20:00</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Sábado - Escola Bíblica</span>
                    <span>18:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mapa */}
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-semibold mb-6 text-center">
              Como Chegar
            </h2>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975803702774!2d-46.6495889!3d-23.564518699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1654801624106!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da Igreja"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
