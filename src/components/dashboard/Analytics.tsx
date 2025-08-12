
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, Eye, ExternalLink, MapPin, Smartphone } from "lucide-react";
import { useClickAnalytics } from "@/hooks/useClickAnalytics";
import { Skeleton } from "@/components/ui/skeleton";

export const Analytics = () => {
  const { clickStats, isLoading } = useClickAnalytics();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  const stats = [
    { 
      label: "Total de Cliques", 
      value: clickStats?.totalClicks?.toString() || "0", 
      change: "+0%", 
      icon: BarChart3 
    },
    { 
      label: "Links Ativos", 
      value: clickStats?.clicksPerLink?.length?.toString() || "0", 
      change: "+0%", 
      icon: ExternalLink 
    },
    { 
      label: "Cliques Hoje", 
      value: "0", 
      change: "+0%", 
      icon: Eye 
    },
    { 
      label: "Taxa de Clique", 
      value: "0%", 
      change: "+0%", 
      icon: TrendingUp 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400">Acompanhe o desempenho dos seus links</p>
        </div>
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

      {/* Recent Clicks */}
      <Card className="bg-dark-surface border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Cliques Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clickStats?.recentClicks && clickStats.recentClicks.length > 0 ? (
              clickStats.recentClicks.map((click, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-neon-blue/20 rounded-full flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 text-neon-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{(click as any).links.title}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        {click.city && (
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {click.city}, {click.country}
                          </span>
                        )}
                        {click.device_type && (
                          <span className="flex items-center">
                            <Smartphone className="w-3 h-3 mr-1" />
                            {click.device_type}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(click.clicked_at).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Nenhum clique ainda</h3>
                <p className="text-gray-400">Os cliques nos seus links aparecerão aqui</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
