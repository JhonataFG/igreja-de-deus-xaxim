
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/AdminLayout";
import { Calendar, Image, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-all cursor-pointer" onClick={() => navigate("/admin/events")}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Gerenciar Eventos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-3">
              Adicione, edite ou remova eventos da igreja
            </p>
            <Button size="sm" variant="outline" className="w-full">
              Gerenciar Eventos
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all cursor-pointer" onClick={() => navigate("/admin/gallery")}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Gerenciar Galeria</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-3">
              Adicione, edite ou remova itens da galeria de imagens
            </p>
            <Button size="sm" variant="outline" className="w-full">
              Gerenciar Galeria
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all cursor-pointer" onClick={() => navigate("/admin/carousel")}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Gerenciar Carrossel</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-3">
              Adicione, edite ou remova slides do carrossel da página inicial
            </p>
            <Button size="sm" variant="outline" className="w-full">
              Gerenciar Carrossel
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
