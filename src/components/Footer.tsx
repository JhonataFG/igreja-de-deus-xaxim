
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-semibold">Igreja de Deus Xaxim</h3>
            <p className="text-white/80 max-w-xs">
              Um lugar para amar e servir. Venha fazer parte da nossa família e crescer na fé.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:contato@igrejadapaz.com"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-serif font-semibold">Menu Rápido</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-white/80 hover:text-white transition-colors">
                Início
              </Link>
              <Link to="/events" className="text-white/80 hover:text-white transition-colors">
                Eventos
              </Link>
              <Link to="/gallery" className="text-white/80 hover:text-white transition-colors">
                Galeria
              </Link>
              <Link to="/our-history" className="text-white/80 hover:text-white transition-colors">
                Nossa História
              </Link>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Contato
              </a>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-serif font-semibold">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">
                  Rua dos Fiéis, 123
                  <br />
                  Bairro Esperança
                  <br />
                  São Paulo - SP
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="text-white/80">(11) 1234-5678</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="text-white/80">contato@igrejadapaz.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-white/60">
          <p>© {currentYear} Igreja de Deus Xaxim. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
