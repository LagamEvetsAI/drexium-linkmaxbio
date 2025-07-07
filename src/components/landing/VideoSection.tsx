
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 bg-gradient-to-b from-[#0D0D0D] to-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Veja como criar sua página em menos de 1 minuto
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            É mais fácil do que você imagina. Assista nosso tutorial rápido e comece agora mesmo.
          </p>

          <div className="relative mb-12">
            <div className="bg-[#2C2C2C] rounded-2xl p-8 border border-gray-700">
              {!isPlaying ? (
                <div className="relative">
                  <div className="w-full h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="bg-[#FFD700] w-20 h-20 rounded-full flex items-center justify-center hover:bg-[#FFD700]/90 transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <Play className="text-black ml-1" size={32} />
                    </button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 to-transparent rounded-xl"></div>
                </div>
              ) : (
                <div className="w-full h-80 bg-gray-800 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-[#FFD700] text-6xl mb-4">🎥</div>
                    <p className="text-white font-semibold">Vídeo tutorial em breve!</p>
                    <p className="text-gray-400 text-sm">Estamos preparando um conteúdo incrível para você</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <Link to="/auth">
              <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold text-lg px-12 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Quero criar a minha agora
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
