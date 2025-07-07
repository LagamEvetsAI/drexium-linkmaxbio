
export const DifferentialsSection = () => {
  const differentials = [
    { title: "Simples", description: "Interface intuitiva para adicionar e organizar seus links em minutos.", icon: "⚡" },
    { title: "Elegante", description: "Design moderno e responsivo que funciona perfeitamente em qualquer dispositivo.", icon: "✨" },
    { title: "Poderoso", description: "Analytics, customização e todas as ferramentas que você precisa.", icon: "🚀" },
    { title: "Rápido", description: "Páginas otimizadas com carregamento ultra-rápido.", icon: "⚡" },
    { title: "Personalizável", description: "Temas únicos e opções de customização avançadas.", icon: "🎨" },
    { title: "Analytics", description: "Relatórios detalhados sobre o desempenho dos seus links.", icon: "📊" }
  ];

  const competitors = [
    { 
      name: "LinkMax.bio", 
      price: "R$ 9,90/mês",
      features: [
        "✅ Temas ilimitados", 
        "✅ Analytics avançado", 
        "✅ Domínio próprio", 
        "✅ Suporte 24/7", 
        "✅ Sem limite de links", 
        "✅ QR Code personalizado",
        "✅ Integração WhatsApp",
        "✅ Botões personalizados"
      ] 
    },
    { 
      name: "Linktree", 
      price: "US$ 9/mês",
      features: [
        "❌ Temas limitados", 
        "✅ Analytics básico", 
        "💰 Domínio próprio (pago)", 
        "❌ Suporte limitado", 
        "💰 Links limitados", 
        "💰 QR Code (pago)",
        "❌ Sem integração WhatsApp",
        "💰 Botões (pago)"
      ] 
    },
    { 
      name: "Taplink", 
      price: "US$ 12/mês",
      features: [
        "💰 Temas (pago)", 
        "💰 Analytics (pago)", 
        "💰 Domínio próprio (pago)", 
        "❌ Suporte limitado", 
        "💰 Links limitados", 
        "💰 QR Code (pago)",
        "❌ Integração limitada",
        "💰 Personalização (pago)"
      ] 
    }
  ];

  return (
    <section id="recursos" className="py-24 bg-gradient-to-b from-[#0D0D0D] to-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FFD700]/10 text-[#FFD700] px-6 py-3 rounded-full border border-[#FFD700]/30 mb-6">
            <span className="text-2xl">🏆</span>
            <span className="font-semibold">Tudo o que o LinkTree oferece — e muito mais</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
            Mais completo que os líderes de mercado
          </h2>
          <p className="text-xl text-gray-300 mb-2">por um preço muito menor. Sem pagar em dólar.</p>
        </div>

        {/* Differentials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {differentials.map((item, index) => (
            <div key={index} className="bg-[#2C2C2C] p-8 rounded-xl border border-gray-700 hover:border-[#FFD700]/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-[#FFD700]">{item.title}</h3>
              <p className="text-gray-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8 text-white">Comparação com a Concorrência</h3>
          <div className="bg-[#2C2C2C] rounded-xl overflow-hidden border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
              {competitors.map((competitor, index) => (
                <div key={index} className={`${index === 0 ? 'bg-[#FFD700]/10 border-2 border-[#FFD700]/30' : 'bg-gray-800/50'} rounded-lg p-6`}>
                  <h4 className={`font-bold text-xl mb-2 ${index === 0 ? 'text-[#FFD700]' : 'text-white'}`}>
                    {competitor.name}
                    {index === 0 && <span className="block text-sm text-[#FFD700]/80 font-normal">⭐ Recomendado</span>}
                  </h4>
                  <p className="text-lg font-semibold text-gray-300 mb-4">{competitor.price}</p>
                  <ul className="space-y-2">
                    {competitor.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-300">{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
