
import { useParams, Navigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, MapPin, Calendar, Instagram, Twitter, Youtube, Linkedin, Github, Facebook } from "lucide-react";
import { usePublicProfile } from "@/hooks/usePublicProfile";
import { useClickTracking } from "@/hooks/useClickTracking";
import { useEffect } from "react";

const PublicProfile = () => {
  const { identifier } = useParams<{ identifier: string }>();
  const { profile, links, isLoading, error } = usePublicProfile(identifier || "");
  const { trackClick } = useClickTracking();

  // Debug logging
  useEffect(() => {
    console.log('PublicProfile component mounted with:', {
      identifier,
      currentUrl: window.location.href,
      profile,
      isLoading,
      error
    });
  }, [identifier, profile, isLoading, error]);

  const handleLinkClick = (linkId: string, url: string) => {
    if (profile?.id) {
      trackClick(linkId, profile.id, 'bio_page');
    }
    
    // Open link in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
        <div className="w-full max-w-md mx-auto p-6 space-y-6">
          <div className="text-center space-y-4">
            <Skeleton className="w-24 h-24 rounded-full mx-auto" />
            <Skeleton className="h-6 w-48 mx-auto" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // More detailed error logging and better error handling
  if (error || !profile) {
    console.error('PublicProfile error or no profile found:', {
      identifier,
      error,
      profile,
      currentUrl: window.location.href
    });
    
    // Instead of redirecting to /404, show a user-friendly error message
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Perfil não encontrado</h1>
          <p className="text-gray-400">O perfil que você está procurando não existe ou não está disponível.</p>
          <a 
            href="/" 
            className="inline-block px-6 py-3 bg-neon-blue text-white rounded-lg hover:bg-neon-blue/80 transition-colors"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg px-4 py-6">
      <div className="w-full max-w-md mx-auto space-y-6">
        {/* Profile Header */}
        <div className="text-center space-y-4">
          <Avatar className="w-24 h-24 mx-auto border-2 border-neon-blue">
            <AvatarImage src={profile.avatar_url || ""} alt={profile.name || ""} />
            <AvatarFallback className="bg-dark-surface text-white text-xl">
              {(profile.name || profile.username || "U").charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
            {profile.username && (
              <p className="text-gray-400">@{profile.username}</p>
            )}
            {profile.bio && (
              <p className="text-gray-300 mt-2 max-w-sm mx-auto leading-relaxed">{profile.bio}</p>
            )}
          </div>
        </div>

        {/* Social Links */}
        {(profile as any).social_links && (
          <div className="flex justify-center space-x-4">
            {Object.entries((profile as any).social_links)
              .filter(([_, url]) => url)
              .map(([platform, url]) => (
                <button
                  key={platform}
                  onClick={() => window.open(url as string, '_blank')}
                  className="w-10 h-10 bg-dark-surface hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                >
                  {getSocialIcon(platform)}
                </button>
              ))}
          </div>
        )}

        {/* Links */}
        <div className="space-y-3">
          {links.map((link) => (
            <Card 
              key={link.id} 
              className="bg-dark-surface border-gray-700 hover:bg-gray-800 hover:border-neon-blue/50 transition-all duration-200 cursor-pointer group"
              onClick={() => handleLinkClick(link.id, link.url)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white group-hover:text-neon-blue transition-colors truncate">
                      {link.title}
                    </h3>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-neon-blue transition-colors flex-shrink-0 ml-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {links.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">Nenhum link disponível</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 pt-6">
          <p>Desenvolvido por Drexium Tech</p>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
