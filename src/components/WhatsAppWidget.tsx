import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { MessageSquare, X, Send, ChevronRight } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const phone = SITE_CONFIG.contact.whatsappNumber;

  const presetTopics = [
    'GST Return & Income Tax Filing Inquiry',
    'Bank Loan Project Report & CMA Data',
    'TDS Return & Certificate Assistance',
    'Startup India & MSME Registration',
  ];

  const handleSend = (msg: string) => {
    const textToSend = msg || SITE_CONFIG.contact.whatsappDefaultMessage;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Expanded Quick Chat Drawer */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-[#36050B] rounded-3xl shadow-2xl border-2 border-[#D4AF37] overflow-hidden text-left animate-fadeIn">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#580B14] to-[#4A0810] p-4 flex items-center justify-between border-b border-[#D4AF37]/30">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                <MessageSquare className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#36050B] rounded-full" />
              </div>
              <div>
                <div className="font-serif-luxury font-bold text-sm text-white">
                  Vitta Vidhi Advisory WhatsApp
                </div>
                <div className="text-[10px] text-emerald-300">Typically replies instantly</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-gray-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4 bg-[#4A0810]/40 text-xs">
            <div className="p-3 rounded-2xl bg-[#580B14] border border-[#D4AF37]/20 text-gray-200">
              👋 Hello! Welcome to <strong>Vitta Vidhi Advisors</strong>. How can our CA & Advisory team assist your business today?
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
                Select Quick Inquiry Topic:
              </div>
              {presetTopics.map((topic, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(`Hello Vitta Vidhi Advisors, I need assistance with: ${topic}`)}
                  className="w-full p-2.5 rounded-xl bg-[#36050B] hover:bg-[#580B14] text-left text-gray-200 border border-[#D4AF37]/20 flex items-center justify-between group transition-colors"
                >
                  <span>{topic}</span>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Type custom message..."
                  className="flex-1 px-3 py-2 rounded-xl bg-[#36050B] border border-[#D4AF37]/30 text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] text-xs"
                />
                <button
                  onClick={() => handleSend(customMsg)}
                  className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-2 border-emerald-400"
        aria-label="Open WhatsApp Chat"
      >
        <MessageSquare className="w-7 h-7" />

        {/* Pulse Indicator */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border border-white" />
        </span>
      </button>

    </div>
  );
};
