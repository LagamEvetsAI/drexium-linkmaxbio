
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Crown, Zap, Star } from "lucide-react";

export const PlanManager = () => {
  const currentPlan = {
    name: "Free",
    validUntil: null,
    features: ["Links ilimitados", "Tema básico", "Página personalizada"]
  };

  const plans = [
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
        "Remoção da marca",
        "Suporte prioritário"
      ],
      color: "from-neon-blue to-blue-600",
      icon: Star,
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
        "Embed de vídeos (YouTube/Spotify)",
        "Analytics completo",
        "Formulário de contato",
        "Domínio próprio",
        "API personalizada",
        "Suporte dedicado"
      ],
      color: "from-neon-green to-green-500",
      icon: Crown,
      popular: false
    }
  ];

  const handleUpgrade = (planId: string) => {
    // Integração com Abacate Pay
    const checkoutUrl = `https://checkout.abacatepay.com/plan/${planId}`;
    window.open(checkoutUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Planos</h1>
        <p className="text-gray-400">Gerencie sua assinatura e recursos</p>
      </div>

      {/* Current Plan */}
      <Card className="bg-dark-surface border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="w-5 h-5 mr-2 text-neon-blue" />
            Plano Atual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">{currentPlan.name}</h3>
              {currentPlan.validUntil && (
                <p className="text-sm text-gray-400">
                  Válido até {currentPlan.validUntil}
                </p>
              )}
            </div>
            <Badge className="bg-gray-700 text-gray-300">
              Ativo
            </Badge>
          </div>
          
          <div className="space-y-2">
            <p className="text-gray-400 mb-3">Recursos inclusos:</p>
            {currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative overflow-hidden border-gray-700 hover:border-neon-blue/50 transition-all duration-300 ${
              plan.popular ? 'ring-2 ring-neon-blue/50' : ''
            }`}
          >
            {plan.popular && (
              <Badge className="absolute top-4 right-4 bg-gradient-to-r from-neon-blue to-neon-green text-black">
                Popular
              </Badge>
            )}
            <CardContent className="p-6">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}>
                <plan.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400">{plan.period}</span>
              </div>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-neon-green mr-2 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={() => handleUpgrade(plan.id)}
                className="w-full btn-neon"
              >
                Fazer Upgrade
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Billing History */}
      <Card className="bg-dark-surface border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Histórico de Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-400">Nenhum pagamento registrado ainda</p>
            <p className="text-sm text-gray-500 mt-2">
              Histórico aparecerá aqui após o primeiro upgrade
            </p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="bg-dark-surface border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Perguntas Frequentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-white mb-2">Posso cancelar a qualquer momento?</h4>
            <p className="text-sm text-gray-400">
              Sim, você pode cancelar sua assinatura a qualquer momento. 
              Você continuará tendo acesso aos recursos até o final do período pago.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Como funciona o domínio próprio?</h4>
            <p className="text-sm text-gray-400">
              Com o plano MAX, você pode conectar seu próprio domínio personalizado 
              (ex: seusite.com) à sua página LinkMax.bio.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Os dados são migrados automaticamente?</h4>
            <p className="text-sm text-gray-400">
              Sim! Todos os seus links, configurações e dados são preservados 
              automaticamente quando você faz upgrade do seu plano.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
