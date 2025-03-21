import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryItem from "@/components/GalleryItem";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePublicGallery } from "@/hooks/gallery/use-public-gallery";
import { Skeleton } from "@/components/ui/skeleton";

const Gallery = () => {
  const { galleryItems, categories, loading } = usePublicGallery();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = activeCategory === "Todos" || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const allCategories = ["Todos", ...categories];

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-quaternary text-white py-16">
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
                {loading
                  ? [1, 2, 3, 4].map((item) => <Skeleton key={item} className="h-10 w-24" />)
                  : allCategories.map((category) => (
                      <Button
                        key={category}
                        variant={activeCategory === category ? "default" : "outline"}
                        className={
                          activeCategory === category
                            ? ""
                            : "border-primary text-primary hover:bg-primary hover:text-white"
                        }
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

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Skeleton key={item} className="aspect-square rounded-xl" />
                ))}
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <GalleryItem key={item.id} {...item} />
                ))}
              </div>
            ) : galleryItems.length > 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">Nenhuma imagem encontrada</h3>
                <p className="text-muted-foreground">Tente outro termo de busca ou categoria</p>
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">Não há imagens cadastradas</h3>
                <p className="text-muted-foreground">
                  Entre no painel administrativo para adicionar itens à galeria.
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

export default Gallery;
