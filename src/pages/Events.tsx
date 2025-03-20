
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard, { EventProps } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const events: EventProps[] = [
  {
    id: "1",
    title: "Culto de Louvor e Adoração",
    date: "26/10/2023",
    time: "19:00 - 21:00",
    location: "Templo Principal",
    description: "Um momento especial de adoração e comunhão com Deus. Venha participar deste tempo maravilhoso de louvor e adoração.",
    image: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "2",
    title: "Encontro de Jovens",
    date: "28/10/2023",
    time: "18:00 - 21:30",
    location: "Salão de Eventos",
    description: "Um encontro dinâmico para jovens com música, mensagem bíblica e muita diversão. Traga seus amigos!",
    image: "https://images.unsplash.com/photo-1523803326055-13179de6cc78?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "3",
    title: "Estudo Bíblico Semanal",
    date: "30/10/2023",
    time: "19:30 - 21:00",
    location: "Sala de Estudos",
    description: "Aprofunde seu conhecimento da Palavra de Deus em nosso estudo bíblico semanal. Todos são bem-vindos.",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "4",
    title: "Café das Mulheres",
    date: "02/11/2023",
    time: "15:00 - 17:00",
    location: "Salão Social",
    description: "Um momento especial de comunhão, compartilhamento e crescimento espiritual para as mulheres da igreja.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "5",
    title: "Culto de Oração",
    date: "03/11/2023",
    time: "06:00 - 07:30",
    location: "Capela",
    description: "Venha começar o dia em oração! Um momento poderoso de intercessão e busca da presença de Deus.",
    image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "6",
    title: "Encontro de Casais",
    date: "05/11/2023",
    time: "19:00 - 21:30",
    location: "Centro de Convenções",
    description: "Uma noite especial para fortalecer relacionamentos conjugais baseados nos princípios bíblicos.",
    image: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=600&auto=format&fit=crop&q=80"
  }
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-white/80 text-sm font-medium uppercase tracking-wider">Agenda</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-4">Nossos Eventos</h1>
              <p className="text-white/90 text-lg mb-8">
                Confira nossa programação de eventos, cultos e atividades. Sempre há algo especial acontecendo em nossa comunidade.
              </p>
              <div className="flex justify-center">
                <Button className="bg-white text-primary hover:bg-white/90 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Calendário Completo</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-lg mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Pesquisar eventos..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <h3 className="text-xl font-medium mb-2">Nenhum evento encontrado</h3>
                  <p className="text-muted-foreground">Tente outro termo de busca</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Events;
