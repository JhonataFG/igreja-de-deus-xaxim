
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled || !isActivePath("/") ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 " onClick={closeMobileMenu}>
            <img src="/id_xaxim_1.JPG" alt="Logo Igreja de Deus Xaxim" className="w-16 h-16 rounded-full" />
            <div className="flex flex-col">
              <span
                className={`font-serif text-lg font-bold ${
                  isScrolled || !isActivePath("/") ? "text-primary" : "text-white"
                }`}
              >
                IGREJA DE DEUS
              </span>
              <div
                className={`text-center -m-1 font-serif text-sm font-sm ${
                  isScrolled || !isActivePath("/") ? "text-primary" : "text-white"
                }`}
              >
                XAXIM
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`navbar-link text-lg font-medium ${
                isScrolled || !isActivePath("/") ? "text-foreground/80" : "text-white/90"
              } ${isActivePath("/") ? "after:scale-x-100 font-medium" : ""}`}
            >
              Início
            </Link>
            <Link
              to="/events"
              className={`navbar-link text-lg font-medium ${
                isScrolled || !isActivePath("/") ? "text-foreground/80" : "text-white/90"
              } ${isActivePath("/events") ? "after:scale-x-100 font-medium" : ""}`}
            >
              Eventos
            </Link>
            <Link
              to="/gallery"
              className={`navbar-link text-lg font-medium ${
                isScrolled || !isActivePath("/") ? "text-foreground/80" : "text-white/90"
              } ${isActivePath("/gallery") ? "after:scale-x-100 font-medium" : ""}`}
            >
              Galeria
            </Link>
            <Link
              to="/our-history"
              className={`navbar-link text-lg font-medium ${
                isScrolled || !isActivePath("/") ? "text-foreground/80" : "text-white/90"
              } ${isActivePath("/our-history") ? "after:scale-x-100 font-medium" : ""}`}
            >
              Nossa História
            </Link>
            <Link
              to="/church-history"
              className={`navbar-link text-lg font-medium ${
                isScrolled || !isActivePath("/") ? "text-foreground/80" : "text-white/90"
              } ${isActivePath("/church-history") ? "after:scale-x-100 font-medium" : ""}`}
            >
              História no Brasil
            </Link>
            <Button
              variant="outline"
              className={`ml-4 ${"border-muted text-primary hover:bg-primary hover:text-white"}`}
            >
              Contato
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? "text-primary" : "text-white"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? "text-primary" : "text-white"}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-foreground/80 hover:text-primary py-2 border-b border-gray-100"
              onClick={closeMobileMenu}
            >
              Início
            </Link>
            <Link
              to="/events"
              className="text-foreground/80 hover:text-primary py-2 border-b border-gray-100"
              onClick={closeMobileMenu}
            >
              Eventos
            </Link>
            <Link
              to="/gallery"
              className="text-foreground/80 hover:text-primary py-2 border-b border-gray-100"
              onClick={closeMobileMenu}
            >
              Galeria
            </Link>
            <Link
              to="/our-history"
              className="text-foreground/80 hover:text-primary py-2 border-b border-gray-100"
              onClick={closeMobileMenu}
            >
              Nossa História
            </Link>
            <Link
              to="/church-history"
              className="text-foreground/80 hover:text-primary py-2 border-b border-gray-100"
              onClick={closeMobileMenu}
            >
              História no Brasil
            </Link>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Contato
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
