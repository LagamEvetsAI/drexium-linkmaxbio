
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Mail } from "lucide-react";

const PublicProfile = () => {
  const { slug } = useParams();
  const [profileData, setProfileData] = useState({
    name: "João Silva",
    bio: "Criador de conteúdo | Designer | Desenvolvedor",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    links: [
      { id: 1, title: "Meu Portfólio", url: "https://joaosilva.dev", active: true },
      { id: 2, title: "YouTube", url: "https://youtube.com/@joaosilva", active: true },
      { id: 3, title: "Instagram", url: "https://instagram.com/joaosilva", active: true },
      { id: 4, title: "LinkedIn", url: "https://linkedin.com/in/joaosilva", active: true },
    ],
    socialLinks: [
      { platform: "instagram", url: "https://instagram.com/joaosilva" },
      { platform: "youtube", url: "https://youtube.com/@joaosilva" },
      { platform: "twitter", url: "https://twitter.com/joaosilva" }
    ],
    theme: "default",
    plan: "pro"
  });

  const handleLinkClick = (linkId: number, url: string) => {
    // Registra o clique (implementar com Supabase depois)
    console.log(`Link clicked: ${linkId} - ${url}`);
    window.open(url, '_blank');
  };

  const getThemeClasses = () => {
    switch (profileData.theme) {
      case 'neon':
        return 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900';
      case 'nature':
        return 'bg-gradient-to-br from-green-900 via-teal-900 to-blue-900';
      default:
        return 'bg-dark-bg';
    }
  };

  return (
    <div className={`min-h-screen ${getThemeClasses()} py-8 px-4`}>
      <div className="max-w-md mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-neon-blue/50">
            <AvatarImage src={profileData.avatar} alt={profileData.name} />
            <AvatarFallback className="bg-gradient-to-br from-neon-blue to-neon-green text-black text-xl font-bold">
              {profileData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <h1 className="text-2xl font-bold mb-2 text-white">
            {profileData.name}
          </h1>
          
          <p className="text-gray-400 mb-4">
            {profileData.bio}
          </p>

          {profileData.plan !== 'free' && (
            <Badge className="bg-gradient-to-r from-neon-blue to-neon-green text-black mb-4">
              {profileData.plan.toUpperCase()}
            </Badge>
          )}
        </div>

        {/* Links */}
        <div className="space-y-4 mb-8">
          {profileData.links.filter(link => link.active).map((link, index) => (
            <Card 
              key={link.id}
              className="link-item animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleLinkClick(link.id, link.url)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <span className="font-medium text-white">{link.title}</span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-neon-blue transition-colors" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Links */}
        {profileData.socialLinks.length > 0 && (
          <div className="flex justify-center space-x-4 mb-8">
            {profileData.socialLinks.map((social, index) => (
              <Button
                key={social.platform}
                variant="ghost"
                size="sm"
                className="w-12 h-12 rounded-full border border-gray-700 hover:border-neon-blue/50 hover:bg-neon-blue/10 transition-all animate-fade-in"
                style={{ animationDelay: `${(profileData.links.length + index) * 0.1}s` }}
                onClick={() => window.open(social.url, '_blank')}
              >
                <span className="text-xs font-medium">
                  {social.platform.charAt(0).toUpperCase()}
                </span>
              </Button>
            ))}
          </div>
        )}

        {/* Contact Form (Max Plan Only) */}
        {profileData.plan === 'max' && (
          <Card className="bg-dark-surface/50 border-gray-700 animate-fade-in">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center text-white">
                <Mail className="w-4 h-4 mr-2 text-neon-blue" />
                Entre em Contato
              </h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-lg focus:border-neon-blue focus:ring-1 focus:ring-neon-blue text-white placeholder-gray-400"
                />
                <input
                  type="email"
                  placeholder="Seu email"
                  className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-lg focus:border-neon-blue focus:ring-1 focus:ring-neon-blue text-white placeholder-gray-400"
                />
                <textarea
                  placeholder="Sua mensagem"
                  rows={4}
                  className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-lg focus:border-neon-blue focus:ring-1 focus:ring-neon-blue text-white placeholder-gray-400"
                />
                <Button className="w-full btn-neon">
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
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
