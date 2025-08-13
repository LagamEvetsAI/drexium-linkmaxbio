import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Code,
  LayoutDashboard,
  Link,
  LogOut,
  Settings,
  User,
  Eye,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useDomain } from "@/hooks/useDomain";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSidebar() {
  const { signOut } = useAuth();
  const { profile, isLoading } = useProfile();
  const { getProfileUrl } = useDomain();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

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

  const handleViewPublicPage = () => {
    if (publicIdentifier) {
      const fullUrl = getProfileUrl(publicIdentifier);
      window.open(fullUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const displayName = profile?.name || "Usuário";
  const displayAvatar = profile?.avatar_url || "";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-64 bg-dark-bg border-r border-gray-700 text-white">
        <SheetHeader className="text-left mt-4">
          <SheetTitle>Dashboard</SheetTitle>
          <SheetDescription>
            Gerencie seu perfil e links de forma fácil.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="flex items-center justify-center space-x-2">
            {isLoading ? (
              <Skeleton className="h-12 w-12 rounded-full" />
            ) : (
              <Avatar className="w-12 h-12">
                <AvatarImage src={displayAvatar} alt={displayName} />
                <AvatarFallback className="bg-gradient-to-br from-neon-blue to-neon-green text-black text-xl font-bold">
                  {displayName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            <div>
              <h2 className="font-semibold">{isLoading ? <Skeleton className="h-6 w-24" /> : displayName}</h2>
              <p className="text-sm text-gray-400">{isLoading ? <Skeleton className="h-4 w-32" /> : profile?.username ? `@${profile.username}` : 'Configure seu nome'}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <Button variant="ghost" className="justify-start" asChild>
            <RouterLink to="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Visão Geral
            </RouterLink>
          </Button>
          <Button variant="ghost" className="justify-start" asChild>
            <RouterLink to="/dashboard">
              <User className="mr-2 h-4 w-4" />
              Perfil
            </RouterLink>
          </Button>
          <Button variant="ghost" className="justify-start" asChild>
            <RouterLink to="/dashboard">
              <Link className="mr-2 h-4 w-4" />
              Links
            </RouterLink>
          </Button>
          <Button variant="ghost" className="justify-start" asChild>
            <RouterLink to="/dashboard">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </RouterLink>
          </Button>
        </div>
        <div className="border-t border-gray-700" />
        <div className="grid gap-4 py-4">
          {publicIdentifier && (
            <Button variant="ghost" className="justify-start" onClick={handleViewPublicPage}>
              <Eye className="mr-2 h-4 w-4" />
              Ver Página Pública
              <ArrowRight className="ml-auto h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" className="justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Button>
        </div>
        <div className="border-t border-gray-700" />
        <Button variant="ghost" className="justify-start mt-4" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </SheetContent>
    </Sheet>
  );
}
