
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import CarouselTableRow from "./CarouselTableRow";
import { CarouselSlide } from "@/types/carousel";

interface CarouselTableProps {
  slides: CarouselSlide[];
  loading: boolean;
  onMoveSlide: (id: string, direction: 'up' | 'down') => void;
  onEditClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
}

const CarouselTable = ({ 
  slides, 
  loading, 
  onMoveSlide, 
  onEditClick, 
  onDeleteClick 
}: CarouselTableProps) => {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagem</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Subtítulo</TableHead>
                <TableHead>Ordem</TableHead>
                <TableHead className="w-[140px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Carregando slides...
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  if (slides.length === 0) {
    return (
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagem</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Subtítulo</TableHead>
                <TableHead>Ordem</TableHead>
                <TableHead className="w-[140px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Nenhum slide encontrado
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  const minOrderPosition = Math.min(...slides.map(s => s.order_position));
  const maxOrderPosition = Math.max(...slides.map(s => s.order_position));

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Subtítulo</TableHead>
              <TableHead>Ordem</TableHead>
              <TableHead className="w-[140px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slides.map((slide) => (
              <CarouselTableRow
                key={slide.id}
                slide={slide}
                onMoveSlide={onMoveSlide}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
                minOrderPosition={minOrderPosition}
                maxOrderPosition={maxOrderPosition}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CarouselTable;
