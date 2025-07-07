
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
      >
        <MessageCircle size={20} />
      </Button>

      {/* Create Page Button */}
      <Link to="/auth">
        <Button className="w-14 h-14 rounded-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 shadow-lg hover:scale-110 transition-transform">
          <Plus size={20} />
        </Button>
      </Link>
    </div>
  );
};
