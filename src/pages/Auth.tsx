
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await signIn(email, password);
      } else {
        result = await signUp(email, password, name);
      }

      if (result.error) {
        toast({
          title: "Erro",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        if (isLogin) {
          navigate('/dashboard');
        } else {
          toast({
            title: "Conta criada!",
            description: "Verifique seu email para confirmar sua conta.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Algo deu errado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateUsername = (inputName: string) => {
    const cleanName = inputName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    setUsername(cleanName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home link */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>
        </div>

        <Card className="bg-dark-surface border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </CardTitle>
            <p className="text-gray-400">
              {isLogin 
                ? 'Entre na sua conta LinkMax.bio' 
                : 'Crie sua página de links personalizada'
              }
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="name" className="text-gray-300">Nome Completo</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        generateUsername(e.target.value);
                      }}
                      className="bg-dark-bg border-gray-700 text-white"
                      placeholder="Seu nome completo"
                      required={!isLogin}
                    />
                  </div>

                  <div>
                    <Label htmlFor="username" className="text-gray-300">Nome de Usuário</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''))}
                      className="bg-dark-bg border-gray-700 text-white"
                      placeholder="seuusername"
                      required={!isLogin}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Será usado no seu link: linkmax.bio/u/{username || 'seuusername'}
                    </p>
                  </div>
                </>
              )}
              
              <div>
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-dark-bg border-gray-700 text-white"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-300">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-dark-bg border-gray-700 text-white pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {!isLogin && (
                  <p className="text-xs text-gray-500 mt-1">
                    Mínimo 6 caracteres
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full btn-neon"
                disabled={loading}
              >
                {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
              </Button>
            </form>

            {/* Benefits section for signup */}
            {!isLogin && (
              <div className="mt-6 p-4 bg-dark-bg rounded-lg border border-gray-700">
                <h4 className="text-white font-semibold mb-2">O que você ganha:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Página personalizada com seu nome</li>
                  <li>• Links ilimitados</li>
                  <li>• Personalização completa</li>
                  <li>• Analytics detalhados</li>
                  <li>• Temas exclusivos</li>
                </ul>
              </div>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-neon-blue hover:text-neon-green transition-colors"
              >
                {isLogin 
                  ? 'Não tem conta? Criar uma agora' 
                  : 'Já tem conta? Fazer login'
                }
              </button>
            </div>

            {/* Demo link for new users */}
            {!isLogin && (
              <div className="mt-4 text-center">
                <Link 
                  to="/demo" 
                  className="text-sm text-gray-400 hover:text-neon-blue transition-colors"
                >
                  Ver demonstração antes de se cadastrar
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
