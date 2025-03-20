
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Image,
  Layers,
  LayoutDashboard,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    toast({
      title: "Logout realizado",
      description: "Você saiu do painel administrativo.",
    });
    navigate("/admin/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b h-16 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-2 md:hidden"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <h1 className="text-xl font-medium">Painel Administrativo</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`bg-white border-r w-64 flex-shrink-0 flex flex-col transition-all duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:static inset-y-16 z-50 h-[calc(100vh-4rem)]`}
        >
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              <li>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/admin")}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/admin/events")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Eventos
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/admin/gallery")}
                >
                  <Image className="mr-2 h-4 w-4" />
                  Galeria
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/admin/carousel")}
                >
                  <Layers className="mr-2 h-4 w-4" />
                  Carrossel
                </Button>
              </li>
            </ul>
          </nav>
          <div className="p-4 border-t">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate("/")}
            >
              Ver Site
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
