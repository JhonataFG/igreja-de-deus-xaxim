
export interface EventProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  created_at: string;
}

export interface EventFormValues {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
}
