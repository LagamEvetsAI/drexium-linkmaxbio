
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const scrollToPlans = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0D0D0D] to-[#1a1a1a] text-white flex items-center pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent animate-fade-in">
              LinkMax.bio
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
              Uma única página para todos os seus links. Simples, elegante e poderoso.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                onClick={scrollToPlans}
                className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse-neon"
              >
                Criar Agora
              </Button>
              <Button 
                variant="outline" 
                className="text-lg px-10 py-4 rounded-xl border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-[#FFD700] hover:text-[#FFD700] transition-all duration-300"
                onClick={() => document.getElementById('exemplos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Exemplos de Páginas Prontas
              </Button>
            </div>

            <div className="text-sm text-gray-400">
              ✨ Mais de 3.000 páginas criadas • 🚀 Criação em menos de 1 minuto
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-96 bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-700">
                <div className="bg-gradient-to-br from-neon-blue/20 to-neon-green/20 rounded-2xl p-4 h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-[#FFD700] rounded-full mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-black">@</span>
                  </div>
                  <h3 className="text-white font-bold mb-2">Seu Nome</h3>
                  <p className="text-gray-300 text-sm text-center mb-4">Sua bio personalizada aqui</p>
                  <div className="space-y-2 w-full">
                    <div className="bg-white/10 rounded-lg p-2 text-center text-sm hover:bg-[#FFD700]/20 transition-colors cursor-pointer">Instagram</div>
                    <div className="bg-white/10 rounded-lg p-2 text-center text-sm hover:bg-[#FFD700]/20 transition-colors cursor-pointer">YouTube</div>
                    <div className="bg-white/10 rounded-lg p-2 text-center text-sm hover:bg-[#FFD700]/20 transition-colors cursor-pointer">TikTok</div>
                    <div className="bg-white/10 rounded-lg p-2 text-center text-sm hover:bg-[#FFD700]/20 transition-colors cursor-pointer">Loja Online</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#FFD700] rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-neon-blue rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
