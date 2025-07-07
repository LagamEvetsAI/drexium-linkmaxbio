
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const NavigationHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
            LinkMax.bio
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('recursos')} className="text-gray-300 hover:text-white transition-colors">
              Recursos
            </button>
            <button onClick={() => scrollToSection('planos')} className="text-gray-300 hover:text-white transition-colors">
              Planos
            </button>
            <button onClick={() => scrollToSection('exemplos')} className="text-gray-300 hover:text-white transition-colors">
              Exemplos
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </button>
            <Link to="/auth">
              <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold px-6">
                Começar
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4 pt-4">
              <button onClick={() => scrollToSection('recursos')} className="text-gray-300 hover:text-white transition-colors text-left">
                Recursos
              </button>
              <button onClick={() => scrollToSection('planos')} className="text-gray-300 hover:text-white transition-colors text-left">
                Planos
              </button>
              <button onClick={() => scrollToSection('exemplos')} className="text-gray-300 hover:text-white transition-colors text-left">
                Exemplos
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-300 hover:text-white transition-colors text-left">
                FAQ
              </button>
              <Link to="/auth" className="w-full">
                <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold w-full">
                  Começar
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
