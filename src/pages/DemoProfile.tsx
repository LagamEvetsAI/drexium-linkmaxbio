import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink, Edit3, Palette, BarChart3, Zap, ArrowLeft } from "lucide-react";

const DemoProfile = () => {
  const [profile, setProfile] = useState({
    name: "LinkMax.bio",
    bio: "A plataforma mais poderosa para criar sua página de links personalizada ✨",
    avatar: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop&crop=face"
  });

  const [links, setLinks] = useState([
    { id: 1, title: "🌟 Criar Minha Página Grátis", url: "/dashboard", active: true, clicks: 1250 },
    { id: 2, title: "📊 Ver Planos e Preços", url: "/#pricing", active: true, clicks: 890 },
    { id: 3, title: "🎨 Galeria de Temas", url: "/dashboard", active: true, clicks: 670 },
    { id: 4, title: "📈 Analytics em Tempo Real", url: "/dashboard", active: true, clicks: 445 },
    { id: 5, title: "💬 Suporte ao Cliente", url: "https://discord.gg/linkmax", active: true, clicks: 320 }
  ]);

  const [editingLink, setEditingLink] = useState<number | null>(null);
  const [tempTitle, setTempTitle] = useState("");
  const [theme, setTheme] = useState("neon");

  const handleEditLink = (linkId: number, currentTitle: string) => {
    setEditingLink(linkId);
    setTempTitle(currentTitle);
  };

  const handleSaveLink = (linkId: number) => {
    setLinks(links.map(link => 
      link.id === linkId ? { ...link, title: tempTitle } : link
    ));
    setEditingLink(null);
    setTempTitle("");
  };

  const handleLinkClick = (linkId: number, url: string) => {
    // Simula o clique e incrementa contador
    setLinks(links.map(link => 
      link.id === linkId ? { ...link, clicks: link.clicks + 1 } : link
    ));
    
    if (url.startsWith('/')) {
      // Link interno - não abre nova janela
      window.location.href = url;
    } else {
      window.open(url, '_blank');
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'neon':
        return 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900';
      case 'nature':
        return 'bg-gradient-to-br from-green-900 via-teal-900 to-blue-900';
      case 'sunset':
        return 'bg-gradient-to-br from-orange-900 via-red-900 to-pink-900';
      default:
        return 'bg-dark-bg';
    }
  };

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header com navegação */}
      <header className="border-b border-gray-800 backdrop-blur-sm bg-dark-bg/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-green rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold neon-text">LinkMax.bio Demo</span>
            </div>
          </div>
          <Link to="/dashboard">
            <Button className="btn-neon">
              Criar Minha Página
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Painel de Controle */}
          <div className="space-y-6">
            <Card className="bg-dark-surface border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Edit3 className="w-5 h-5 text-neon-blue" />
                  <span>Personalize em Tempo Real</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Controle de Tema */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Tema</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'neon', name: 'Neon', color: 'from-purple-500 to-blue-500' },
                      { id: 'nature', name: 'Natureza', color: 'from-green-500 to-teal-500' },
                      { id: 'sunset', name: 'Pôr do Sol', color: 'from-orange-500 to-red-500' }
                    ].map((themeOption) => (
                      <button
                        key={themeOption.id}
                        onClick={() => setTheme(themeOption.id)}
                        className={`p-3 rounded-lg bg-gradient-to-r ${themeOption.color} text-white text-sm font-medium transition-all ${
                          theme === themeOption.id ? 'ring-2 ring-white' : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        {themeOption.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lista de Links Editáveis */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Seus Links</Label>
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {links.map((link) => (
                      <div key={link.id} className="flex items-center space-x-2 p-3 bg-dark-bg rounded-lg border border-gray-700">
                        {editingLink === link.id ? (
                          <div className="flex-1 flex items-center space-x-2">
                            <Input
                              value={tempTitle}
                              onChange={(e) => setTempTitle(e.target.value)}
                              className="flex-1 bg-dark-surface border-gray-600"
                              onKeyPress={(e) => e.key === 'Enter' && handleSaveLink(link.id)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => handleSaveLink(link.id)}
                              className="bg-neon-blue hover:bg-neon-blue/80"
                            >
                              Salvar
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-white">{link.title}</p>
                              <p className="text-xs text-gray-400">{link.clicks} cliques</p>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditLink(link.id, link.title)}
                              className="text-gray-400 hover:text-white"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analytics Demo */}
            <Card className="bg-dark-surface border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-neon-green" />
                  <span>Analytics em Tempo Real</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neon-blue">{totalClicks}</p>
                    <p className="text-sm text-gray-400">Total de Cliques</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neon-green">{links.length}</p>
                    <p className="text-sm text-gray-400">Links Ativos</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-dark-bg rounded-lg">
                  <p className="text-xs text-gray-400 mb-2">Link mais clicado:</p>
                  <p className="text-sm font-medium text-white">
                    {links.sort((a, b) => b.clicks - a.clicks)[0]?.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview da Página */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-gray-800 rounded-3xl p-4 shadow-2xl mx-auto max-w-sm">
              <div className="bg-gray-900 rounded-2xl p-2 mb-3 flex justify-center">
                <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
              </div>
              
              <div className={`${getThemeClasses()} rounded-2xl p-6 h-[600px] overflow-y-auto`}>
                {/* Profile Section */}
                <div className="text-center mb-8 animate-fade-in">
                  <Avatar className="w-20 h-20 mx-auto mb-4 ring-2 ring-white/20">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="bg-gradient-to-br from-neon-blue to-neon-green text-black text-lg font-bold">
                      LM
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-xl font-bold text-white mb-2">
                    {profile.name}
                  </h2>
                  
                  <p className="text-sm text-gray-200 mb-4 px-2 leading-relaxed">
                    {profile.bio}
                  </p>

                  <Badge className="bg-gradient-to-r from-neon-blue to-neon-green text-black text-xs">
                    PRO
                  </Badge>
                </div>

                {/* Links */}
                <div className="space-y-3 mb-8">
                  {links.map((link, index) => (
                    <Card 
                      key={link.id}
                      className="bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/30 transition-all cursor-pointer group animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => handleLinkClick(link.id, link.url)}
                    >
                      <CardContent className="p-4 flex items-center justify-between">
                        <span className="text-white text-sm font-medium group-hover:text-neon-blue transition-colors truncate flex-1 mr-2">
                          {link.title}
                        </span>
                        <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-neon-blue transition-colors flex-shrink-0" />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Footer */}
                <div className="text-center pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-300">
                    Criado com ❤️ no LinkMax.bio
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm mb-3">
                ✨ Experimente editar os links acima e veja as mudanças em tempo real!
              </p>
              <Link to="/dashboard">
                <Button size="lg" className="btn-neon">
                  <Palette className="w-4 h-4 mr-2" />
                  Criar Minha Página Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoProfile;
