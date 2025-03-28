
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryItem from "@/components/GalleryItem";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePublicGallery } from "@/hooks/gallery/use-public-gallery";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

const Gallery = () => {
  const { 
    items, 
    albums, 
    categories, 
    loading, 
    fetchAlbumItems, 
    albumImages 
  } = usePublicGallery();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [activeTab, setActiveTab] = useState("todos");

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = activeCategory === "Todos" || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const filteredAlbums = albums.filter((album) => {
    const matchesSearch =
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = activeCategory === "Todos" || album.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const allCategories = ["Todos", ...categories];

  // Prefetch album images when needed
  useEffect(() => {
    if (activeTab === "albuns" && !loading) {
      filteredAlbums.forEach(album => {
        if (!albumImages[album.id]) {
          fetchAlbumItems(album.id);
        }
      });
    }
  }, [activeTab, filteredAlbums, loading, fetchAlbumItems, albumImages]);

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

            <Tabs defaultValue="todos" onValueChange={setActiveTab} className="mb-8">
              <TabsList className="w-full max-w-md mx-auto">
                <TabsTrigger value="todos" className="flex-1">Todos</TabsTrigger>
                <TabsTrigger value="fotos" className="flex-1">Fotos</TabsTrigger>
                <TabsTrigger value="albuns" className="flex-1">Álbuns</TabsTrigger>
              </TabsList>
            </Tabs>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Skeleton key={item} className="aspect-square rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="space-y-12">
                {(activeTab === "todos" || activeTab === "albuns") && filteredAlbums.length > 0 && (
                  <div>
                    {activeTab === "todos" && <h2 className="text-2xl font-medium mb-6">Álbuns</h2>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredAlbums.map((album) => (
                        <GalleryItem 
                          key={album.id}
                          id={album.id}
                          image={album.cover_image}
                          title={album.title}
                          description={album.description}
                          category={album.category}
                          isAlbum={true}
                          imagesCount={album.items_count}
                          albumImages={albumImages[album.id]?.map(img => ({
                            id: img.id,
                            image: img.image,
                            title: img.title
                          }))}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {(activeTab === "todos" || activeTab === "fotos") && filteredItems.length > 0 && (
                  <div>
                    {activeTab === "todos" && <h2 className="text-2xl font-medium mb-6">Fotos</h2>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredItems.map((item) => (
                        <GalleryItem key={item.id} {...item} />
                      ))}
                    </div>
                  </div>
                )}

                {((activeTab === "todos" && filteredItems.length === 0 && filteredAlbums.length === 0) ||
                  (activeTab === "fotos" && filteredItems.length === 0) ||
                  (activeTab === "albuns" && filteredAlbums.length === 0)) && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium mb-2">
                      {items.length > 0 || albums.length > 0
                        ? "Nenhum resultado encontrado"
                        : "Não há imagens cadastradas"}
                    </h3>
                    <p className="text-muted-foreground">
                      {items.length > 0 || albums.length > 0
                        ? "Tente outro termo de busca ou categoria"
                        : "Entre no painel administrativo para adicionar itens à galeria."}
                    </p>
                  </div>
                )}
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
