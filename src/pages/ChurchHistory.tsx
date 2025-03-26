import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Book, Building, CalendarDays, Users, Church, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const ChurchHistory = () => {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero Section - Modern Overlay with Parallax Effect */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/id_xaxim_1.JPG')] bg-cover bg-center bg-fixed transform scale-105"></div>
          <div className="absolute inset-0 bg-quaternary/70 backdrop-blur-sm"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                História da Igreja de Deus no Brasil
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
                Conheça a jornada de fé que trouxe a Igreja de Deus ao Brasil e seu impacto em nossa nação.
              </p>
            </div>
          </div>
        </section>

        {/* Main History Section - Card-based Timeline */}
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="mb-16 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium uppercase tracking-wider mb-4">
                  Nossa Trajetória
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold mt-2">
                  A Chegada da Igreja de Deus ao Brasil
                </h2>
                <div className="h-1 w-24 bg-primary/30 rounded mx-auto mt-6"></div>
              </div>

              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-xl text-center text-muted-foreground">
                  A Igreja de Deus teve sua origem nos Estados Unidos em 1886, mas foi somente na década de
                  1950 que suas primeiras missões começaram a chegar ao Brasil. O trabalho missionário inicial
                  enfrentou diversos desafios em um país predominantemente católico, mas com persistência,
                  dedicação e fé, a mensagem foi levada a diferentes regiões do país.
                </p>
              </div>

              <Tabs defaultValue="timeline" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
                  <TabsTrigger value="timeline">Linha do Tempo</TabsTrigger>
                  <TabsTrigger value="impact">Impacto Social</TabsTrigger>
                </TabsList>

                <TabsContent value="timeline" className="animate-fade-in">
                  <div className="space-y-10">
                    {/* Timeline Item 1 */}
                    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                        <div className="md:col-span-5 h-full relative">
                          <AspectRatio ratio={16 / 10} className="h-full">
                            <img
                              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop"
                              alt="Primeiros Anos (1950-1960)"
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute top-4 left-4 bg-primary/90 text-white rounded-md py-1 px-3 font-medium">
                              1950-1960
                            </div>
                          </AspectRatio>
                        </div>
                        <div className="md:col-span-7 p-6 md:p-8 flex items-center">
                          <div>
                            <div className="flex items-center mb-4">
                              <CalendarDays className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                              <h3 className="text-2xl font-serif font-semibold">Primeiros Anos</h3>
                            </div>
                            <p className="text-muted-foreground">
                              Os primeiros missionários da Igreja de Deus chegaram ao Brasil em meados da
                              década de 1950, estabelecendo pequenas congregações inicialmente nos estados de
                              São Paulo e Minas Gerais. Apesar das dificuldades com o idioma e adaptação
                              cultural, o trabalho cresceu gradativamente, atraindo brasileiros interessados
                              em uma nova expressão de fé cristã.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Timeline Item 2 */}
                    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                        <div className="md:col-span-7 order-2 md:order-1 p-6 md:p-8 flex items-center">
                          <div>
                            <div className="flex items-center mb-4">
                              <Building className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                              <h3 className="text-2xl font-serif font-semibold">Expansão</h3>
                            </div>
                            <p className="text-muted-foreground">
                              Nas décadas seguintes, a Igreja de Deus experimentou um crescimento
                              significativo, expandindo-se para outras regiões do país. Pastores brasileiros
                              começaram a ser formados, o que facilitou a contextualização da mensagem e a
                              conexão com a cultura local. O primeiro seminário da denominação foi
                              estabelecido em 1968, formando líderes nacionais que ajudariam a consolidar o
                              trabalho em todo o território.
                            </p>
                          </div>
                        </div>
                        <div className="md:col-span-5 order-1 md:order-2 h-full relative">
                          <AspectRatio ratio={16 / 10} className="h-full">
                            <img
                              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop"
                              alt="Expansão (1960-1980)"
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute top-4 right-4 bg-primary/90 text-white rounded-md py-1 px-3 font-medium">
                              1960-1980
                            </div>
                          </AspectRatio>
                        </div>
                      </div>
                    </Card>

                    {/* Timeline Item 3 */}
                    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                        <div className="md:col-span-5 h-full relative">
                          <AspectRatio ratio={16 / 10} className="h-full">
                            <img
                              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop"
                              alt="Consolidação (1980-2000)"
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute top-4 left-4 bg-primary/90 text-white rounded-md py-1 px-3 font-medium">
                              1980-2000
                            </div>
                          </AspectRatio>
                        </div>
                        <div className="md:col-span-7 p-6 md:p-8 flex items-center">
                          <div>
                            <div className="flex items-center mb-4">
                              <Users className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                              <h3 className="text-2xl font-serif font-semibold">Consolidação</h3>
                            </div>
                            <p className="text-muted-foreground">
                              Durante as décadas de 1980 e 1990, a Igreja de Deus no Brasil passou por um
                              período de consolidação, com estruturas administrativas sendo estabelecidas e a
                              formação de uma identidade nacional mais forte. O número de congregações
                              continuou crescendo, e programas sociais começaram a ser implementados,
                              atendendo comunidades carentes em diversas regiões do país.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Timeline Item 4 */}
                    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                        <div className="md:col-span-7 order-2 md:order-1 p-6 md:p-8 flex items-center">
                          <div>
                            <div className="flex items-center mb-4">
                              <Church className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                              <h3 className="text-2xl font-serif font-semibold">Era Moderna</h3>
                            </div>
                            <p className="text-muted-foreground">
                              No novo milênio, a Igreja de Deus se adaptou às mudanças culturais e
                              tecnológicas, alcançando novas gerações através de meios digitais e abordagens
                              contemporâneas. O compromisso com a educação teológica se fortaleceu, e
                              parcerias com outras denominações foram estabelecidas para projetos sociais e
                              evangelísticos.
                            </p>
                            <p className="text-muted-foreground mt-3">
                              Hoje, a Igreja de Deus está presente em todos os estados brasileiros, com
                              milhares de congregações e uma variada gama de ministérios que atendem
                              diferentes necessidades sociais e espirituais.
                            </p>
                          </div>
                        </div>
                        <div className="md:col-span-5 order-1 md:order-2 h-full relative">
                          <AspectRatio ratio={16 / 10} className="h-full">
                            <img
                              src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=800&auto=format&fit=crop"
                              alt="Era Moderna (2000-Presente)"
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute top-4 right-4 bg-primary/90 text-white rounded-md py-1 px-3 font-medium">
                              2000-Presente
                            </div>
                          </AspectRatio>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="impact" className="animate-scale-in">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all border-none">
                      <div className="p-1">
                        <AspectRatio ratio={4 / 3} className="bg-primary/10 rounded-t-lg overflow-hidden">
                          <div className="flex items-center justify-center h-full">
                            <BookOpen className="w-16 h-16 text-primary/70" />
                          </div>
                        </AspectRatio>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-serif font-semibold mb-3">Educação</h3>
                        <p className="text-muted-foreground">
                          A Igreja de Deus estabeleceu escolas e centros educacionais em diversas comunidades,
                          contribuindo para a alfabetização e formação profissional de milhares de
                          brasileiros.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all border-none">
                      <div className="p-1">
                        <AspectRatio ratio={4 / 3} className="bg-primary/10 rounded-t-lg overflow-hidden">
                          <div className="flex items-center justify-center h-full">
                            <Users className="w-16 h-16 text-primary/70" />
                          </div>
                        </AspectRatio>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-serif font-semibold mb-3">Assistência Social</h3>
                        <p className="text-muted-foreground">
                          Através de diversos projetos sociais, a Igreja de Deus tem auxiliado comunidades
                          carentes com programas de distribuição de alimentos, assistência médica e apoio a
                          famílias vulneráveis.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all border-none">
                      <div className="p-1">
                        <AspectRatio ratio={4 / 3} className="bg-primary/10 rounded-t-lg overflow-hidden">
                          <div className="flex items-center justify-center h-full">
                            <Book className="w-16 h-16 text-primary/70" />
                          </div>
                        </AspectRatio>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-serif font-semibold mb-3">Cultura</h3>
                        <p className="text-muted-foreground">
                          A denominação tem contribuído para a música gospel brasileira e outras expressões
                          culturais, enriquecendo o cenário artístico nacional com valores cristãos.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* CTA Section - Modern Design */}
        <section className="py-16 bg-gradient-to-br from-quaternary/80 to-quaternary">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto rounded-2xl bg-white/10 backdrop-blur-sm p-8 md:p-12 shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-serif font-semibold text-white mb-2">
                    Conheça Nossa Igreja Local
                  </h3>
                  <p className="text-white/90">
                    Descubra como a história nacional se reflete em nossa comunidade de Xaxim.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-white text-primary hover:bg-white/90" asChild>
                    <Link to="/our-history">Nossa História Local</Link>
                  </Button>
                  <Button className="bg-secondary text-white hover:bg-secondary/90" asChild>
                    <Link to="/">Visite-nos</Link>
                  </Button>
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

export default ChurchHistory;
