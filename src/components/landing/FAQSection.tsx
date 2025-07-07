
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "O que está incluso no plano gratuito?",
      answer: "O plano gratuito inclui até 5 links, temas básicos, analytics básico, suporte por email e QR Code básico. É perfeito para começar e testar a plataforma."
    },
    {
      question: "Posso usar meu domínio próprio?",
      answer: "Sim! No plano Pro e Premium você pode conectar seu próprio domínio (exemplo: links.seunome.com) e ter uma URL totalmente personalizada."
    },
    {
      question: "E se eu quiser cancelar?",
      answer: "Sem problemas! Você pode cancelar a qualquer momento. Não há taxas de cancelamento e garantimos satisfação ou seu dinheiro de volta nos primeiros 30 dias."
    },
    {
      question: "Funciona em todas as redes sociais?",
      answer: "Sim, funciona em todas as redes sociais! Sua página LinkMax.bio pode ser compartilhada no Instagram, TikTok, YouTube, Facebook, Twitter e qualquer outra plataforma."
    },
    {
      question: "Como recebo pagamentos pelos meus produtos?",
      answer: "Você pode adicionar links para sua loja online, formulários de pagamento, PIX, PagSeguro, PayPal e qualquer outra forma de pagamento que você já usa."
    },
    {
      question: "Tem suporte em português?",
      answer: "Sim! Temos suporte 100% em português via WhatsApp, email e chat. Nossa equipe está sempre pronta para ajudar você a ter sucesso."
    },
    {
      question: "Como faço upgrade do meu plano?",
      answer: "É muito simples! Acesse seu painel de controle, vá em 'Configurações > Planos' e escolha o plano desejado. O upgrade é imediato após a confirmação do pagamento."
    },
    {
      question: "Posso personalizar o design da minha página?",
      answer: "Sim! Oferecemos diversos temas profissionais e no plano Pro você tem acesso a customizações avançadas como cores, fontes e botões personalizados."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-[#1a1a1a] to-[#0D0D0D]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tire suas dúvidas sobre o LinkMax.bio e comece hoje mesmo
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#2C2C2C] rounded-xl border border-gray-700 overflow-hidden hover:border-[#FFD700]/50 transition-all duration-300">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                {openFAQ === index ? (
                  <ChevronUp className="text-[#FFD700] flex-shrink-0" size={24} />
                ) : (
                  <ChevronDown className="text-[#FFD700] flex-shrink-0" size={24} />
                )}
              </button>
              {openFAQ === index && (
                <div className="px-8 pb-6 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-4">Ainda tem dúvidas?</p>
          <Button 
            className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold px-8 py-3 mr-4"
            onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
          >
            Falar com Suporte
          </Button>
          <Button 
            variant="outline"
            className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10"
            onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver Planos
          </Button>
        </div>
      </div>
    </section>
  );
};
