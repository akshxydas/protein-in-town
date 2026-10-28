import React, { useState } from 'react';
import { MessageCircle, X, ChevronRight, MapPin, Sparkles, HelpCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { createWhatsAppUrl } from '../../utils/formatters';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleLaunchWhatsApp = (customMessage: string) => {
    const url = createWhatsAppUrl(settings.whatsapp, customMessage);
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Quick Action Menu Modal */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-graphite border border-graphite-border rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-graphite-border">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-lime flex items-center justify-center text-charcoal font-black">
                <MessageCircle className="w-5 h-5 fill-charcoal" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">PROTEIN IN TOWN</h4>
                <p className="text-[11px] text-lime flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse"></span>
                  Kakkanad Store Team Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-coolgray-400 hover:text-white hover:bg-charcoal transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-coolgray-300 py-3 leading-relaxed">
            Need quick assistance? Chat directly with our supplement specialists at Kusumagiri Jn, Kakkanad.
          </p>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleLaunchWhatsApp("Hello PROTEIN IN TOWN, I would like to check stock availability for a specific supplement.")}
              className="w-full text-left p-2.5 rounded-xl bg-charcoal hover:bg-charcoal-700 border border-graphite-border text-xs text-coolgray-200 hover:text-white flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-lime" />
                <span>Check product availability</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-coolgray-400 group-hover:text-lime transition-colors" />
            </button>

            <button
              onClick={() => handleLaunchWhatsApp("Hello PROTEIN IN TOWN, could you give me directions and opening hours for your Kakkanad store today?")}
              className="w-full text-left p-2.5 rounded-xl bg-charcoal hover:bg-charcoal-700 border border-graphite-border text-xs text-coolgray-200 hover:text-white flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-lime" />
                <span>Store directions & opening hours</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-coolgray-400 group-hover:text-lime transition-colors" />
            </button>

            <button
              onClick={() => handleLaunchWhatsApp("Hello PROTEIN IN TOWN, I need advice choosing the best protein or creatine for my training goal.")}
              className="w-full text-left p-2.5 rounded-xl bg-charcoal hover:bg-charcoal-700 border border-graphite-border text-xs text-coolgray-200 hover:text-white flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-lime" />
                <span>Supplement recommendation guidance</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-coolgray-400 group-hover:text-lime transition-colors" />
            </button>
          </div>

          <div className="mt-3 pt-2 text-[10px] text-center text-coolgray-400">
            Typically replies within a few minutes during shop hours (10:30 AM - 9:30 PM).
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-2xl transition-all transform hover:scale-105 active:scale-95 group focus:outline-none"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="font-bold text-xs tracking-wider uppercase hidden sm:inline text-white">
          Chat With Store
        </span>
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping sm:hidden"></span>
      </button>
    </div>
  );
};
