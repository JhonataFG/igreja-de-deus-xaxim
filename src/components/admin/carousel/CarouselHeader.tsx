
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CarouselHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddNewClick: () => void;
}

const CarouselHeader = ({ searchTerm, setSearchTerm, onAddNewClick }: CarouselHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Pesquisar slides..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button onClick={onAddNewClick}>
        <Plus className="mr-2 h-4 w-4" />
        Novo Slide
      </Button>
    </div>
  );
};

export default CarouselHeader;
