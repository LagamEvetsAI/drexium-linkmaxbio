
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Smartphone, Monitor } from "lucide-react";
import { useState } from "react";

interface PreviewData {
  profile: {
    name: string;
    bio: string;
    avatar: string;
  };
  links: Array<{
    id: number;
    title: string;
    url: string;
    active: boolean;
  }>;
  theme: string;
}

interface PreviewPaneProps {
  data: PreviewData;
}

export const PreviewPane = ({ data }: PreviewPaneProps) => {
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');

  const getThemeClasses = () => {
    switch (data.theme) {
      case 'neon':
        return 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900';
      case 'nature':
        return 'bg-gradient-to-br from-green-900 via-teal-900 to-blue-900';
      default:
        return 'bg-dark-bg';
    }
  };

  return (
    <div className="h-full p-6 bg-dark-elevated">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Preview em Tempo Real</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'mobile' ? 'bg-neon-blue/20 text-neon-blue' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('desktop')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'desktop' ? 'bg-neon-blue/20 text-neon-blue' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview Container */}
      <div className={`mx-auto ${viewMode === 'mobile' ? 'max-w-sm' : 'max-w-lg'}`}>
        {viewMode === 'mobile' ? (
          // Mobile Frame
          <div className="bg-gray-800 rounded-3xl p-3 shadow-2xl mx-auto">
            <div className="bg-gray-900 rounded-2xl p-1 mb-2">
              <div className="w-16 h-1 bg-gray-600 rounded-full mx-auto"></div>
            </div>
            <div className={`${getThemeClasses()} rounded-2xl p-6 h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600`}>
              <PreviewContent data={data} />
            </div>
          </div>
        ) : (
          // Desktop Frame
          <div className="bg-gray-800 rounded-lg p-4 shadow-2xl mx-auto">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 bg-gray-700 rounded px-3 py-1 text-xs text-gray-400">
                linkmax.bio/{data.profile.name.toLowerCase().replace(' ', '')}
              </div>
            </div>
            <div className={`${getThemeClasses()} rounded-lg p-8 h-[500px] overflow-y-auto`}>
              <PreviewContent data={data} />
            </div>
          </div>
        )}
      </div>

      {/* Preview Info */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Atualizações em tempo real • {data.links.filter(l => l.active).length} links ativos
        </p>
      </div>
    </div>
  );
};

const PreviewContent = ({ data }: { data: PreviewData }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Profile Section */}
      <div className="text-center mb-8 animate-fade-in w-full">
        <Avatar className="w-20 h-20 mx-auto mb-4 ring-2 ring-neon-blue/50">
          <AvatarImage src={data.profile.avatar} alt={data.profile.name} />
          <AvatarFallback className="bg-gradient-to-br from-neon-blue to-neon-green text-black text-lg font-bold">
            {data.profile.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <h2 className="text-xl font-bold text-white mb-2">
          {data.profile.name || "Seu Nome"}
        </h2>
        
        <p className="text-sm text-gray-400 mb-4 px-4">
          {data.profile.bio || "Sua biografia aqui"}
        </p>

        <Badge className="bg-gradient-to-r from-neon-blue to-neon-green text-black text-xs">
          FREE
        </Badge>
      </div>

      {/* Links */}
      <div className="space-y-3 mb-8 w-full">
        {data.links.filter(link => link.active).length === 0 ? (
          <Card className="bg-dark-surface/50 border-gray-700 animate-pulse">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gray-700 rounded-full mx-auto mb-3"></div>
              <p className="text-gray-400 text-sm">Adicione seus primeiros links</p>
              <p className="text-gray-500 text-xs mt-1">Eles aparecerão aqui automaticamente</p>
            </CardContent>
          </Card>
        ) : (
          data.links
            .filter(link => link.active)
            .map((link, index) => (
              <Card 
                key={link.id}
                className="bg-dark-surface/70 border-gray-700 hover:border-neon-blue/50 transition-all cursor-pointer group animate-fade-in w-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <span className="text-white text-sm font-medium group-hover:text-neon-blue transition-colors truncate flex-1 mr-2">
                    {link.title}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-neon-blue transition-colors flex-shrink-0" />
                </CardContent>
              </Card>
            ))
        )}
      </div>

      {/* Footer */}
      <div className="text-center pt-4 border-t border-gray-700 w-full">
        <p className="text-xs text-gray-500">
          Criado com ❤️ no LinkMax.bio
        </p>
      </div>
    </div>
  );
};
