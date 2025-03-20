
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    
    if (!isAuthenticated) {
      toast({
        title: "Acesso Restrito",
        description: "Você precisa estar logado para acessar esta página.",
        variant: "destructive",
      });
      navigate("/admin/login");
    }
  }, [navigate, toast]);

  return <>{children}</>;
};

export default ProtectedRoute;
