
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

export const ExamplesSection = () => {
  const [currentExample, setCurrentExample] = useState(0);

  const examples = [
    {
      title: "Influencer Digital",
      description: "Página otimizada para criadores de conteúdo com links para todas as redes sociais",
      category: "Social Media",
      preview: "https://images.unsplash.com/photo-1611224923853-80b023f02d71",
      features: ["Links para redes sociais", "Botão de contato", "Feed do Instagram", "Link para produtos"]
    },
    {
      title: "Loja de Roupas",
      description: "Vitrine digital completa para e-commerce de moda",
      category: "E-commerce",
      preview: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
      features: ["Catálogo de produtos", "Link para WhatsApp", "Formas de pagamento", "Localização da loja"]
    },
    {
      title: "Podcast",
      description: "Central de episódios e conteúdos para podcasters",
      category: "Mídia",
      preview: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618",
      features: ["Últimos episódios", "Plataformas de streaming", "Redes sociais", "Contato para parcerias"]
    },
    {
      title: "Restaurante",
      description: "Menu digital e informações completas do estabelecimento",
      category: "Gastronomia",
      preview: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      features: ["Cardápio digital", "Delivery", "Reservas", "Localização e horários"]
    },
    {
      title: "Freelancer",
      description: "Portfolio profissional e serviços para freelancers",
      category: "Profissional",
      preview: "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
      features: ["Portfolio", "Serviços oferecidos", "Depoimentos", "Formulário de contato"]
    },
    {
      title: "Personal Trainer",
      description: "Página para profissionais de educação física e saúde",
      category: "Saúde & Fitness",
      preview: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      features: ["Planos de treino", "Agendamento", "Dicas de saúde", "Depoimentos de alunos"]
    }
  ];

  const nextExample = () => {
    setCurrentExample((prev) => (prev + 1) % examples.length);
  };

  const prevExample = () => {
    setCurrentExample((prev) => (prev - 1 + examples.length) % examples.length);
  };

  return (
    <section id="exemplos" className="py-24 bg-gradient-to-b from-[#1a1a1a] to-[#0D0D0D]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Veja modelos prontos que você pode usar
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Clique em qualquer exemplo para ver como funciona na prática
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-8">
            <button 
              onClick={prevExample}
              className="p-3 bg-[#2C2C2C] rounded-full border border-gray-700 hover:border-[#FFD700] hover:bg-[#FFD700]/10 transition-all duration-300"
            >
              <ChevronLeft className="text-white" size={24} />
            </button>

            <div className="flex-1 max-w-3xl">
              <div className="grid md:grid-cols-2 gap-8 items-center bg-[#2C2C2C] rounded-xl p-8 border border-gray-700">
                <div className="order-2 md:order-1">
                  <div className="inline-block bg-[#FFD700]/20 text-[#FFD700] px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    {examples[currentExample].category}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {examples[currentExample].title}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {examples[currentExample].description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-white">Recursos inclusos:</h4>
                    {examples[currentExample].features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-300">
                        <span className="text-[#FFD700] mr-2">•</span>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 flex items-center gap-2">
                          <ExternalLink size={16} />
                          Ver Exemplo Completo
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#2C2C2C] border-gray-700 max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-[#FFD700]">{examples[currentExample].title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <img 
                            src={examples[currentExample].preview} 
                            alt={examples[currentExample].title}
                            className="w-full h-64 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                          />
                          <p className="text-gray-300">{examples[currentExample].description}</p>
                          <div className="flex gap-2">
                            <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90" asChild>
                              <a href="/demo" target="_blank">Ver Demo Interativa</a>
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="order-1 md:order-2">
                  <div className="relative cursor-pointer group">
                    <img 
                      src={examples[currentExample].preview} 
                      alt={examples[currentExample].title}
                      className="w-full h-80 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-[#FFD700] p-3 rounded-full">
                        <ExternalLink className="text-black" size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={nextExample}
              className="p-3 bg-[#2C2C2C] rounded-full border border-gray-700 hover:border-[#FFD700] hover:bg-[#FFD700]/10 transition-all duration-300"
            >
              <ChevronRight className="text-white" size={24} />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {examples.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentExample(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentExample ? 'bg-[#FFD700] w-8' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
