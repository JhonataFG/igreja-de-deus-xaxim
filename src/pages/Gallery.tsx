
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryItem, { GalleryItemProps } from "@/components/GalleryItem";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const galleryItems: GalleryItemProps[] = [
  {
    id: "1",
    title: "Culto de Páscoa",
    description: "Celebração especial do Domingo de Páscoa, com apresentações do coral e encenação da ressurreição de Jesus.",
    category: "Celebrações",
    image: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "2",
    title: "Retiro de Jovens",
    description: "Jovens da igreja participando de atividades ao ar livre, estudos bíblicos e momentos de adoração durante o retiro anual.",
    category: "Jovens",
    image: "https://images.unsplash.com/photo-1523986490752-c28064f26be3?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "3",
    title: "Ação Social na Comunidade",
    description: "Membros da igreja servindo a comunidade local com distribuição de alimentos, roupas e assistência às famílias necessitadas.",
    category: "Ação Social",
    image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "4",
    title: "Culto de Adoração",
    description: "Momento de louvor e adoração durante o culto dominical, com a participação da banda e do ministério de louvor da igreja.",
    category: "Celebrações",
    image: "https://images.unsplash.com/photo-1442504028989-ab58b5f29a4a?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "5",
    title: "Batismo",
    description: "Cerimônia de batismo realizada no rio, simbolizando o novo nascimento e compromisso com Cristo.",
    category: "Sacramentos",
    image: "https://images.unsplash.com/photo-1576009485754-588f6c28aa18?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "6",
    title: "Escola Bíblica Dominical",
    description: "Crianças participando das atividades da Escola Bíblica Dominical, aprendendo sobre as histórias bíblicas de forma lúdica e interativa.",
    category: "Educação",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "7",
    title: "Natal na Igreja",
    description: "Decoração especial e apresentação do coral durante a celebração de Natal, com encenação do nascimento de Jesus.",
    category: "Celebrações",
    image: "https://images.unsplash.com/photo-1576349597974-0cf2419b3fe0?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "8",
    title: "Grupo de Oração",
    description: "Membros da igreja reunidos em um círculo de oração, intercedendo uns pelos outros e pelas necessidades da comunidade.",
    category: "Oração",
    image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "9",
    title: "Nova Sede da Igreja",
    description: "Inauguração da nova sede da Igreja da Paz, um marco importante na história da nossa comunidade.",
    category: "Instalações",
    image: "https://images.unsplash.com/photo-1526639194900-7ad2dff8afd4?w=600&auto=format&fit=crop&q=80"
  }
];

const categories = ["Todos", ...new Set(galleryItems.map(item => item.category))];

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "Todos" || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-white/80 text-sm font-medium uppercase tracking-wider">Memórias</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-4">Nossa Galeria</h1>
              <p className="text-white/90 text-lg mb-8">
                Veja os momentos especiais que vivemos juntos como uma comunidade de fé, esperança e amor.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex overflow-x-auto pb-3 md:pb-0 hide-scrollbar md:flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    className={activeCategory === category ? "" : "border-primary text-primary hover:bg-primary hover:text-white"}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              <div className="relative max-w-xs">
                <Input
                  type="text"
                  placeholder="Pesquisar galeria..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <GalleryItem key={item.id} {...item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">Nenhuma imagem encontrada</h3>
                <p className="text-muted-foreground">Tente outro termo de busca ou categoria</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Gallery;
