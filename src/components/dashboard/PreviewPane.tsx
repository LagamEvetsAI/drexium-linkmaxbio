
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Smartphone } from "lucide-react";

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
    <div className="h-full p-4 bg-dark-elevated">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">Preview</h3>
        <div className="flex items-center space-x-2">
          <Smartphone className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-400">Mobile</span>
        </div>
      </div>

      {/* Phone Frame */}
      <div className="bg-gray-800 rounded-3xl p-2 max-w-sm mx-auto">
        <div className={`${getThemeClasses()} rounded-2xl p-6 h-[600px] overflow-y-auto`}>
          {/* Profile Section */}
          <div className="text-center mb-6">
            <Avatar className="w-20 h-20 mx-auto mb-3 ring-2 ring-neon-blue/50">
              <AvatarImage src={data.profile.avatar} alt={data.profile.name} />
              <AvatarFallback className="bg-gradient-to-br from-neon-blue to-neon-green text-black text-lg font-bold">
                {data.profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <h2 className="text-lg font-bold text-white mb-2">
              {data.profile.name}
            </h2>
            
            <p className="text-sm text-gray-400 mb-3">
              {data.profile.bio}
            </p>

            <Badge className="bg-gradient-to-r from-neon-blue to-neon-green text-black text-xs">
              FREE
            </Badge>
          </div>

          {/* Links */}
          <div className="space-y-3">
            {data.links.filter(link => link.active).length === 0 ? (
              <Card className="bg-dark-surface/50 border-gray-700">
                <CardContent className="p-4 text-center">
                  <p className="text-gray-400 text-sm">Nenhum link ativo</p>
                </CardContent>
              </Card>
            ) : (
              data.links
                .filter(link => link.active)
                .map((link) => (
                  <Card 
                    key={link.id}
                    className="bg-dark-surface/70 border-gray-700 hover:border-neon-blue/50 transition-all cursor-pointer"
                  >
                    <CardContent className="p-3 flex items-center justify-between">
                      <span className="text-white text-sm font-medium">{link.title}</span>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </CardContent>
                  </Card>
                ))
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-500">
              Criado com ❤️ no LinkMax.bio
            </p>
          </div>
        </div>
      </div>

      {/* Preview Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Visualização em tempo real da sua página
        </p>
      </div>
    </div>
  );
};
