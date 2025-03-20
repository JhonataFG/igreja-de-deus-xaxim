
import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface EventProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
}

interface EventCardProps {
  event: EventProps;
}

const EventCard = ({ event }: EventCardProps) => {
  const { title, date, time, location, description, image } = event;

  return (
    <Card className="overflow-hidden rounded-xl group hover:shadow-md transition-all duration-300 h-full flex flex-col">
      <div className="relative overflow-hidden">
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out" 
            loading="lazy"
          />
        </div>
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary border border-primary/10">
          <span>{date}</span>
        </div>
      </div>
      <CardContent className="p-5 flex-grow">
        <h3 className="text-xl font-serif font-medium mb-2 line-clamp-2 transition-colors group-hover:text-primary">{title}</h3>
        <p className="text-muted-foreground mb-4 text-sm line-clamp-3">{description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            <span>{location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-0">
        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-all">
          Saiba Mais
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
