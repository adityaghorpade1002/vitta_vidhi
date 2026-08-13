import React, { useState } from 'react';
import { SERVICES_DATA } from '../config/siteConfig';
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, FileText, ChevronRight, HelpCircle } from 'lucide-react';



interface DetailedServicesSectionProps {
  selectedCategoryId?: string;
  onSelectServiceForForm?: (serviceName: string) => void;
}

export const DetailedServicesSection: React.FC<DetailedServicesSectionProps> = ({
  selectedCategoryId = 'taxation-gst',
  onSelectServiceForForm
}) => {
  const [activeTab, setActiveTab] = useState<string>(selectedCategoryId);

  const currentService = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];

  const handleBookService = (serviceTitle: string) => {
    if (onSelectServiceForForm) {
      onSelectServiceForForm(serviceTitle);
    }
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#580B14]/10 text-[#580B14] text-xs font-bold tracking-widest uppercase border border-[#580B14]/20">
            <span>Detailed Offerings</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-[#580B14]">
            Comprehensive Service Spectrum
          </h2>

          <p className="text-base sm:text-lg text-gray-600 font-sans">
            Explore our end-to-end tax compliance, audit assistance, project funding documentation, and startup registration capabilities.
          </p>

          <div className="w-24 h-1 bg-gold-gradient mx-auto rounded-full" />
        </div>

        {/* Interactive Side-by-Side Spectrum Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Category Tabs Navigation */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 px-2 mb-2">
              Select Category
            </div>

            {SERVICES_DATA.map((service) => {
              const isActive = service.id === activeTab;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#36050B] to-[#580B14] text-white border-[#D4AF37] shadow-xl scale-[1.02]'
                      : 'bg-white text-gray-800 border-gray-200 hover:border-[#D4AF37]/50 hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                        isActive
                          ? 'bg-[#D4AF37] text-[#36050B]'
                          : 'bg-[#580B14]/10 text-[#580B14] group-hover:bg-[#580B14] group-hover:text-white'
                      }`}
                    >
                      {service.title.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className={`font-serif-luxury font-bold text-sm ${isActive ? 'text-white' : 'text-[#580B14]'}`}>
                        {service.title}
                      </div>
                      <div className={`text-[11px] ${isActive ? 'text-[#E4BF52]' : 'text-gray-500'}`}>
                        {service.subItems.length} Key Services
                      </div>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      isActive ? 'text-[#D4AF37] translate-x-1' : 'text-gray-400 group-hover:translate-x-1'
                    }`}
                  />
                </button>
              );
            })}

            {/* Quick Consultation Promo Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#580B14] to-[#42070F] text-white border border-[#D4AF37]/30 mt-6 shadow-md text-left">
              <Sparkles className="w-6 h-6 text-[#E4BF52] mb-3" />
              <div className="font-serif-luxury font-bold text-base text-white">
                Unsure which compliance applies to you?
              </div>
              <p className="text-xs text-gray-300 mt-1 mb-4">
                Our senior advisors analyze your business model and map exact tax & statutory requirements.
              </p>
              <button
                onClick={() => handleBookService(currentService.title)}
                className="w-full py-2.5 rounded-xl bg-gold-gradient text-[#36050B] text-xs font-bold text-center block shadow-sm hover:shadow-md transition-shadow"
              >
                Request Custom Advisory
              </button>
            </div>
          </div>

          {/* Right Column: Dynamically Changing Active Service Details */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/30 shadow-2xl space-y-8 text-left">
            
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-[#580B14] px-3 py-1 rounded-full">
                  {currentService.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#580B14] mt-2">
                  {currentService.title}
                </h3>
              </div>

              <button
                onClick={() => handleBookService(currentService.title)}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-[#580B14] hover:bg-[#4A0810] text-[#F3E5AB] font-bold text-xs sm:text-sm transition-all shadow-md flex-shrink-0"
              >
                <span>Avail This Service</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>

            {/* Comprehensive Description */}
            <p className="text-base text-gray-700 leading-relaxed font-sans bg-[#FAF8F5] p-4 rounded-xl border-l-4 border-[#D4AF37]">
              {currentService.fullDescription}
            </p>

            {/* Complete Sub-items Breakdown */}
            <div>
              <h4 className="text-lg font-serif-luxury font-bold text-[#580B14] mb-4 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-[#D4AF37]" />
                <span>Included Sub-Services & Offerings</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentService.subItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-gray-200 hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="font-bold text-sm text-[#580B14] flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span>{item.name}</span>
                    </div>
                    {item.desc && (
                      <p className="text-xs text-gray-600 mt-1.5 pl-6 font-sans">
                        {item.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Service Key Benefits */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-base font-serif-luxury font-bold text-[#580B14] mb-3 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                <span>Why Vitta Vidhi Advisors for {currentService.title}?</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentService.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-gray-700 bg-[#FAF8F5] p-3 rounded-lg border border-gray-200">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA Strip */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2 text-gray-700">
                <HelpCircle className="w-4 h-4 text-[#580B14]" />
                <span>Have specialized questions regarding your statutory requirements?</span>
              </div>
              <button
                onClick={() => handleBookService(currentService.title)}
                className="font-bold text-[#580B14] hover:text-[#D4AF37] underline"
              >
                Speak with a Tax & Advisory Expert
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
