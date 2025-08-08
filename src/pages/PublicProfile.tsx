
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Mail } from "lucide-react";
import { usePublicProfile } from "@/hooks/usePublicProfile";

const PublicProfile = () => {
  const { slug } = useParams();
  const { profile, links, isLoading, error } = usePublicProfile(slug || '');

  const handleLinkClick = (linkId: string, url: string) => {
    // TODO: Registrar o clique para analytics
    console.log(`Link clicked: ${linkId} - ${url}`);
    window.open(url, '_blank');
  };

  const getThemeClasses = () => {
    const profileTheme = (profile as any)?.theme; // Safely access theme property
    switch (profileTheme) {
      case 'neon':
        return 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900';
      case 'nature':
        return 'bg-gradient-to-br from-green-900 via-teal-900 to-blue-900';
      default:
        return 'bg-dark-bg';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Página não encontrada</h1>
          <p className="text-gray-400">Esta página não existe ou foi removida.</p>
        </div>
      </div>
    );
  }

  // Parse social links safely
  const profileSocialLinks = (profile as any).social_links;
  const socialLinks = Array.isArray(profileSocialLinks) 
    ? profileSocialLinks.filter((link: any) => link.active && link.url)
    : [];

  return (
    <div className={`min-h-screen ${getThemeClasses()} py-8 px-4`}>
      <div className="max-w-md mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-neon-blue/50">
            <AvatarImage src={profile.avatar_url || ''} alt={profile.name || 'Avatar'} />
            <AvatarFallback className="bg-gradient-to-br from-neon-blue to-neon-green text-black text-xl font-bold">
              {(profile.name || 'U').split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <h1 className="text-2xl font-bold mb-2 text-white">
            {profile.name || 'Usuário'}
          </h1>
          
          {profile.bio && (
            <p className="text-gray-400 mb-4">
              {profile.bio}
            </p>
          )}

          <Badge className="bg-gradient-to-r from-neon-blue to-neon-green text-black mb-4">
            FREE
          </Badge>
        </div>

        {/* Links */}
        <div className="space-y-4 mb-8">
          {links.length === 0 ? (
            <Card className="bg-dark-surface/50 border-gray-700">
              <CardContent className="p-6 text-center">
                <p className="text-gray-400 text-sm">Nenhum link disponível</p>
              </CardContent>
            </Card>
          ) : (
            links.map((link, index) => (
              <Card 
                key={link.id}
                className="link-item animate-fade-in cursor-pointer hover:border-neon-blue/50 transition-all"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleLinkClick(link.id, link.url)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <span className="font-medium text-white">{link.title}</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-neon-blue transition-colors" />
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex justify-center space-x-4 mb-8">
            {socialLinks.map((social: any, index: number) => (
              <Button
                key={social.platform}
                variant="ghost"
                size="sm"
                className="w-12 h-12 rounded-full border border-gray-700 hover:border-neon-blue/50 hover:bg-neon-blue/10 transition-all animate-fade-in"
                style={{ animationDelay: `${(links.length + index) * 0.1}s` }}
                onClick={() => window.open(social.url, '_blank')}
              >
                <span className="text-xs font-medium">
                  {social.platform.charAt(0).toUpperCase()}
                </span>
              </Button>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Criado com ❤️ no LinkMax.bio</p>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
