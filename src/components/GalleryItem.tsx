
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";

export interface GalleryItemProps {
  id: string;
  image: string;
  title: string;
  description: string;
  category: string;
}

const GalleryItem = ({ image, title, description, category }: GalleryItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
        </div>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white rounded-lg">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/3 relative">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover max-h-[80vh]" 
              />
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryItem;
