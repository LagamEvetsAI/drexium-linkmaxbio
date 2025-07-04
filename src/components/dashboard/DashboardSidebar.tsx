
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Link as LinkIcon, 
  User, 
  Palette, 
  BarChart3, 
  Crown, 
  ExternalLink,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import type { DashboardView } from "@/pages/Dashboard";

interface DashboardSidebarProps {
  activeView: DashboardView;
  onViewChange: (view: DashboardView) => void;
}

export const DashboardSidebar = ({ activeView, onViewChange }: DashboardSidebarProps) => {
  const menuItems = [
    { id: 'links' as DashboardView, label: 'Links', icon: LinkIcon },
    { id: 'profile' as DashboardView, label: 'Perfil', icon: User },
    { id: 'themes' as DashboardView, label: 'Temas', icon: Palette },
    { id: 'analytics' as DashboardView, label: 'Analytics', icon: BarChart3, badge: 'PRO' },
    { id: 'plan' as DashboardView, label: 'Planos', icon: Crown },
  ];

  return (
    <div className="w-64 bg-dark-surface border-r border-gray-800 p-6">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-8">
        <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-green rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold neon-text">LinkMax.bio</span>
      </div>

      {/* User Info */}
      <div className="mb-8 p-4 bg-dark-bg rounded-lg border border-gray-700">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-green rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-sm">JS</span>
          </div>
          <div>
            <p className="font-medium text-white">João Silva</p>
            <p className="text-xs text-gray-400">Plano Free</p>
          </div>
        </div>
        <Link to="/u/joaosilva">
          <Button variant="outline" size="sm" className="w-full text-xs">
            <ExternalLink className="w-3 h-3 mr-1" />
            Ver Página Pública
          </Button>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeView === item.id ? "default" : "ghost"}
            size="sm"
            className={`w-full justify-start ${
              activeView === item.id 
                ? 'bg-neon-blue/20 text-neon-blue border-neon-blue/50' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            onClick={() => onViewChange(item.id)}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
            {item.badge && (
              <Badge variant="secondary" className="ml-auto text-xs bg-neon-green/20 text-neon-green">
                {item.badge}
              </Badge>
            )}
          </Button>
        ))}
      </nav>

      {/* Upgrade CTA */}
      <div className="mt-8 p-4 bg-gradient-to-br from-neon-blue/10 to-neon-green/10 rounded-lg border border-neon-blue/20">
        <h4 className="font-semibold text-white mb-2">Upgrade para Pro</h4>
        <p className="text-xs text-gray-400 mb-3">
          Desbloqueie recursos avançados e remova limitações.
        </p>
        <Button size="sm" className="w-full btn-neon">
          Fazer Upgrade
        </Button>
      </div>
    </div>
  );
};
