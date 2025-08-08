
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  GripVertical, 
  ExternalLink, 
  Edit, 
  Trash2, 
} from "lucide-react";
import { useLinks } from "@/hooks/useLinks";

interface LinkEditorProps {
  onUpdate: (links: any[]) => void;
}

export const LinkEditor = ({ onUpdate }: LinkEditorProps) => {
  const { 
    links, 
    createLink, 
    updateLink, 
    deleteLink, 
    isLoading,
    isCreating,
    isUpdating,
    isDeleting 
  } = useLinks();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<any>(null);
  const [formData, setFormData] = useState({ title: "", url: "" });

  // Update parent component when links change
  useEffect(() => {
    onUpdate(links);
  }, [links, onUpdate]);

  const handleAddLink = () => {
    if (!formData.title || !formData.url) {
      return;
    }

    createLink({
      title: formData.title,
      url: formData.url,
      active: true,
    });

    setFormData({ title: "", url: "" });
    setIsDialogOpen(false);
  };

  const handleEditLink = (link: any) => {
    setEditingLink(link);
    setFormData({ title: link.title, url: link.url });
    setIsDialogOpen(true);
  };

  const handleUpdateLink = () => {
    if (!editingLink || !formData.title || !formData.url) return;

    updateLink({
      id: editingLink.id,
      title: formData.title,
      url: formData.url,
    });

    setEditingLink(null);
    setFormData({ title: "", url: "" });
    setIsDialogOpen(false);
  };

  const handleDeleteLink = (id: string) => {
    deleteLink(id);
  };

  const handleToggleActive = (id: string, active: boolean) => {
    updateLink({
      id,
      active: !active,
    });
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingLink(null);
    setFormData({ title: "", url: "" });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Gerenciar Links</h1>
          <p className="text-gray-400">Adicione e organize seus links importantes</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-neon" disabled={isCreating}>
              <Plus className="w-4 h-4 mr-2" />
              {isCreating ? "Adicionando..." : "Adicionar Link"}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-dark-surface border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingLink ? 'Editar Link' : 'Novo Link'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-gray-300">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Meu Portfólio"
                  className="bg-dark-bg border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="url" className="text-gray-300">URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://exemplo.com"
                  className="bg-dark-bg border-gray-700 text-white"
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={editingLink ? handleUpdateLink : handleAddLink}
                  className="flex-1 btn-neon"
                  disabled={isCreating || isUpdating}
                >
                  {editingLink 
                    ? (isUpdating ? 'Atualizando...' : 'Atualizar')
                    : (isCreating ? 'Adicionando...' : 'Adicionar')
                  }
                </Button>
                <Button 
                  variant="outline" 
                  onClick={closeDialog}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Links List */}
      <div className="space-y-4">
        {links.length === 0 ? (
          <Card className="bg-dark-surface border-gray-700">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Nenhum link ainda</h3>
              <p className="text-gray-400 mb-4">Adicione seu primeiro link para começar</p>
              <Button onClick={() => setIsDialogOpen(true)} className="btn-neon">
                Adicionar Primeiro Link
              </Button>
            </CardContent>
          </Card>
        ) : (
          links.map((link) => (
            <Card 
              key={link.id} 
              className={`bg-dark-surface border-gray-700 transition-all duration-200 ${
                link.active ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <GripVertical className="w-5 h-5 text-gray-500 cursor-move" />
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">{link.title}</h3>
                    <p className="text-sm text-gray-400 flex items-center">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      {link.url}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={link.active}
                      onCheckedChange={() => handleToggleActive(link.id, link.active)}
                      disabled={isUpdating}
                    />
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditLink(link)}
                      className="text-gray-400 hover:text-white"
                      disabled={isUpdating}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteLink(link.id)}
                      className="text-red-400 hover:text-red-300"
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
