
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
            LinkMax.bio
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Uma única página para todos os seus links. Simples, elegante e poderoso.
          </p>
          
          <div className="flex gap-4 justify-center mb-16">
            {user ? (
              <Link to="/dashboard">
                <Button className="btn-neon text-lg px-8 py-3">
                  Ir para Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button className="btn-neon text-lg px-8 py-3">
                    Começar Agora
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button variant="outline" className="text-lg px-8 py-3 border-gray-700 text-gray-300 hover:bg-gray-800">
                    Ver Demo
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-dark-surface p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-neon-blue">Simples</h3>
              <p className="text-gray-300">
                Interface intuitiva para adicionar e organizar seus links em minutos.
              </p>
            </div>
            
            <div className="bg-dark-surface p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-neon-green">Elegante</h3>
              <p className="text-gray-300">
                Design moderno e responsivo que funciona perfeitamente em qualquer dispositivo.
              </p>
            </div>
            
            <div className="bg-dark-surface p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-neon-blue">Poderoso</h3>
              <p className="text-gray-300">
                Analytics, customização e todas as ferramentas que você precisa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
