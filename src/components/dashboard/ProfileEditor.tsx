
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Upload, Instagram, Youtube, Twitter, Linkedin, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/useProfile";

interface ProfileData {
  name: string;
  bio: string;
  avatar: string;
}

interface ProfileEditorProps {
  onUpdate: (profile: ProfileData) => void;
}

export const ProfileEditor = ({ onUpdate }: ProfileEditorProps) => {
  const { toast } = useToast();
  const { profile, updateProfile, isUpdating } = useProfile();
  
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatar_url: ""
  });

  const [socialLinks, setSocialLinks] = useState([
    { platform: "Instagram", icon: Instagram, url: "", active: true, color: "text-pink-400" },
    { platform: "YouTube", icon: Youtube, url: "", active: true, color: "text-red-400" },
    { platform: "Twitter", icon: Twitter, url: "", active: false, color: "text-blue-400" },
    { platform: "LinkedIn", icon: Linkedin, url: "", active: false, color: "text-blue-600" },
    { platform: "Facebook", icon: Facebook, url: "", active: false, color: "text-blue-500" },
  ]);

  // Update form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        bio: profile.bio || "",
        avatar_url: profile.avatar_url || ""
      });
    }
  }, [profile]);

  // Update parent component when form data changes
  useEffect(() => {
    onUpdate({
      name: formData.name,
      bio: formData.bio,
      avatar: formData.avatar_url
    });
  }, [formData, onUpdate]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialToggle = (index: number) => {
    const updated = socialLinks.map((link, i) => 
      i === index ? { ...link, active: !link.active } : link
    );
    setSocialLinks(updated);
  };

  const handleSocialUrlChange = (index: number, url: string) => {
    const updated = socialLinks.map((link, i) => 
      i === index ? { ...link, url } : link
    );
    setSocialLinks(updated);
  };

  const handleAvatarUpload = () => {
    toast({
      title: "Em breve",
      description: "Upload de imagem será implementado em breve!",
    });
  };

  const handleSave = () => {
    updateProfile({
      name: formData.name,
      bio: formData.bio,
      avatar_url: formData.avatar_url,
    });

    toast({
      title: "Perfil salvo",
      description: "Suas informações foram atualizadas com sucesso!",
    });
  };

  const displayName = formData.name || profile?.name || "Usuário";
  const displayAvatar = formData.avatar_url || profile?.avatar_url || "";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Perfil</h1>
        <p className="text-gray-400">Personalize suas informações e redes sociais</p>
      </div>

      {/* Profile Info */}
      <Card className="bg-dark-surface border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={displayAvatar} alt={displayName} />
              <AvatarFallback className="bg-gradient-to-br from-neon-blue to-neon-green text-black text-xl font-bold">
                {displayName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button 
                onClick={handleAvatarUpload}
                variant="outline" 
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <Upload className="w-4 h-4 mr-2" />
                Alterar Foto
              </Button>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG até 2MB</p>
            </div>
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-gray-300">Nome</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="bg-dark-bg border-gray-700 text-white"
              placeholder="Seu nome completo"
            />
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio" className="text-gray-300">Biografia</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="bg-dark-bg border-gray-700 text-white"
              placeholder="Conte um pouco sobre você..."
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.bio.length}/160 caracteres
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className="bg-dark-surface border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Redes Sociais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {socialLinks.map((social, index) => (
            <div key={social.platform} className="flex items-center space-x-4 p-4 bg-dark-bg rounded-lg border border-gray-700">
              <social.icon className={`w-5 h-5 ${social.color}`} />
              <div className="flex-1">
                <Label className="text-gray-300">{social.platform}</Label>
                <Input
                  value={social.url}
                  onChange={(e) => handleSocialUrlChange(index, e.target.value)}
                  placeholder={`Seu link do ${social.platform}`}
                  className="bg-dark-surface border-gray-600 text-white mt-1"
                  disabled={!social.active}
                />
              </div>
              <Switch
                checked={social.active}
                onCheckedChange={() => handleSocialToggle(index)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          className="btn-neon"
          disabled={isUpdating}
        >
          {isUpdating ? "Salvando..." : "Salvar Perfil"}
        </Button>
      </div>
    </div>
  );
};
