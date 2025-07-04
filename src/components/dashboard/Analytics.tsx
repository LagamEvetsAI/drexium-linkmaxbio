
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, Eye, ExternalLink } from "lucide-react";

export const Analytics = () => {
  const stats = [
    { label: "Total de Cliques", value: "1,234", change: "+12%", icon: BarChart3 },
    { label: "Visitantes Únicos", value: "856", change: "+8%", icon: Users },
    { label: "Visualizações", value: "2,341", change: "+15%", icon: Eye },
    { label: "Taxa de Clique", value: "3.2%", change: "+0.5%", icon: TrendingUp },
  ];

  const topLinks = [
    { title: "Meu Portfólio", clicks: 342, percentage: 28 },
    { title: "YouTube", clicks: 298, percentage: 24 },
    { title: "Instagram", clicks: 234, percentage: 19 },
    { title: "LinkedIn", clicks: 187, percentage: 15 },
    { title: "Twitter", clicks: 173, percentage: 14 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400">Acompanhe o desempenho dos seus links</p>
        </div>
        <Badge className="bg-neon-green/20 text-neon-green">
          Plano MAX Necessário
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-dark-surface border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-5 h-5 text-neon-blue" />
                <span className="text-sm text-green-400">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Links */}
      <Card className="bg-dark-surface border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Links Mais Clicados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topLinks.map((link, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-neon-blue/20 rounded-full flex items-center justify-center text-sm font-bold text-neon-blue">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{link.title}</h4>
                    <p className="text-sm text-gray-400">{link.clicks} cliques</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-neon-blue h-2 rounded-full transition-all duration-300"
                      style={{ width: `${link.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-10 text-right">{link.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upgrade CTA */}
      <Card className="bg-gradient-to-br from-neon-green/10 to-neon-blue/10 border-neon-green/20">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-neon-green" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Desbloqueie Analytics Completo</h3>
          <p className="text-gray-400 mb-6">
            Acesse relatórios detalhados, gráficos avançados e insights sobre sua audiência 
            com o plano MAX.
          </p>
          <div className="flex justify-center">
            <button className="btn-neon">
              Fazer Upgrade para MAX
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
