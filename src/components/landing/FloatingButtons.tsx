
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, MessageCircle } from "lucide-react";

export const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <Button
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg animate-pulse-neon"
        onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
        title="Falar no WhatsApp"
      >
        <MessageCircle size={20} />
      </Button>

      {/* Create Page Button */}
      <Link to="/auth">
        <Button 
          className="w-14 h-14 rounded-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 shadow-lg hover:scale-110 transition-transform animate-pulse-neon"
          title="Comece Agora"
        >
          <Plus size={20} />
        </Button>
      </Link>

      {/* Floating CTA */}
      <div className="bg-[#FFD700] text-black px-4 py-2 rounded-full shadow-lg animate-pulse-neon whitespace-nowrap text-sm font-bold">
        Comece Agora
      </div>
    </div>
  );
};
