
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, Star } from "lucide-react";

export const PlansSection = () => {
  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "/mês",
      description: "Perfeito para começar",
      features: [
        "Até 5 links",
        "Temas básicos",
        "Analytics básico",
        "Suporte por email",
        "QR Code básico"
      ],
      popular: false,
      buttonText: "Começar Grátis",
      details: "Ideal para quem está começando e quer testar a plataforma. Inclui as funcionalidades essenciais para criar sua primeira página de links."
    },
    {
      name: "Pro",
      price: "R$ 9,90",
      period: "/mês",
      description: "Mais popular",
      features: [
        "Links ilimitados",
        "Todos os temas",
        "Analytics avançado",
        "Domínio personalizado",
        "Suporte prioritário",
        "QR Code personalizado",
        "Botões personalizados",
        "Integração com redes sociais"
      ],
      popular: true,
      buttonText: "Escolher Pro",
      details: "O plano mais completo para profissionais e empresas. Inclui todas as funcionalidades avançadas e suporte prioritário."
    },
    {
      name: "Premium",
      price: "R$ 19,90",
      period: "/mês",
      description: "Para empresas",
      features: [
        "Tudo do Pro",
        "Analytics empresarial",
        "API personalizada",
        "Whitelabel",
        "Suporte 24/7",
        "Gerenciamento de equipe",
        "Backup automático"
      ],
      popular: false,
      buttonText: "Escolher Premium",
      details: "Solução empresarial completa com recursos avançados de analytics, API personalizada e suporte dedicado 24/7."
    }
  ];

  return (
    <section id="planos" className="py-24 bg-gradient-to-b from-[#1a1a1a] to-[#0D0D0D]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Escolha seu Plano
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Planos flexíveis para todas as necessidades. Comece grátis e faça upgrade quando precisar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-[#2C2C2C] rounded-xl p-8 border-2 transition-all duration-300 hover:scale-105 relative ${
              plan.popular 
                ? 'border-[#FFD700] shadow-lg shadow-[#FFD700]/25' 
                : 'border-gray-700 hover:border-[#FFD700]/50'
            }`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#FFD700] text-black px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                    <Star size={16} />
                    Mais Escolhido
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#FFD700]">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="text-[#FFD700] mr-3 flex-shrink-0" size={20} />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <Link to="/auth" className="block">
                  <Button className={`w-full py-3 font-semibold rounded-xl transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-[#FFD700] text-black hover:bg-[#FFD700]/90 hover:scale-105' 
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}>
                    {plan.buttonText}
                  </Button>
                </Link>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                      Ver Detalhes
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#2C2C2C] border-gray-700">
                    <DialogHeader>
                      <DialogTitle className="text-[#FFD700]">Plano {plan.name}</DialogTitle>
                    </DialogHeader>
                    <div className="text-gray-300">
                      <p className="mb-4">{plan.details}</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-white">Recursos inclusos:</h4>
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center">
                            <Check className="text-[#FFD700] mr-2" size={16} />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400">
            💰 Satisfação garantida ou seu dinheiro de volta • 🔒 Pagamento 100% seguro
          </p>
        </div>
      </div>
    </section>
  );
};
