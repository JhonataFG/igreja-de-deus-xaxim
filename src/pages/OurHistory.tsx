import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Book, Building, CalendarDays, Users } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OurHistory = () => {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero Section - Parallax Effect */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/id_xaxim_1.JPG')] bg-cover bg-center bg-fixed transform scale-105"></div>
          <div className="absolute inset-0 bg-quaternary/70 backdrop-blur-sm"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                Nossa História
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
                Conheça a jornada de fé e dedicação que formou a Igreja de Deus Xaxim ao longo dos anos.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Section - Modern Design */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="mb-16 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium uppercase tracking-wider mb-4">
                  Nossa Jornada
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold">Os Marcos da Nossa História</h2>
                <div className="h-1 w-24 bg-primary/30 rounded mx-auto mt-6"></div>
              </div>

              <div className="relative">
                {/* Timeline vertical line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 rounded hidden md:block"></div>

                <div className="space-y-24">
                  {/* Timeline Item 1 */}
                  <div className="relative">
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary"></div>
                    <div className="md:flex items-center">
                      <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 text-right hidden md:block">
                        <span className="inline-block bg-primary text-white text-xl font-semibold px-4 py-1 rounded-md">
                          1980
                        </span>
                      </div>
                      <div className="md:w-1/2 md:pl-12">
                        <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all bg-white">
                          <div className="block md:hidden text-center mt-6">
                            <span className="inline-block bg-primary text-white text-xl font-semibold px-4 py-1 rounded-md">
                              1980
                            </span>
                          </div>
                          <CardContent className="p-0">
                            <AspectRatio ratio={16 / 9} className="bg-muted">
                              <img
                                src="https://images.unsplash.com/photo-1535850836387-0f9dfce30846?q=80&w=800&auto=format&fit=crop"
                                alt="Primeiros encontros da Igreja de Deus em Xaxim"
                                className="object-cover w-full h-full"
                              />
                            </AspectRatio>
                            <div className="p-6">
                              <div className="flex items-center mb-3">
                                <CalendarDays className="w-5 h-5 text-primary mr-2" />
                                <h3 className="text-2xl font-serif font-semibold">Primeiros Encontros</h3>
                              </div>
                              <p className="text-muted-foreground">
                                Os primeiros encontros da Igreja de Deus em Xaxim começaram em uma pequena
                                sala com apenas cinco famílias que se reuniam para orar e estudar a Palavra de
                                Deus. O que começou como um pequeno grupo de oração logo se transformou em um
                                movimento de fé.
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Item 2 */}
                  <div className="relative">
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary"></div>
                    <div className="md:flex items-center">
                      <div className="md:w-1/2 md:pr-12 text-right">
                        <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all bg-white">
                          <div className="block md:hidden text-center mt-6">
                            <span className="inline-block bg-primary text-white text-xl font-semibold px-4 py-1 rounded-md">
                              1985
                            </span>
                          </div>
                          <CardContent className="p-0">
                            <AspectRatio ratio={16 / 9} className="bg-muted">
                              <img
                                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop"
                                alt="Primeiro templo da Igreja de Deus em Xaxim"
                                className="object-cover w-full h-full"
                              />
                            </AspectRatio>
                            <div className="p-6">
                              <div className="flex items-center mb-3 md:justify-end">
                                <h3 className="text-2xl font-serif font-semibold md:order-1">
                                  Primeiro Templo
                                </h3>
                                <Building className="w-5 h-5 text-primary ml-0 mr-2 md:ml-2 md:mr-0 md:order-2" />
                              </div>
                              <p className="text-muted-foreground md:text-right">
                                Após anos de dedicação e arrecadação de fundos, foi possível adquirir um
                                terreno e construir o primeiro templo da Igreja de Deus Xaxim. A inauguração
                                foi marcada por uma celebração que reuniu mais de 200 pessoas da comunidade.
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 hidden md:block">
                        <span className="inline-block bg-primary text-white text-xl font-semibold px-4 py-1 rounded-md">
                          1985
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Item 3 */}
                  <div className="relative">
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary"></div>
                    <div className="md:flex items-center">
                      <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 text-right hidden md:block">
                        <span className="inline-block bg-primary text-white text-xl font-semibold px-4 py-1 rounded-md">
                          1995
                        </span>
                      </div>
                      <div className="md:w-1/2 md:pl-12">
                        <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all bg-white">
                          <div className="block md:hidden text-center mt-6">
                            <span className="inline-block bg-primary text-white text-xl font-semibold px-4 py-1 rounded-md">
                              1995
                            </span>
                          </div>
                          <CardContent className="p-0">
                            <AspectRatio ratio={16 / 9} className="bg-muted">
                              <img
                                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop"
                                alt="Crescimento da congregação"
                                className="object-cover w-full h-full"
                              />
                            </AspectRatio>
                            <div className="p-6">
                              <div className="flex items-center mb-3">
                                <Users className="w-5 h-5 text-primary mr-2" />
                                <h3 className="text-2xl font-serif font-semibold">
                                  Crescimento da Congregação
                                </h3>
                              </div>
                              <p className="text-muted-foreground">
                                Com o crescimento contínuo da congregação, foi necessário expandir o templo.
                                Foram adicionadas novas salas para a escola dominical e um auditório maior
                                para acomodar os cultos que agora recebiam mais de 500 fiéis regularmente.
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Item 4 */}
                  <div className="relative">
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary"></div>
                    <div className="md:flex items-center">
                      <div className="md:w-1/2 md:pr-12 text-right">
                        <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all bg-white">
                          <div className="block md:hidden text-center mt-6">
                            <span className="inline-block bg-primary text-white text-xl font-semibold px-4 py-1 rounded-md">
                              2010
                            </span>
                          </div>
                          <CardContent className="p-0">
                            <AspectRatio ratio={16 / 9} className="bg-muted">
                              <img
                                src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=800&auto=format&fit=crop"
                                alt="Nova fase da igreja com ministérios sociais"
                                className="object-cover w-full h-full"
                              />
                            </AspectRatio>
                            <div className="p-6">
                              <div className="flex items-center mb-3 md:justify-end">
                                <h3 className="text-2xl font-serif font-semibold md:order-1">Nova Fase</h3>
                                <Book className="w-5 h-5 text-primary ml-0 mr-2 md:ml-2 md:mr-0 md:order-2" />
                              </div>
                              <p className="text-muted-foreground md:text-right">
                                A igreja começou uma nova fase com a implementação de ministérios sociais,
                                atendendo às necessidades da comunidade local. Foram criados programas de
                                auxílio a famílias carentes, aulas de música para jovens e grupos de apoio
                                diversos.
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 hidden md:block">
                        <span className="inline-block bg-primary text-white text-xl font-semibold px-4 py-1 rounded-md">
                          2010
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Item 5 */}
                  <div className="relative">
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary"></div>
                    <div className="md:flex items-center">
                      <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 text-right hidden md:block">
                        <span className="inline-block bg-primary text-white text-xl font-semibold px-4 py-1 rounded-md">
                          Hoje
                        </span>
                      </div>
                      <div className="md:w-1/2 md:pl-12">
                        <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all bg-white">
                          <div className="block md:hidden text-center mt-6">
                            <span className="inline-block bg-primary text-white text-xl font-semibold px-4 py-1 rounded-md">
                              Hoje
                            </span>
                          </div>
                          <CardContent className="p-0">
                            <AspectRatio ratio={16 / 9} className="bg-muted">
                              <img
                                src="/id_xaxim_1.JPG"
                                alt="Igreja atual"
                                className="object-cover w-full h-full"
                              />
                            </AspectRatio>
                            <div className="p-6">
                              <div className="flex items-center mb-3">
                                <Building className="w-5 h-5 text-primary mr-2" />
                                <h3 className="text-2xl font-serif font-semibold">Igreja Atual</h3>
                              </div>
                              <p className="text-muted-foreground">
                                Hoje, a Igreja de Deus Xaxim continua sua missão de espalhar o amor de Cristo
                                e servir à comunidade. Com uma congregação forte e unida, seguimos olhando
                                para o futuro com esperança e fé, sempre buscando novos caminhos para impactar
                                positivamente a vida das pessoas.
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section - Card Design */}
        <section className="py-16 bg-gradient-to-br from-quaternary/10 to-quaternary/20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium uppercase tracking-wider mb-4">
                Fundamentos
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Nossos Valores</h2>
              <p className="text-muted-foreground">
                Os princípios que guiam nossa caminhada e moldam nossa identidade como comunidade de fé.
              </p>
              <div className="h-1 w-24 bg-primary/30 rounded mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all border-none">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 h-20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4.5C7 4.5 2.7 7.6 1 12C2.7 16.4 7 19.5 12 19.5C17 19.5 21.3 16.4 23 12C21.3 7.6 17 4.5 12 4.5ZM12 17C9.2 17 7 14.8 7 12C7 9.2 9.2 7 12 7C14.8 7 17 9.2 17 12C17 14.8 14.8 17 12 17ZM12 9C10.3 9 9 10.3 9 12C9 13.7 10.3 15 12 15C13.7 15 15 13.7 15 12C15 10.3 13.7 9 12 9Z" />
                    </svg>
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-serif font-semibold mb-3">Fé</h3>
                  <p className="text-muted-foreground">
                    Acreditamos na importância de uma fé viva e ativa, que se manifesta através do amor ao
                    próximo e do serviço à comunidade.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all border-none">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 h-20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-serif font-semibold mb-3">Amor</h3>
                  <p className="text-muted-foreground">
                    O amor é o centro de nossa missão. Buscamos amar a Deus sobre todas as coisas e ao próximo
                    como a nós mesmos.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all border-none">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 h-20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-serif font-semibold mb-3">Comunidade</h3>
                  <p className="text-muted-foreground">
                    Valorizamos o senso de comunidade e família. Juntos, crescemos, servimos e celebramos
                    nossa jornada de fé.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section - Modern Glassmorphism */}
        <section className="py-16 bg-gradient-to-br from-quaternary/80 to-quaternary">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto rounded-2xl bg-white/10 backdrop-blur-sm p-8 md:p-12 shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-serif font-semibold text-white mb-4">
                    Venha nos Visitar
                  </h3>
                  <p className="text-white/90">Faça parte da nossa comunidade e cresça em fé conosco.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-white text-primary hover:bg-white/90">Horários de Culto</Button>
                  <Button className="bg-secondary text-white hover:bg-secondary/90">Entre em Contato</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default OurHistory;
