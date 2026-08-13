import { PROCESS_STEPS } from '../config/siteConfig';
import { MessageSquare, SearchCheck, Lightbulb, CheckCircle2 } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquarePhone':
        return <MessageSquare className="w-6 h-6 text-[#D4AF37]" />;
      case 'SearchCheck':
        return <SearchCheck className="w-6 h-6 text-[#D4AF37]" />;
      case 'Lightbulb':
        return <Lightbulb className="w-6 h-6 text-[#D4AF37]" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6 text-[#D4AF37]" />;
      default:
        return <MessageSquare className="w-6 h-6 text-[#D4AF37]" />;
    }
  };


  return (
    <section id="process" className="py-24 bg-gradient-to-b from-[#580B14] via-[#4A0810] to-[#36050B] text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-[#D4AF37]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5]/10 text-[#F3E5AB] text-xs font-bold tracking-widest uppercase border border-[#D4AF37]/30">
            <span>Our Engagement Process</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-white">
            How We Help You Succeed
          </h2>

          <p className="text-base sm:text-lg text-gray-200 font-sans">
            A transparent, streamlined 4-step advisory roadmap designed to eliminate financial stress.
          </p>

          <div className="w-24 h-1 bg-gold-gradient mx-auto rounded-full" />
        </div>

        {/* Animated Process Timeline Grid */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37] to-[#D4AF37]/20 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl bg-[#580B14]/80 p-8 border border-[#D4AF37]/30 shadow-2xl backdrop-blur-md hover:border-[#D4AF37] transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  {/* Step Badge & Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#36050B] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#4A0810] transition-all">
                      {getIcon(step.iconName)}
                    </div>
                    <span className="font-serif-luxury text-3xl font-extrabold text-gold-gradient">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Label */}
                  <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-1">
                    {step.step}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-serif-luxury font-bold text-white group-hover:text-[#F3E5AB] transition-colors mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Step Indicator */}
                <div className="mt-8 pt-4 border-t border-[#7E2231]/60 flex items-center justify-between text-xs text-[#E4BF52]">
                  <span>Phase {idx + 1} of 4</span>
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Callout */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gold-gradient text-[#36050B] font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
          >
            <span>Start Step 1 Now — Connect With Us</span>
            <CheckCircle2 className="w-5 h-5 text-[#36050B]" />
          </a>
        </div>

      </div>
    </section>
  );
};
