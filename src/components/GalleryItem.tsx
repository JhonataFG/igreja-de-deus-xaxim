
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { X, Images } from "lucide-react";

export interface GalleryItemProps {
  id: string;
  image: string;
  title: string;
  description: string;
  category: string;
  isAlbum?: boolean;
  imagesCount?: number;
  albumImages?: Array<{id: string; image: string; title?: string}>;
}

const GalleryItem = ({ 
  image, 
  title, 
  description, 
  category, 
  isAlbum = false, 
  imagesCount = 0,
  albumImages = [] 
}: GalleryItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    if (isAlbum && albumImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % albumImages.length);
    }
  };

  const handlePrevious = () => {
    if (isAlbum && albumImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + albumImages.length) % albumImages.length);
    }
  };

  return (
    <>
      <Card
        className="group overflow-hidden rounded-xl cursor-pointer hover:shadow-lg transition-all duration-300"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
            <span className="text-white/80 text-sm mb-1">{category}</span>
            <h3 className="text-white text-lg font-medium">{title}</h3>
          </div>
          {isAlbum && (
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center">
              <Images className="h-3 w-3 mr-1" />
              {imagesCount} fotos
            </div>
          )}
        </div>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white rounded-lg">
          {isAlbum && albumImages.length > 0 ? (
            <div className="flex flex-col">
              <div className="relative">
                <img 
                  src={albumImages[currentImageIndex].image} 
                  alt={albumImages[currentImageIndex].title || `Imagem ${currentImageIndex + 1}`} 
                  className="w-full max-h-[80vh] object-contain"
                />
                
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h2 className="text-xl font-medium mb-1">{title}</h2>
                  <p className="text-white/80">{description}</p>
                  <div className="mt-2 text-sm">
                    Imagem {currentImageIndex + 1} de {albumImages.length}
                  </div>
                </div>
                
                {albumImages.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    >
                      ←
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleNext(); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    >
                      →
                    </button>
                  </>
                )}
                
                <DialogClose className="absolute top-3 right-3 rounded-full p-1 bg-black/50 text-white hover:bg-black/70">
                  <X className="h-6 w-6" />
                </DialogClose>
              </div>
              
              {albumImages.length > 1 && (
                <div className="flex overflow-x-auto p-2 bg-gray-100 hide-scrollbar">
                  {albumImages.map((img, index) => (
                    <div 
                      key={img.id} 
                      className={`flex-shrink-0 w-16 h-16 m-1 cursor-pointer ${index === currentImageIndex ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img 
                        src={img.image} 
                        alt={`Miniatura ${index + 1}`} 
                        className="w-full h-full object-cover rounded-sm"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/3 relative">
                <img src={image} alt={title} className="w-full h-full object-cover max-h-[80vh]" />
              </div>
              <div className="lg:w-1/3 p-6 flex flex-col">
                <DialogClose className="absolute top-3 right-3 rounded-full p-1 text-gray-400 hover:text-gray-500">
                  <X className="h-6 w-6" />
                </DialogClose>
                <span className="text-primary text-sm mb-2">{category}</span>
                <h2 className="text-2xl font-serif font-medium mb-4">{title}</h2>
                <p className="text-muted-foreground flex-grow">{description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryItem;
