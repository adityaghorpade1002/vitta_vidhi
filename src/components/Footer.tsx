import React, { useState } from 'react';
import { SITE_CONFIG, SERVICES_DATA } from '../config/siteConfig';
import { Phone, Mail, MapPin, ArrowUp, X } from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export const Footer: React.FC = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-[#36050B] via-[#2E050B] to-[#200307] text-white pt-20 pb-10 border-t-2 border-[#D4AF37]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#7E2231]/60">
          
          {/* Column 1: Logo & Tagline (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center space-x-3 inline-block">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] p-2 border-2 border-[#D4AF37] shadow-xl flex-shrink-0">
                <img src="/images/logo.svg" alt="Vitta Vidhi Advisors Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-serif-luxury font-bold text-xl text-white">
                  VITTA VIDHI <span className="text-[#D4AF37]">ADVISORS</span>
                </div>
                <div className="text-[10px] tracking-[0.2em] font-semibold uppercase text-gold-gradient">
                  Tax | Compliance | Advisory
                </div>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
              Everything Your Business Needs. Under One Roof. Vitta Vidhi Advisors provides high-precision taxation, GST compliance, bank loan project reporting, and startup registrations.
            </p>

            {/* Helpline badge */}
            <div className="p-4 rounded-2xl bg-[#580B14]/80 border border-[#D4AF37]/30 space-y-1">
              <div className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
                Direct Contact Number
              </div>
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="text-lg font-bold text-white hover:text-[#E4BF52] transition-colors flex items-center space-x-2"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>{SITE_CONFIG.contact.phoneFormatted}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif-luxury font-bold text-base text-[#F3E5AB] border-l-2 border-[#D4AF37] pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="hover:text-[#D4AF37] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-[#D4AF37] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-[#D4AF37] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#why-choose-us" onClick={(e) => handleNavClick(e, '#why-choose-us')} className="hover:text-[#D4AF37] transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#testimonials" onClick={(e) => handleNavClick(e, '#testimonials')} className="hover:text-[#D4AF37] transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-[#D4AF37] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Solutions (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-luxury font-bold text-base text-[#F3E5AB] border-l-2 border-[#D4AF37] pl-3">
              Practice Areas
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    onClick={(e) => handleNavClick(e, '#services')}
                    className="hover:text-[#D4AF37] transition-colors flex items-center space-x-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60" />
                    <span>{service.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office Info (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-luxury font-bold text-base text-[#F3E5AB] border-l-2 border-[#D4AF37] pl-3">
              Headquarters
            </h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-white">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href={`tel:${SITE_CONFIG.contact.phone}`} className="hover:text-white font-bold">
                  {SITE_CONFIG.contact.phoneFormatted}
                </a>
              </div>

              {/* Dedicated Footer Social Media Section */}
              <div className="pt-4 border-t border-[#7E2231]/60 space-y-2.5">
                <div className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
                  Social Media
                </div>
                <div className="flex items-center space-x-3">
                  <a
                    href={SITE_CONFIG.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Vitta Vidhi Advisors on Instagram"
                    className="px-3 py-2 rounded-xl bg-[#580B14] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-gold-gradient hover:text-[#36050B] hover:border-[#D4AF37] transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-md flex items-center space-x-2 text-xs font-bold"
                  >
                    <InstagramIcon className="w-4 h-4" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={SITE_CONFIG.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Connect with Vitta Vidhi Advisors on LinkedIn"
                    className="px-3 py-2 rounded-xl bg-[#580B14] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-gold-gradient hover:text-[#36050B] hover:border-[#D4AF37] transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-md flex items-center space-x-2 text-xs font-bold"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © 2026 <strong className="text-white font-serif-luxury">Vitta Vidhi Advisors</strong>. All Rights Reserved.
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Privacy Policy
            </button>
            <span>|</span>
            <button
              onClick={() => setTermsModalOpen(true)}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Terms of Engagement
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-[#580B14] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#36050B] transition-all shadow-md"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 text-gray-800 space-y-4 max-h-[85vh] overflow-y-auto border-2 border-[#D4AF37]">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif-luxury font-bold text-xl text-[#580B14]">Privacy Policy</h3>
              <button onClick={() => setPrivacyModalOpen(false)} className="text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs leading-relaxed text-gray-600">
              Vitta Vidhi Advisors values your privacy and is committed to protecting client data, statutory documentation, financial records, and personal contact info in accordance with Indian information security practices. All data gathered via inquiry forms or advisory engagements is strictly used for tax computation, compliance, loan application preparation, and client communication.
            </p>
          </div>
        </div>
      )}

      {/* Terms of Engagement Modal */}
      {termsModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 text-gray-800 space-y-4 max-h-[85vh] overflow-y-auto border-2 border-[#D4AF37]">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif-luxury font-bold text-xl text-[#580B14]">Terms of Engagement</h3>
              <button onClick={() => setTermsModalOpen(false)} className="text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs leading-relaxed text-gray-600">
              Professional services provided by Vitta Vidhi Advisors, including Income Tax filing, GST return filing, TDS computation, CMA data preparation, and MSME/Startup registrations, are subject to true and accurate disclosures provided by the client. Deadlines and statutory filings depend on timely document submission prior to government cutoff dates.
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};
