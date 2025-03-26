
export interface MemberProps {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  birth_date: string | null;
  status: string;
  created_at: string;
}

export interface MemberFormValues {
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  birth_date: string | null;
  status: string;
}
