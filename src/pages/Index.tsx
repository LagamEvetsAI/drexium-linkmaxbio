import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Zap, Globe, BarChart3, Palette, Video, MessageSquare, Eye } from "lucide-react";

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState("free");

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "R$ 0",
      period: "/mês",
      description: "Perfeito para começar",
      features: [
        "Links ilimitados",
        "Tema básico",
        "Página personalizada",
        "Suporte por email"
      ],
      color: "from-gray-600 to-gray-700",
      popular: false
    },
    {
      id: "pro",
      name: "Pro",
      price: "R$ 19",
      period: "/mês",
      description: "Para criadores de conteúdo",
      features: [
        "Tudo do Free",
        "Ícones animados",
        "Fontes customizadas",
        "Temas completos",
        "Remoção da marca"
      ],
      color: "from-neon-blue to-blue-600",
      popular: true
    },
    {
      id: "max",
      name: "Max",
      price: "R$ 39",
      period: "/mês",
      description: "Máximo desempenho",
      features: [
        "Tudo do Pro",
        "Embed de vídeos",
        "Analytics completo",
        "Formulário de contato",
        "Domínio próprio"
      ],
      color: "from-neon-green to-green-500",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="border-b border-gray-800 backdrop-blur-sm bg-dark-bg/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-green rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold neon-text">LinkMax.bio</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/demo">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                <Eye className="w-4 h-4 mr-2" />
                Ver Demo
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Entrar
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button className="btn-neon">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-poppins">
            Sua página de links
            <span className="block neon-text animate-glow">
              mais poderosa
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Crie uma página profissional para centralizar todos os seus links, 
            com analytics avançados e recursos exclusivos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/dashboard">
              <Button size="lg" className="btn-neon text-lg px-8 py-4">
                Criar Minha Página
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-gray-600 text-gray-300 hover:text-white hover:border-neon-blue">
                <Eye className="w-5 h-5 mr-2" />
                Ver Demonstração
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Recursos <span className="neon-text">Incríveis</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Palette, title: "Temas Personalizados", desc: "Escolha entre vários temas ou crie o seu próprio" },
              { icon: BarChart3, title: "Analytics Avançados", desc: "Acompanhe cliques e desempenho em tempo real" },
              { icon: Video, title: "Embed de Vídeos", desc: "Incorpore vídeos do YouTube e Spotify" },
              { icon: Globe, title: "Domínio Próprio", desc: "Use seu próprio domínio personalizado" }
            ].map((feature, index) => (
              <Card key={index} className="bg-dark-surface border-gray-700 hover:border-neon-blue/50 transition-colors">
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 text-neon-blue mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-dark-surface/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Escolha Seu <span className="neon-text">Plano</span>
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Comece grátis e faça upgrade quando precisar de mais recursos
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
                  selectedPlan === plan.id 
                    ? 'border-neon-blue neon-glow' 
                    : 'border-gray-700 hover:border-gray-600'
                } ${plan.popular ? 'scale-105' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-neon-blue to-neon-green text-black">
                    Popular
                  </Badge>
                )}
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}>
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-neon-green mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${
                      plan.id === 'free' 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'btn-neon'
                    }`}
                  >
                    {plan.id === 'free' ? 'Começar Grátis' : 'Fazer Upgrade'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para <span className="neon-text">começar?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de criadores que já usam o LinkMax.bio 
            para conectar sua audiência.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="btn-neon text-lg px-8 py-4 animate-pulse-neon">
              Criar Conta Gratuita
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2024 LinkMax.bio. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
