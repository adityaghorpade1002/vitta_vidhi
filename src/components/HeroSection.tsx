import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { ArrowRight, ShieldCheck, TrendingUp, Sparkles, PhoneCall, Award, FileText } from 'lucide-react';

interface HeroSectionProps {
  onExploreServices?: () => void;
  onContactUs?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreServices, onContactUs }) => {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 overflow-hidden bg-gradient-to-b from-[#36050B] via-[#4A0810] to-[#580B14] text-white"
    >
      {/* Decorative Gold & Maroon Radial Light Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#D4AF37]/20 via-[#7E2231]/30 to-transparent blur-3xl rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-radial from-[#E4BF52]/15 to-transparent blur-3xl rounded-full pointer-events-none" />

      {/* Subtle Background Architectural Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Tagline, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Launching Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-[#580B14]/80 border border-[#D4AF37]/50 backdrop-blur-md shadow-lg animate-float">
              <Sparkles className="w-4 h-4 text-[#E4BF52] animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-xs md:text-sm font-semibold tracking-wider text-[#F3E5AB]">
                OFFICIAL ANNOUNCEMENT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
            </div>

            {/* Main Headline: We are LAUNCHED! */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-extrabold tracking-tight text-white leading-none">
                We are <span className="text-gold-gradient drop-shadow-md">LAUNCHED!</span>
              </h1>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-luxury font-semibold text-[#F3E5AB] leading-snug">
                {SITE_CONFIG.heroSubtitle}
              </h2>
            </div>

            {/* Tagline Badge */}
            <div className="py-1 px-3.5 rounded-md bg-[#7E2231]/40 border-l-4 border-[#D4AF37] text-xs md:text-sm font-medium tracking-widest text-[#E4BF52] uppercase">
              {SITE_CONFIG.tagline}
            </div>

            {/* Main Description */}
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-sans max-w-2xl">
              Vitta Vidhi Advisors is a professional advisory firm dedicated to simplifying financial and business complexities and helping you build a{' '}
              <strong className="text-[#D4AF37] font-semibold underline decoration-[#D4AF37]/40 underline-offset-4">
                stronger foundation for growth
              </strong>
              .
            </p>

            {/* Key Value Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 w-full max-w-xl text-xs sm:text-sm">
              <div className="flex items-center space-x-2 bg-[#580B14]/60 p-2.5 rounded-lg border border-[#D4AF37]/20">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="text-gray-200">100% Statutory Guarantee</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#580B14]/60 p-2.5 rounded-lg border border-[#D4AF37]/20">
                <Award className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="text-gray-200">Expert CA Advisory</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#580B14]/60 p-2.5 rounded-lg border border-[#D4AF37]/20 col-span-2 sm:col-span-1">
                <TrendingUp className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="text-gray-200">Bank Loan DPR Experts</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 pt-4 w-full sm:w-auto">
              <button
                onClick={() => {
                  if (onExploreServices) onExploreServices();
                  else handleScroll('#services');
                }}
                className="relative group overflow-hidden rounded-full p-px font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 bg-gold-gradient rounded-full" />
                <span className="relative flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-[#580B14] group-hover:bg-[#4A0810] text-[#F3E5AB] group-hover:text-white transition-all duration-300">
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-5 h-5 text-[#D4AF37] group-hover:translate-x-1.5 transition-transform" />
                </span>
              </button>

              <button
                onClick={() => {
                  if (onContactUs) onContactUs();
                  else handleScroll('#contact');
                }}
                className="px-8 py-4 rounded-full bg-[#7E2231]/70 hover:bg-[#7E2231] text-white font-semibold text-sm sm:text-base border border-[#D4AF37]/50 hover:border-[#D4AF37] backdrop-blur-md transition-all duration-300 text-center flex items-center justify-center space-x-2.5 transform hover:-translate-y-0.5"
              >
                <PhoneCall className="w-4 h-4 text-[#E4BF52]" />
                <span>Contact Us ({SITE_CONFIG.contact.phone})</span>
              </button>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset Card with Crest Logo */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-md">
              {/* Outer Glowing Ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gold-gradient opacity-40 blur-xl animate-pulse-glow" />

              {/* Central Card Container */}
              <div className="relative rounded-3xl bg-gradient-to-b from-[#580B14] via-[#4A0810] to-[#36050B] p-8 border-2 border-[#D4AF37]/40 shadow-2xl backdrop-blur-xl text-center space-y-6">
                
                {/* Provided Logo Showcase */}
                <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 p-4 rounded-2xl bg-[#FAF8F5] shadow-2xl border-4 border-[#D4AF37] flex items-center justify-center transform hover:scale-105 transition-transform duration-500 group">
                  <img
                    src="/images/logo.svg"
                    alt="Vitta Vidhi Advisors Official Logo"
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:drop-shadow-xl transition-all"
                  />
                  {/* Gold Corner Accents */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]" />
                </div>

                {/* Floating Financial Badges */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-left">
                  <div className="p-3 rounded-xl bg-[#36050B]/80 border border-[#D4AF37]/30 flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-[#E4BF52] flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-300">GST & Tax</div>
                      <div className="text-xs font-bold text-white">100% Compliant</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#36050B]/80 border border-[#D4AF37]/30 flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-[#E4BF52] flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-300">Project Reports</div>
                      <div className="text-xs font-bold text-white">Bank Sanctioned</div>
                    </div>
                  </div>
                </div>

                {/* Tagline Footer Bar inside Card */}
                <div className="pt-2 border-t border-[#7E2231]/60 text-xs font-semibold tracking-wider text-[#F3E5AB]">
                  TRUSTED FINANCIAL & BUSINESS PARTNER
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
