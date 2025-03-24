
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Book, Building, CalendarDays, Users, Church, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const ChurchHistory = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative bg-quaternary py-24 md:py-32">
          <div className="absolute inset-0 bg-[url('/id_xaxim_1.JPG')] bg-cover bg-center opacity-20"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                História da Igreja de Deus no Brasil
              </h1>
              <p className="text-white/80 text-lg md:text-xl">
                Conheça a jornada de fé que trouxe a Igreja de Deus ao Brasil e seu impacto em nossa nação.
              </p>
            </div>
          </div>
        </section>

        {/* Main History Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 text-center">
                <span className="text-primary text-sm font-medium uppercase tracking-wider">Nossa Trajetória</span>
                <h2 className="text-3xl font-serif font-semibold mt-2">A Chegada da Igreja de Deus ao Brasil</h2>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p>
                  A Igreja de Deus teve sua origem nos Estados Unidos em 1886, mas foi somente na década de 1950 que 
                  suas primeiras missões começaram a chegar ao Brasil. O trabalho missionário inicial enfrentou 
                  diversos desafios em um país predominantemente católico, mas com persistência, dedicação e fé, 
                  a mensagem foi levada a diferentes regiões do país.
                </p>
                
                <div className="my-8 bg-quaternary/10 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <CalendarDays className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-xl font-serif font-medium">Primeiros Anos (1950-1960)</h3>
                  </div>
                  <p>
                    Os primeiros missionários da Igreja de Deus chegaram ao Brasil em meados da década de 1950, 
                    estabelecendo pequenas congregações inicialmente nos estados de São Paulo e Minas Gerais. 
                    Apesar das dificuldades com o idioma e adaptação cultural, o trabalho cresceu gradativamente, 
                    atraindo brasileiros interessados em uma nova expressão de fé cristã.
                  </p>
                </div>

                <div className="my-8 bg-quaternary/10 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Building className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-xl font-serif font-medium">Expansão (1960-1980)</h3>
                  </div>
                  <p>
                    Nas décadas seguintes, a Igreja de Deus experimentou um crescimento significativo, 
                    expandindo-se para outras regiões do país. Pastores brasileiros começaram a ser formados, 
                    o que facilitou a contextualização da mensagem e a conexão com a cultura local. 
                    O primeiro seminário da denominação foi estabelecido em 1968, formando líderes nacionais 
                    que ajudariam a consolidar o trabalho em todo o território.
                  </p>
                </div>

                <div className="my-8 bg-quaternary/10 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-xl font-serif font-medium">Consolidação (1980-2000)</h3>
                  </div>
                  <p>
                    Durante as décadas de 1980 e 1990, a Igreja de Deus no Brasil passou por um período de 
                    consolidação, com estruturas administrativas sendo estabelecidas e a formação de uma 
                    identidade nacional mais forte. O número de congregações continuou crescendo, e programas 
                    sociais começaram a ser implementados, atendendo comunidades carentes em diversas regiões do país.
                  </p>
                </div>

                <div className="my-8 bg-quaternary/10 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Church className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-xl font-serif font-medium">Era Moderna (2000-Presente)</h3>
                  </div>
                  <p>
                    No novo milênio, a Igreja de Deus se adaptou às mudanças culturais e tecnológicas, 
                    alcançando novas gerações através de meios digitais e abordagens contemporâneas. 
                    O compromisso com a educação teológica se fortaleceu, e parcerias com outras denominações 
                    foram estabelecidas para projetos sociais e evangelísticos.
                  </p>
                  <p>
                    Hoje, a Igreja de Deus está presente em todos os estados brasileiros, com milhares de 
                    congregações e uma variada gama de ministérios que atendem diferentes necessidades sociais 
                    e espirituais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 bg-quaternary/10">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">Nosso Impacto</span>
              <h2 className="text-3xl font-serif font-semibold mt-2">
                Contribuições para a Sociedade Brasileira
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-3 text-center">Educação</h3>
                <p className="text-muted-foreground">
                  A Igreja de Deus estabeleceu escolas e centros educacionais em diversas comunidades, 
                  contribuindo para a alfabetização e formação profissional de milhares de brasileiros.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-3 text-center">Assistência Social</h3>
                <p className="text-muted-foreground">
                  Através de diversos projetos sociais, a Igreja de Deus tem auxiliado comunidades carentes 
                  com programas de distribuição de alimentos, assistência médica e apoio a famílias vulneráveis.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Book className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-3 text-center">Cultura</h3>
                <p className="text-muted-foreground">
                  A denominação tem contribuído para a música gospel brasileira e outras expressões culturais, 
                  enriquecendo o cenário artístico nacional com valores cristãos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="bg-quaternary rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl md:text-3xl font-serif font-semibold text-secondary mb-2">
                  Conheça Nossa Igreja Local
                </h3>
                <p className="text-white/90">
                  Descubra como a história nacional se reflete em nossa comunidade de Xaxim.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/our-history" className="bg-white text-primary px-6 py-3 rounded font-medium hover:bg-opacity-90 transition-colors text-center">
                  Nossa História Local
                </Link>
                <Link to="/" className="bg-secondary text-white px-6 py-3 rounded font-medium hover:bg-opacity-90 transition-colors text-center">
                  Visite-nos
                </Link>
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
