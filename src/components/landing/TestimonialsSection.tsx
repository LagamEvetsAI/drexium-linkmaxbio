
export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ana Silva",
      role: "Influencer Digital",
      image: "https://images.unsplash.com/photo-1494790108755-2616b04aa59d",
      text: "Migrei do Linktree e nunca mais olhei para trás. O LinkMax.bio é muito mais completo e o suporte é incrível!"
    },
    {
      name: "Carlos Santos",
      role: "Empreendedor",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      text: "Consegui aumentar minhas conversões em 40% desde que comecei a usar. Os analytics são fantásticos!"
    },
    {
      name: "Marina Costa",
      role: "Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      text: "A facilidade de personalização é impressionante. Criei uma página que realmente representa minha marca."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#0D0D0D] to-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FFD700]/10 text-[#FFD700] px-6 py-3 rounded-full border border-[#FFD700]/30 mb-6">
            <span className="text-2xl">🏆</span>
            <span className="font-semibold">+3.000 usuários ativos no LinkMax.bio</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            O que nossos usuários dizem
          </h2>
          <p className="text-xl text-gray-300">
            Milhares de criadores confiam no LinkMax.bio para conectar sua audiência
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#2C2C2C] p-8 rounded-xl border border-gray-700 hover:border-[#FFD700]/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-[#FFD700] text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="text-[#FFD700] text-2xl mb-4">★★★★★</div>
              <p className="text-gray-300 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
