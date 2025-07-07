
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const socialLinks = [
    { name: "Instagram", url: "https://instagram.com", icon: "📷" },
    { name: "TikTok", url: "https://tiktok.com", icon: "🎵" },
    { name: "WhatsApp", url: "https://wa.me/5511999999999", icon: "💬" },
    { name: "YouTube", url: "https://youtube.com", icon: "🎥" }
  ];

  const quickLinks = [
    { name: "Recursos", href: "#recursos" },
    { name: "Planos", href: "#planos" },
    { name: "Exemplos", href: "#exemplos" },
    { name: "FAQ", href: "#faq" }
  ];

  const legalLinks = [
    { name: "Termos de Uso", href: "/termos" },
    { name: "Política de Privacidade", href: "/privacidade" },
    { name: "Suporte", href: "/suporte" }
  ];

  return (
    <footer className="bg-[#0D0D0D] border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent mb-4 block">
              LinkMax.bio
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              A plataforma mais completa para conectar sua audiência. Crie sua página de links profissional em minutos.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#2C2C2C] rounded-full flex items-center justify-center hover:bg-[#FFD700]/20 hover:border-[#FFD700] border border-gray-700 transition-all duration-300 text-xl"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => document.getElementById(link.href.substring(1))?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 mb-6">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <Link to="/dashboard">
              <Button className="bg-[#2C2C2C] text-white hover:bg-gray-700 border border-gray-700 w-full">
                Acessar Painel
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 LinkMax.bio. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-[#FFD700] font-semibold">
                💰 Satisfação garantida ou seu dinheiro de volta
              </span>
              <span className="text-gray-400">
                🔒 Pagamento 100% seguro
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
