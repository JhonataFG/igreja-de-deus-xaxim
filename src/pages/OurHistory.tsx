
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Book, Building, CalendarDays, Users } from "lucide-react";

const OurHistory = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative bg-quaternary py-24 md:py-32">
          <div className="absolute inset-0 bg-[url('/id_xaxim_1.JPG')] bg-cover bg-center opacity-20"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Nossa História</h1>
              <p className="text-white/80 text-lg md:text-xl">
                Conheça a jornada de fé e dedicação que formou a Igreja de Deus Xaxim ao longo dos anos.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif font-semibold text-center mb-12">Nossa Jornada</h2>
              
              <div className="space-y-16">
                {/* Timeline Item 1 */}
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <div className="flex items-center md:justify-end md:pr-8">
                      <CalendarDays className="w-5 h-5 text-primary mr-2" />
                      <span className="text-lg font-medium text-primary">1980</span>
                    </div>
                  </div>
                  <div className="md:w-2/3 md:pl-8 md:border-l border-primary/30">
                    <h3 className="text-xl font-serif font-medium mb-2">Primeiros Encontros</h3>
                    <p className="text-muted-foreground">
                      Os primeiros encontros da Igreja de Deus em Xaxim começaram em uma pequena sala com apenas 
                      cinco famílias que se reuniam para orar e estudar a Palavra de Deus. 
                      O que começou como um pequeno grupo de oração logo se transformou em um movimento de fé.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <div className="flex items-center md:justify-end md:pr-8">
                      <Building className="w-5 h-5 text-primary mr-2" />
                      <span className="text-lg font-medium text-primary">1985</span>
                    </div>
                  </div>
                  <div className="md:w-2/3 md:pl-8 md:border-l border-primary/30">
                    <h3 className="text-xl font-serif font-medium mb-2">Primeiro Templo</h3>
                    <p className="text-muted-foreground">
                      Após anos de dedicação e arrecadação de fundos, foi possível adquirir um terreno e 
                      construir o primeiro templo da Igreja de Deus Xaxim. A inauguração foi marcada por 
                      uma celebração que reuniu mais de 200 pessoas da comunidade.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <div className="flex items-center md:justify-end md:pr-8">
                      <Users className="w-5 h-5 text-primary mr-2" />
                      <span className="text-lg font-medium text-primary">1995</span>
                    </div>
                  </div>
                  <div className="md:w-2/3 md:pl-8 md:border-l border-primary/30">
                    <h3 className="text-xl font-serif font-medium mb-2">Crescimento da Congregação</h3>
                    <p className="text-muted-foreground">
                      Com o crescimento contínuo da congregação, foi necessário expandir o templo. 
                      Foram adicionadas novas salas para a escola dominical e um auditório maior para 
                      acomodar os cultos que agora recebiam mais de 500 fiéis regularmente.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 4 */}
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <div className="flex items-center md:justify-end md:pr-8">
                      <Book className="w-5 h-5 text-primary mr-2" />
                      <span className="text-lg font-medium text-primary">2010</span>
                    </div>
                  </div>
                  <div className="md:w-2/3 md:pl-8 md:border-l border-primary/30">
                    <h3 className="text-xl font-serif font-medium mb-2">Nova Fase</h3>
                    <p className="text-muted-foreground">
                      A igreja começou uma nova fase com a implementação de ministérios sociais, 
                      atendendo às necessidades da comunidade local. Foram criados programas de auxílio 
                      a famílias carentes, aulas de música para jovens e grupos de apoio diversos.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 5 */}
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <div className="flex items-center md:justify-end md:pr-8">
                      <Building className="w-5 h-5 text-primary mr-2" />
                      <span className="text-lg font-medium text-primary">Hoje</span>
                    </div>
                  </div>
                  <div className="md:w-2/3 md:pl-8 md:border-l border-primary/30">
                    <h3 className="text-xl font-serif font-medium mb-2">Igreja Atual</h3>
                    <p className="text-muted-foreground">
                      Hoje, a Igreja de Deus Xaxim continua sua missão de espalhar o amor de Cristo e 
                      servir à comunidade. Com uma congregação forte e unida, seguimos olhando para o 
                      futuro com esperança e fé, sempre buscando novos caminhos para impactar positivamente 
                      a vida das pessoas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-quaternary/10">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-serif font-semibold mb-4">Nossos Valores</h2>
              <p className="text-muted-foreground">
                Os princípios que guiam nossa caminhada e moldam nossa identidade como comunidade de fé.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.7 7.6 1 12C2.7 16.4 7 19.5 12 19.5C17 19.5 21.3 16.4 23 12C21.3 7.6 17 4.5 12 4.5ZM12 17C9.2 17 7 14.8 7 12C7 9.2 9.2 7 12 7C14.8 7 17 9.2 17 12C17 14.8 14.8 17 12 17ZM12 9C10.3 9 9 10.3 9 12C9 13.7 10.3 15 12 15C13.7 15 15 13.7 15 12C15 10.3 13.7 9 12 9Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">Fé</h3>
                <p className="text-muted-foreground">
                  Acreditamos na importância de uma fé viva e ativa, que se manifesta através do amor ao próximo e do serviço à comunidade.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">Amor</h3>
                <p className="text-muted-foreground">
                  O amor é o centro de nossa missão. Buscamos amar a Deus sobre todas as coisas e ao próximo como a nós mesmos.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">Comunidade</h3>
                <p className="text-muted-foreground">
                  Valorizamos o senso de comunidade e família. Juntos, crescemos, servimos e celebramos nossa jornada de fé.
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
                <h3 className="text-2xl md:text-3xl font-serif font-semibold text-secondary mb-2">Venha nos Visitar</h3>
                <p className="text-white/90">Faça parte da nossa comunidade e cresça em fé conosco.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#" className="bg-white text-primary px-6 py-3 rounded font-medium hover:bg-opacity-90 transition-colors text-center">
                  Horários de Culto
                </a>
                <a href="#" className="bg-secondary text-white px-6 py-3 rounded font-medium hover:bg-opacity-90 transition-colors text-center">
                  Entre em Contato
                </a>
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
