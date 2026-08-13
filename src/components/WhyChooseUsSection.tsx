import React from 'react';
import { VALUE_CARDS } from '../config/siteConfig';
import { Shield, Award, Clock, TrendingUp } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-10 h-10 text-[#D4AF37]" />;
      case 'Award':
        return <Award className="w-10 h-10 text-[#D4AF37]" />;
      case 'Clock':
        return <Clock className="w-10 h-10 text-[#D4AF37]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-10 h-10 text-[#D4AF37]" />;
      default:
        return <Shield className="w-10 h-10 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-24 bg-[#36050B] relative overflow-hidden text-white border-y border-[#D4AF37]/20">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-radial from-[#D4AF37]/15 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-radial from-[#7E2231]/30 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#580B14] text-[#F3E5AB] text-xs font-bold tracking-widest uppercase border border-[#D4AF37]/40">
            <span>Our Core Values</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-white">
            Why Choose Vitta Vidhi Advisors
          </h2>

          <p className="text-base sm:text-lg text-gray-300 font-sans">
            Built on a pillar of legal compliance, financial foresight, and unwavering client dedication.
          </p>

          <div className="w-24 h-1 bg-gold-gradient mx-auto rounded-full" />
        </div>

        {/* 4 Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUE_CARDS.map((card) => (
            <div
              key={card.id}
              className="group relative rounded-3xl bg-gradient-to-b from-[#580B14] to-[#42070F] p-8 border border-[#D4AF37]/30 shadow-xl hover:shadow-2xl hover:border-[#D4AF37] transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Gold Top Highlight */}
              <div className="absolute top-0 left-8 right-8 h-0.5 bg-gold-gradient rounded-t-3xl opacity-50 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Icon Container */}
                <div className="w-18 h-18 rounded-2xl bg-[#36050B] p-4 border border-[#D4AF37]/40 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:bg-[#4A0810] transition-all duration-300">
                  {getIcon(card.iconName)}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-serif-luxury font-bold text-white group-hover:text-[#F3E5AB] transition-colors mb-2">
                  {card.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs font-semibold text-[#D4AF37] tracking-wider uppercase mb-4">
                  "{card.tagline}"
                </p>

                {/* Description */}
                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  {card.description}
                </p>
              </div>

              {/* Bottom Decorative Line */}
              <div className="mt-8 pt-4 border-t border-[#7E2231]/60 flex items-center justify-between text-xs text-gray-400 group-hover:text-[#F3E5AB] transition-colors">
                <span>Vitta Vidhi Standard</span>
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
