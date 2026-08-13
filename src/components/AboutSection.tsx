import { SITE_CONFIG } from '../config/siteConfig';
import { Award, CheckCircle, Scale, Building2, Landmark, FileText } from 'lucide-react';


export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-[#36050B] via-[#4A0810] to-[#580B14] text-white relative overflow-hidden">
      {/* Background Subtle Watermark & Architectural Lines */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 opacity-10 pointer-events-none">
        <img src="/images/logo-white.svg" alt="Vitta Vidhi Watermark" className="w-full h-full object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Artwork & Stats Grid */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Visual Architecture Composition Card */}
            <div className="relative rounded-3xl bg-[#580B14]/80 p-8 border-2 border-[#D4AF37]/30 shadow-2xl backdrop-blur-md overflow-hidden">
              
              {/* Background Geometric Gold Lines */}
              <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" viewBox="0 0 400 400">
                <path d="M0,100 L400,300 M0,200 L400,0 M100,0 L300,400" stroke="#D4AF37" strokeWidth="1" />
              </svg>

              <div className="relative z-10 space-y-6">
                
                {/* Crest Header */}
                <div className="flex items-center space-x-4 border-b border-[#7E2231] pb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#FAF8F5] p-2 border-2 border-[#D4AF37] shadow-xl flex-shrink-0">
                    <img src="/images/logo.svg" alt="Vitta Vidhi Monogram" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-xl font-bold text-[#F3E5AB]">
                      VITTA VIDHI ADVISORS
                    </h3>
                    <p className="text-xs tracking-widest text-gold-gradient uppercase font-semibold">
                      Taxation & Corporate Advisory
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-200 leading-relaxed font-sans">
                  "Building enduring financial clarity and uncompromised legal compliance for businesses across India."
                </p>

                {/* 4 Pillars Grid */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#36050B]/80 border border-[#D4AF37]/20 flex items-center space-x-3">
                    <Landmark className="w-6 h-6 text-[#D4AF37]" />
                    <div>
                      <div className="text-xs font-bold text-white">Bank Ready</div>
                      <div className="text-[10px] text-gray-300">CMA & DPR Reports</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#36050B]/80 border border-[#D4AF37]/20 flex items-center space-x-3">
                    <Scale className="w-6 h-6 text-[#D4AF37]" />
                    <div>
                      <div className="text-xs font-bold text-white">Direct & Indirect</div>
                      <div className="text-[10px] text-gray-300">Income Tax & GST</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#36050B]/80 border border-[#D4AF37]/20 flex items-center space-x-3">
                    <Building2 className="w-6 h-6 text-[#D4AF37]" />
                    <div>
                      <div className="text-xs font-bold text-white">Corporate Identity</div>
                      <div className="text-[10px] text-gray-300">Startup & MSME</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#36050B]/80 border border-[#D4AF37]/20 flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-[#D4AF37]" />
                    <div>
                      <div className="text-xs font-bold text-white">Withholding Tax</div>
                      <div className="text-[10px] text-gray-300">TDS / TCS Filing</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Stats Counter Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {SITE_CONFIG.stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#580B14]/60 border border-[#D4AF37]/30 text-center backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#E4BF52]">{stat.value}</div>
                  <div className="text-[11px] font-medium text-gray-300 mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Narrative & Mission Statement */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5]/10 text-[#F3E5AB] text-xs font-bold tracking-widest uppercase border border-[#D4AF37]/30">
              <span>About The Advisory</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-white leading-tight">
              Your Vision. <br className="hidden sm:block" />
              <span className="text-gold-gradient">Our Expertise.</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-sans">
              At <strong className="text-white">Vitta Vidhi Advisors</strong>, we understand that managing statutory compliance, tax planning, and bank credit documentation shouldn't divert your focus from growing your business.
            </p>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
              Whether you are an ambitious startup scaling operations, an established enterprise requiring rigorous GST & TDS oversight, or a business seeking capital loan sanctions through structured CMA data and Project Reports, our dedicated team brings meticulous precision to every engagement.
            </p>

            {/* Checklist items */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-200">
                  <strong className="text-white">Taxation & GST:</strong> Seamless filing of ITR, Advance Tax, TDS returns, and GSTR reconciliations.
                </span>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-200">
                  <strong className="text-white">Financial & Project Reporting:</strong> Investor & bank-ready Project Reports, CMA Data, Projected P&L, and Cash Flows.
                </span>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-200">
                  <strong className="text-white">Registrations & Advisory:</strong> Fast-track Udyam MSME, DPIIT Startup India, and statutory registrations.
                </span>
              </div>
            </div>

            {/* Bottom Quote Badge */}
            <div className="pt-4 border-t border-[#7E2231] flex items-center space-x-4">
              <div className="p-3 rounded-full bg-[#FAF8F5] text-[#580B14]">
                <Award className="w-6 h-6 text-[#580B14]" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Everything Your Business Needs. Under One Roof.</div>
                <div className="text-xs text-[#D4AF37]">Strategic guidance with zero compliance risk.</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
