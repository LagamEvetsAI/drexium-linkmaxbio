
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Link as LinkIcon, 
  User, 
  Palette, 
  BarChart3, 
  Crown, 
  ExternalLink,
  Zap,
  HelpCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { DashboardView } from "@/pages/Dashboard";
import { Tables } from "@/integrations/supabase/types";
import { useDomain } from "@/hooks/useDomain";

type Profile = Tables<'profiles'>;

interface DashboardSidebarProps {
  activeView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  onTutorialOpen: () => void;
  profile: Profile | null | undefined;
}

export const DashboardSidebar = ({ activeView, onViewChange, onTutorialOpen, profile }: DashboardSidebarProps) => {
  const { getProfileUrl } = useDomain();
  
  const menuItems = [
    { id: 'links' as DashboardView, label: 'Links', icon: LinkIcon },
    { id: 'profile' as DashboardView, label: 'Perfil', icon: User },
    { id: 'themes' as DashboardView, label: 'Temas', icon: Palette },
    { id: 'analytics' as DashboardView, label: 'Analytics', icon: BarChart3, badge: 'PRO' },
    { id: 'plan' as DashboardView, label: 'Planos', icon: Crown },
  ];

  const displayName = profile?.name || "Usuário";
  const displayUsername = profile?.username || "username";
  const displayAvatar = profile?.avatar_url || "";

  // Determine the identifier for the public URL - prioritize username over slug
  const getPublicIdentifier = () => {
    // Always prefer username if available, as it's user-friendly
    if (profile?.username && profile.username.trim() !== '') {
      return profile.username;
    }
    // Fallback to slug if username is not set
    if (profile?.slug && profile.slug.trim() !== '') {
      return profile.slug;
    }
    return null;
  };

  const publicIdentifier = getPublicIdentifier();
  const canViewPublicPage = publicIdentifier !== null;
  
  const handleViewPublicPage = () => {
    if (publicIdentifier) {
      const fullUrl = getProfileUrl(publicIdentifier);
      console.log('Opening public profile:', {
        identifier: publicIdentifier,
        fullUrl,
        profile: {
          username: profile?.username,
          slug: profile?.slug,
          name: profile?.name
        }
      });
      window.open(fullUrl, '_blank', 'noopener,noreferrer');
    }
  };

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
          <Avatar className="w-10 h-10">
            <AvatarImage src={displayAvatar} alt={displayName} />
            <AvatarFallback className="bg-gradient-to-br from-neon-blue to-neon-green text-black font-bold">
              {displayName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-white truncate">{displayName}</p>
            <p className="text-xs text-gray-400">Plano Free</p>
          </div>
        </div>
        {canViewPublicPage ? (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs"
            onClick={handleViewPublicPage}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Ver Página Pública
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs opacity-50 cursor-not-allowed" 
            disabled
            title="Configure seu nome de usuário no perfil para ativar sua página pública"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Configure Perfil
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-8">
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

      {/* Tutorial Button */}
      <div className="mb-8">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
          onClick={onTutorialOpen}
        >
          <HelpCircle className="w-4 h-4 mr-3" />
          Tutorial
        </Button>
      </div>

      {/* Upgrade CTA */}
      <div className="p-4 bg-gradient-to-br from-neon-blue/10 to-neon-green/10 rounded-lg border border-neon-blue/20">
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
