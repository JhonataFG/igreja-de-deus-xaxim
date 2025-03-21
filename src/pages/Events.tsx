import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePublicEvents } from "@/hooks/events/use-public-events";
import { Skeleton } from "@/components/ui/skeleton";

const Events = () => {
  const { events, loading } = usePublicEvents();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-secondary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-white/80 text-sm font-medium uppercase tracking-wider">Agenda</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-4">Nossos Eventos</h1>
              <p className="text-white/90 text-lg mb-8">
                Confira nossa programação de eventos, cultos e atividades. Sempre há algo especial acontecendo
                em nossa comunidade.
              </p>
              <div className="flex justify-center">
                <Button className="bg-white text-secondary hover:bg-white/90 flex items-center gap-2">
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

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="flex flex-col h-full rounded-xl overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-5">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-4 w-2/3 mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-6" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : events.length > 0 ? (
              <div className="col-span-full text-center py-8">
                <h3 className="text-xl font-medium mb-2">Nenhum evento encontrado</h3>
                <p className="text-muted-foreground">Tente outro termo de busca</p>
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">Não há eventos cadastrados</h3>
                <p className="text-muted-foreground">
                  Entre no painel administrativo para adicionar eventos.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Events;
