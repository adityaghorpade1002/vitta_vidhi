import { SITE_CONFIG } from '../config/siteConfig';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';


export const CallToActionSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-[#36050B] via-[#580B14] to-[#4A0810] text-white relative overflow-hidden">
      {/* Background Animated Light Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial from-[#D4AF37]/20 via-[#7E2231]/20 to-transparent blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Crest Logo Header */}
        <div className="w-20 h-20 mx-auto mb-6 p-3 rounded-3xl bg-[#FAF8F5] border-2 border-[#D4AF37] shadow-2xl flex items-center justify-center transform hover:rotate-6 transition-transform">
          <img src="/images/logo.svg" alt="Vitta Vidhi Advisors Logo" className="w-full h-full object-contain" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#580B14] border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-bold tracking-widest uppercase mb-6 shadow-md">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>TAKE THE NEXT STEP IN BUSINESS GROWTH</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-extrabold text-white leading-tight mb-6">
          Ready to Simplify Your Financial & Business Journey?
        </h2>

        {/* Supporting Text */}
        <p className="text-base sm:text-xl text-gray-200 font-sans max-w-3xl mx-auto leading-relaxed mb-10">
          Connect with Vitta Vidhi Advisors for professional guidance in taxation, compliance, registrations, project reporting, and business advisory.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a
            href="#contact"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-gold-gradient text-[#36050B] font-bold text-base shadow-2xl hover:shadow-gold hover:scale-105 transition-all flex items-center justify-center space-x-3"
          >
            <span>Contact Us Now</span>
            <ArrowRight className="w-5 h-5 text-[#36050B]" />
          </a>

          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.contact.whatsappDefaultMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-xl hover:scale-105 transition-all flex items-center justify-center space-x-3 border border-emerald-400"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Chat on WhatsApp ({SITE_CONFIG.contact.phoneFormatted})</span>
          </a>
        </div>

        {/* Tagline footer strip */}
        <div className="mt-12 text-xs tracking-widest uppercase font-semibold text-[#D4AF37]/90">
          {SITE_CONFIG.tagline}
        </div>

      </div>
    </section>
  );
};
