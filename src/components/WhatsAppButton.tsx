import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/351967396821"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-whatsapp flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
    >
      <MessageCircle size={24} className="text-primary-foreground" />
    </a>
  );
};

export default WhatsAppButton;
