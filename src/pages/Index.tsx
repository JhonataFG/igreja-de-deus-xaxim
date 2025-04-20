import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { usePublicEvents } from "@/hooks/events/use-public-events";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { events, loading } = usePublicEvents(3); // Limitando a 3 eventos

  return (
    <>
      <Navbar />
      <main>
        <HeroCarousel />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">Quem Somos</span>
              <h2 className="section-title">Bem-vindo à Igreja de Deus Xaxim</h2>
              <p className="text-muted-foreground mt-6">
                A Igreja de Deus Xaxim é uma comunidade cristã comprometida em propagar o amor de Cristo e
                servir ao próximo. Acreditamos que todos são bem-vindos ao reino de Deus, independentemente de
                sua história ou circunstâncias. Junte-se a nós em nossa jornada de fé, esperança e amor.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button>Nossa História</Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Horários de Culto
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-quaternary bg-gradient-to-br from-quaternary to-primary/80 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none select-none">
            <div className="w-96 h-96 rounded-full bg-white opacity-10 blur-3xl absolute -top-24 -left-24"></div>
            <div className="w-60 h-60 rounded-full bg-primary opacity-20 blur-2xl absolute bottom-0 right-0"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-baseline justify-between mb-12">
              <div>
                <span className="text-white text-sm font-semibold uppercase tracking-widest opacity-80">Agenda</span>
                <h2 className="text-4xl md:text-5xl font-serif font-extrabold mt-2 text-white drop-shadow-[0_2px_6px_rgba(79,120,147,0.4)]">Próximos Eventos</h2>
              </div>
              <Link to="/events" className="text-white flex items-center gap-1 hover:underline font-medium transition-colors duration-200 opacity-90 hover:opacity-100">
                Ver Todos
                <ChevronRight className="h-5 w-5 ml-0.5" />
              </Link>
            </div>

            <div className="relative">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex flex-col h-full rounded-2xl overflow-hidden bg-white/80 shadow-xl animate-pulse border border-white/20"
                    >
                      <Skeleton className="h-48 w-full rounded-t-2xl" />
                      <div className="p-6">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-4" />
                        <Skeleton className="h-4 w-2/3 mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-6" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {events.map((event, i) => (
                    <div
                      key={event.id}
                      className="group animate-fade-in"
                      style={{ animationDelay: `${i * 0.12}s` }}
                    >
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white/10 rounded-2xl shadow-inner border-2 border-dashed border-white/30">
                  <h3 className="text-2xl font-bold mb-2 text-white">Não há eventos cadastrados</h3>
                  <p className="text-white/70">Entre no painel administrativo para adicionar eventos.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                Nossos Serviços
              </span>
              <h2 className="section-title">Como Podemos Servir Você</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div
                className="p-6 text-center rounded-lg hover:shadow-md transition-all animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.7 7.6 1 12C2.7 16.4 7 19.5 12 19.5C17 19.5 21.3 16.4 23 12C21.3 7.6 17 4.5 12 4.5ZM12 17C9.2 17 7 14.8 7 12C7 9.2 9.2 7 12 7C14.8 7 17 9.2 17 12C17 14.8 14.8 17 12 17ZM12 9C10.3 9 9 10.3 9 12C9 13.7 10.3 15 12 15C13.7 15 15 13.7 15 12C15 10.3 13.7 9 12 9Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">Cultos Semanais</h3>
                <p className="text-muted-foreground">
                  Participe de nossos cultos semanais cheios de adoração, ensino bíblico e comunhão.
                </p>
              </div>

              <div
                className="p-6 text-center rounded-lg hover:shadow-md transition-all animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.5 4.5C4.5 3.12 5.62 2 7 2H17C18.38 2 19.5 3.12 19.5 4.5V19.5C19.5 20.88 18.38 22 17 22H7C5.62 22 4.5 20.88 4.5 19.5V4.5ZM9 18.75H15V17.25H9V18.75ZM16.5 13.5C16.5 11.43 14.82 9.75 12.75 9.75H11.25C9.18 9.75 7.5 11.43 7.5 13.5C7.5 15.57 9.18 17.25 11.25 17.25H12.75C14.82 17.25 16.5 15.57 16.5 13.5ZM12 8.25C13.24 8.25 14.25 7.24 14.25 6C14.25 4.76 13.24 3.75 12 3.75C10.76 3.75 9.75 4.76 9.75 6C9.75 7.24 10.76 8.25 12 8.25Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">Grupos Familiares</h3>
                <p className="text-muted-foreground">
                  Faça parte de nossos grupos familiares, onde cultivamos relacionamentos e crescemos juntos
                  na fé.
                </p>
              </div>

              <div
                className="p-6 text-center rounded-lg hover:shadow-md transition-all animate-fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 5.5C5.27 5.5 0 9.14 0 14C0 16.07 0.97 17.95 2.58 19.4C2.37 20.17 1.99 21.42 1.07 22.5C1 22.59 0.97 22.71 0.97 22.83C0.97 23.09 1.18 23.3 1.44 23.3C1.45 23.3 1.47 23.3 1.48 23.3C1.52 23.29 4.18 23 6.07 21.93C7.71 22.47 9.76 22.75 12 22.75C18.73 22.75 24 19.11 24 14.25C24 9.39 18.73 5.5 12 5.5ZM6.5 15.5C5.67 15.5 5 14.83 5 14C5 13.17 5.67 12.5 6.5 12.5C7.33 12.5 8 13.17 8 14C8 14.83 7.33 15.5 6.5 15.5ZM12 15.5C11.17 15.5 10.5 14.83 10.5 14C10.5 13.17 11.17 12.5 12 12.5C12.83 12.5 13.5 13.17 13.5 14C13.5 14.83 12.83 15.5 12 15.5ZM17.5 15.5C16.67 15.5 16 14.83 16 14C16 13.17 16.67 12.5 17.5 12.5C18.33 12.5 19 13.17 19 14C19 14.83 18.33 15.5 17.5 15.5Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">Aconselhamento</h3>
                <p className="text-muted-foreground">
                  Oferecemos aconselhamento pastoral e espiritual para ajudar em momentos de necessidade.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
