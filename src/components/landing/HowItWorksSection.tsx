
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Crie",
      description: "Cadastre-se gratuitamente e comece a adicionar seus links",
      icon: "🚀"
    },
    {
      number: "02", 
      title: "Personalize",
      description: "Escolha temas, cores e customize sua página do seu jeito",
      icon: "🎨"
    },
    {
      number: "03",
      title: "Compartilhe",
      description: "Use sua URL única em todas as redes sociais e materiais",
      icon: "📱"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#0D0D0D] to-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Como Funciona?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Três passos simples para ter sua página profissional pronta
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop View - Horizontal */}
          <div className="hidden md:flex items-center justify-between gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="flex-1 text-center relative">
                <div className="bg-[#2C2C2C] p-8 rounded-xl border border-gray-700 hover:border-[#FFD700]/50 transition-all duration-300 hover:scale-105">
                  <div className="text-6xl mb-4">{step.icon}</div>
                  <div className="text-[#FFD700] font-bold text-lg mb-2">PASSO {step.number}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 hidden lg:block">
                    <div className="w-8 h-0.5 bg-[#FFD700]"></div>
                    <div className="w-0 h-0 border-l-8 border-l-[#FFD700] border-t-4 border-t-transparent border-b-4 border-b-transparent ml-8 -mt-0.5"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile View - Vertical */}
          <div className="md:hidden space-y-6 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="bg-[#2C2C2C] p-6 rounded-xl border border-gray-700">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{step.icon}</div>
                  <div>
                    <div className="text-[#FFD700] font-bold text-sm">PASSO {step.number}</div>
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  </div>
                </div>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/auth">
              <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold text-lg px-12 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Começar Agora - É Grátis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
