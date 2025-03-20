
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { Edit, Trash2, MoveUp, MoveDown } from "lucide-react";
import { CarouselSlide } from "@/types/carousel";

interface CarouselTableRowProps {
  slide: CarouselSlide;
  onMoveSlide: (id: string, direction: 'up' | 'down') => void;
  onEditClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
  minOrderPosition: number;
  maxOrderPosition: number;
}

const CarouselTableRow = ({
  slide,
  onMoveSlide,
  onEditClick,
  onDeleteClick,
  minOrderPosition,
  maxOrderPosition
}: CarouselTableRowProps) => {
  return (
    <TableRow key={slide.id}>
      <TableCell>
        <div className="h-16 w-28 rounded overflow-hidden bg-muted">
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="h-full w-full object-cover"
          />
        </div>
      </TableCell>
      <TableCell className="font-medium">{slide.title}</TableCell>
      <TableCell className="text-muted-foreground text-sm">{slide.subtitle}</TableCell>
      <TableCell>{slide.order_position}</TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => onMoveSlide(slide.id, 'up')}
            disabled={slide.order_position === minOrderPosition}
          >
            <MoveUp className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => onMoveSlide(slide.id, 'down')}
            disabled={slide.order_position === maxOrderPosition}
          >
            <MoveDown className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => onEditClick(slide.id)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-destructive" 
            onClick={() => onDeleteClick(slide.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CarouselTableRow;
