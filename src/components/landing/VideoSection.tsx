
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const VideoSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0D0D0D] to-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Crie sua página de links profissional
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            É mais simples do que você imagina. Interface intuitiva e resultado profissional em minutos.
          </p>

          <div className="relative mb-12">
            <div className="bg-[#2C2C2C] rounded-2xl p-8 border border-gray-700">
              <div className="w-full h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[#FFD700] text-6xl mb-4">✨</div>
                  <p className="text-white font-semibold text-2xl mb-2">Interface Simples e Poderosa</p>
                  <p className="text-gray-400">Arrastar, soltar e personalizar nunca foi tão fácil</p>
                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <div className="text-[#FFD700] mb-1">🎨</div>
                      <span className="text-gray-300">Temas Personalizáveis</span>
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <div className="text-[#FFD700] mb-1">📊</div>
                      <span className="text-gray-300">Analytics Detalhado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Link to="/auth">
              <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold text-lg px-12 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Criar Minha Página Agora
              </Button>
            </Link>
            <p className="text-gray-400 text-sm">
              ✨ Gratuito para sempre • 🚀 Sem cartão de crédito
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
