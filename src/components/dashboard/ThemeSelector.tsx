
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown } from "lucide-react";

interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
  plan: 'free' | 'pro' | 'max';
}

interface ThemeSelectorProps {
  onThemeChange: (theme: string) => void;
}

export const ThemeSelector = ({ onThemeChange }: ThemeSelectorProps) => {
  const [selectedTheme, setSelectedTheme] = useState('default');

  const themes: Theme[] = [
    {
      id: 'default',
      name: 'Padrão',
      description: 'Tema escuro clássico',
      preview: 'bg-gradient-to-br from-gray-900 to-black',
      colors: { primary: '#00F0FF', secondary: '#A8FF60', background: '#000000' },
      plan: 'free'
    },
    {
      id: 'neon',
      name: 'Neon Dreams',
      description: 'Vibes cyberpunk',
      preview: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
      colors: { primary: '#B455FF', secondary: '#FF10F0', background: '#1a0b2e' },
      plan: 'pro'
    },
    {
      id: 'nature',
      name: 'Nature Fresh',
      description: 'Tons naturais',
      preview: 'bg-gradient-to-br from-green-900 via-teal-900 to-blue-900',
      colors: { primary: '#10B981', secondary: '#06D6A0', background: '#064e3b' },
      plan: 'pro'
    },
    {
      id: 'sunset',
      name: 'Sunset Glow',
      description: 'Cores do pôr do sol',
      preview: 'bg-gradient-to-br from-orange-900 via-red-900 to-pink-900',
      colors: { primary: '#F97316', secondary: '#EF4444', background: '#7c2d12' },
      plan: 'max'
    },
    {
      id: 'ocean',
      name: 'Deep Ocean',
      description: 'Profundezas marinhas',
      preview: 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900',
      colors: { primary: '#3B82F6', secondary: '#8B5CF6', background: '#1e3a8a' },
      plan: 'max'
    },
    {
      id: 'gold',
      name: 'Golden Hour',
      description: 'Elegância dourada',
      preview: 'bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900',
      colors: { primary: '#F59E0B', secondary: '#DC2626', background: '#78350f' },
      plan: 'max'
    }
  ];

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    onThemeChange(themeId);
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'pro':
        return <Badge className="bg-neon-blue/20 text-neon-blue">PRO</Badge>;
      case 'max':
        return <Badge className="bg-neon-green/20 text-neon-green">MAX</Badge>;
      default:
        return null;
    }
  };

  const isThemeAvailable = (plan: string) => {
    // Simular plano atual do usuário
    const currentPlan = 'free';
    if (currentPlan === 'free') return plan === 'free';
    if (currentPlan === 'pro') return ['free', 'pro'].includes(plan);
    return true; // max plan has access to all
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Temas</h1>
        <p className="text-gray-400">Escolha um tema que combina com seu estilo</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <Card 
            key={theme.id}
            className={`cursor-pointer transition-all duration-300 border-2 ${
              selectedTheme === theme.id
                ? 'border-neon-blue neon-glow'
                : 'border-gray-700 hover:border-gray-600'
            } ${
              !isThemeAvailable(theme.plan) ? 'opacity-60' : ''
            }`}
            onClick={() => isThemeAvailable(theme.plan) && handleThemeSelect(theme.id)}
          >
            <CardContent className="p-0">
              {/* Theme Preview */}
              <div className={`h-32 ${theme.preview} rounded-t-lg relative overflow-hidden`}>
                {!isThemeAvailable(theme.plan) && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Crown className="w-8 h-8 text-yellow-500" />
                  </div>
                )}
                {selectedTheme === theme.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-neon-blue rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                )}
              </div>
              
              {/* Theme Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{theme.name}</h3>
                  {getPlanBadge(theme.plan)}
                </div>
                <p className="text-sm text-gray-400 mb-4">{theme.description}</p>
                
                {/* Color Palette */}
                <div className="flex space-x-2 mb-4">
                  <div 
                    className="w-6 h-6 rounded-full border border-gray-600"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <div 
                    className="w-6 h-6 rounded-full border border-gray-600"
                    style={{ backgroundColor: theme.colors.secondary }}
                  />
                  <div 
                    className="w-6 h-6 rounded-full border border-gray-600"
                    style={{ backgroundColor: theme.colors.background }}
                  />
                </div>

                {!isThemeAvailable(theme.plan) ? (
                  <Button 
                    size="sm" 
                    className="w-full btn-neon"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Redirect to upgrade
                    }}
                  >
                    Fazer Upgrade
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    variant={selectedTheme === theme.id ? "default" : "outline"}
                    className={`w-full ${
                      selectedTheme === theme.id 
                        ? 'bg-neon-blue/20 text-neon-blue border-neon-blue' 
                        : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    {selectedTheme === theme.id ? 'Selecionado' : 'Selecionar'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Custom Theme Section */}
      <Card className="bg-dark-surface border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            Tema Personalizado
            <Badge className="ml-2 bg-neon-green/20 text-neon-green">MAX</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 mb-4">
            Crie seu próprio tema com cores personalizadas, fontes exclusivas e elementos únicos.
          </p>
          <Button className="btn-neon">
            Criar Tema Personalizado
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="btn-neon">
          Aplicar Tema
        </Button>
      </div>
    </div>
  );
};
