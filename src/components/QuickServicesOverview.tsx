import React, { useState } from 'react';
import { SERVICES_DATA } from '../config/siteConfig';
import type { ServiceCategory } from '../config/siteConfig';
import { Receipt, FileCheck2, TrendingUp, ShieldCheck, Rocket, ArrowRight, CheckCircle, X } from 'lucide-react';


interface QuickServicesOverviewProps {
  onSelectService?: (serviceId: string) => void;
}

export const QuickServicesOverview: React.FC<QuickServicesOverviewProps> = ({ onSelectService }) => {
  const [activeModal, setActiveModal] = useState<ServiceCategory | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ReceiptPercent':
        return <Receipt className="w-8 h-8 text-[#D4AF37]" />;
      case 'FileCheck2':
        return <FileCheck2 className="w-8 h-8 text-[#D4AF37]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-8 h-8 text-[#D4AF37]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />;
      case 'Rocket':
        return <Rocket className="w-8 h-8 text-[#D4AF37]" />;
      default:
        return <Receipt className="w-8 h-8 text-[#D4AF37]" />;
    }
  };

  return (
    <section className="py-20 bg-[#FAF8F5] relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#580B14]/5 to-transparent rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#580B14]/10 text-[#580B14] text-xs font-bold tracking-widest uppercase border border-[#580B14]/20">
            <span>Core Expertise</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-[#580B14]">
            Quick Services Overview
          </h2>

          <p className="text-base sm:text-lg text-gray-600 font-sans">
            Comprehensive financial, tax, compliance, and corporate advisory solutions tailored for business success.
          </p>

          <div className="w-24 h-1 bg-gold-gradient mx-auto rounded-full" />
        </div>

        {/* 5 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, idx) => (
            <div
              key={service.id}
              className={`group relative rounded-2xl bg-white p-8 border border-[#D4AF37]/30 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between ${
                idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-gold-gradient rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Header: Icon & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#580B14] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-[#4A0810] transition-all duration-300">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FAF8F5] text-[#580B14] border border-[#D4AF37]/30">
                    {service.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif-luxury font-bold text-[#580B14] group-hover:text-[#8B1E2D] transition-colors mb-3">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                {/* Sub Items Preview Pills */}
                <div className="space-y-2 mb-8">
                  {service.subItems.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-gray-700">
                      <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  ))}
                  {service.subItems.length > 3 && (
                    <div className="text-xs font-semibold text-[#8B1E2D] pt-1">
                      + {service.subItems.length - 3} more specialized offerings
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveModal(service)}
                  className="inline-flex items-center space-x-2 text-sm font-bold text-[#580B14] hover:text-[#D4AF37] transition-colors group/btn"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    if (onSelectService) onSelectService(service.id);
                    const el = document.querySelector('#contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-gray-500 hover:text-[#580B14] transition-colors underline underline-offset-2"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Expandable Service Detail Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37] overflow-hidden flex flex-col my-auto">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#36050B] via-[#580B14] to-[#4A0810] text-white p-6 sm:p-8 flex items-start justify-between border-b border-[#D4AF37]/40">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-[#580B14] border border-[#D4AF37]/50 flex items-center justify-center flex-shrink-0">
                  {getIcon(activeModal.iconName)}
                </div>
                <div>
                  <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
                    {activeModal.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
                    {activeModal.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content Scrollable Area */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-left">
              <p className="text-base text-gray-700 leading-relaxed font-sans border-l-4 border-[#D4AF37] pl-4 italic">
                {activeModal.fullDescription}
              </p>

              <div>
                <h4 className="text-lg font-serif-luxury font-bold text-[#580B14] mb-4 flex items-center space-x-2">
                  <span>Scope of Offerings</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeModal.subItems.map((sub, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#FAF8F5] border border-gray-200">
                      <div className="font-bold text-sm text-[#580B14] flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                        <span>{sub.name}</span>
                      </div>
                      {sub.desc && (
                        <p className="text-xs text-gray-600 mt-1 pl-6">
                          {sub.desc}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="text-lg font-serif-luxury font-bold text-[#580B14] mb-3">
                  Key Advantages with Vitta Vidhi Advisors
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeModal.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center space-x-2.5 text-xs sm:text-sm font-semibold text-gray-800 bg-[#D4AF37]/10 p-3 rounded-lg border border-[#D4AF37]/30">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-500">
                Need customized assistance for this service?
              </div>
              <div className="flex space-x-3 w-full sm:w-auto">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors w-1/2 sm:w-auto"
                >
                  Close
                </button>
                <a
                  href="#contact"
                  onClick={() => {
                    setActiveModal(null);
                    const el = document.querySelector('#contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 rounded-full bg-gold-gradient text-[#36050B] text-sm font-bold shadow-md hover:shadow-lg transition-all text-center w-1/2 sm:w-auto"
                >
                  Request Consultation
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
