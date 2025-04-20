
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
        <section
          className="relative bg-gradient-to-br from-quaternary to-primary/80 py-16"
          style={{
            // Leve "vidro" e iluminação
            background:
              "linear-gradient(111.4deg, rgba(238,113,113,0.12) 1%, rgba(246,215,148,0.15) 58%)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            <div className="w-96 h-96 rounded-full bg-white opacity-10 blur-3xl absolute -top-24 -left-24"></div>
            <div className="w-60 h-60 rounded-full bg-primary opacity-20 blur-2xl absolute bottom-0 right-0"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-white/80 text-xs font-medium uppercase tracking-wider">Agenda</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-4 text-white drop-shadow-[0_2px_6px_rgba(79,120,147,0.28)]">
                Nossos Eventos
              </h1>
              <p className="text-white/90 text-lg mb-8">
                Confira nossa programação de eventos, cultos e atividades. Sempre há algo especial acontecendo
                em nossa comunidade.
              </p>
              <div className="flex justify-center">
                <Button className="bg-white/90 text-primary/90 hover:bg-white flex items-center gap-2 shadow-md rounded-full px-6 py-3 font-semibold transition backdrop-blur-xl border border-primary/10">
                  <Calendar className="h-5 w-5" />
                  <span>Calendário Completo</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-t from-white/80 to-white/95">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-lg mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Pesquisar eventos..."
                  className="pl-11 pr-4 py-3 rounded-full bg-white/90 border border-primary/10 shadow focus:ring-2 focus:ring-primary/30 text-base transition placeholder:text-primary/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    backdropFilter: "blur(6px)",
                  }}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/50" />
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="flex flex-col h-full rounded-2xl overflow-hidden bg-white/40 backdrop-blur-lg shadow-lg animate-pulse border border-white/20"
                  >
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
                {filteredEvents.map((event, i) => (
                  <div
                    key={event.id}
                    className="group animate-fade-in"
                    style={{ animationDelay: `${i * 0.10}s` }}
                  >
                    <div className="rounded-2xl shadow-xl bg-white/60 border border-white/25 backdrop-blur-xl glass relative overflow-hidden transition hover:scale-[1.02] hover:shadow-2xl hover:bg-white/80 duration-400 flex flex-col h-full cursor-pointer">
                      <EventCard event={event} />
                    </div>
                  </div>
                ))}
              </div>
            ) : events.length > 0 ? (
              <div className="col-span-full text-center py-8">
                <h3 className="text-xl font-medium mb-2 text-primary">Nenhum evento encontrado</h3>
                <p className="text-muted-foreground">Tente outro termo de busca</p>
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2 text-primary">Não há eventos cadastrados</h3>
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

