import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { Menu, X, Phone, MessageSquare, ArrowRight, Calculator } from 'lucide-react';

interface NavbarProps {
  onOpenCalculator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCalculator }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Choose Us', href: '#why-choose-us' },
    { name: 'Process', href: '#process' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Top Banner Contact Strip */}
      <div className="bg-[#36050B] text-white py-1.5 px-4 text-xs font-sans border-b border-[#7E2231]/40 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="flex items-center space-x-2 text-gray-200 hover:text-[#D4AF37] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Call Expert: {SITE_CONFIG.contact.phoneFormatted}</span>
            </a>
            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.contact.whatsappDefaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-200 hover:text-[#D4AF37] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </a>
            <span className="text-[#D4AF37]/80">|</span>
            <span className="text-gray-300 font-medium tracking-wide">
              {SITE_CONFIG.tagline}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {onOpenCalculator && (
              <button
                onClick={onOpenCalculator}
                className="flex items-center space-x-1.5 text-[#E4BF52] hover:text-white transition-colors bg-[#580B14]/60 px-2.5 py-0.5 rounded border border-[#D4AF37]/30"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>GST & Loan Calculator</span>
              </button>
            )}
            <span className="text-xs text-gray-300">Mon - Sat: 9:30 AM - 7:00 PM</span>
          </div>
        </div>
      </div>

      {/* Primary Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#580B14]/95 backdrop-blur-md shadow-xl py-3 border-b border-[#D4AF37]/30'
            : 'bg-gradient-to-b from-[#36050B]/90 via-[#4A0810]/70 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center space-x-3 group"
            >
              <div className="relative w-11 h-11 md:w-12 md:h-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/images/logo-icon.svg"
                  alt="Vitta Vidhi Advisors Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-lg md:text-xl font-bold tracking-wider text-white group-hover:text-[#E4BF52] transition-colors leading-tight">
                  VITTA VIDHI <span className="text-[#D4AF37]">ADVISORS</span>
                </span>
                <span className="text-[10px] tracking-[0.2em] font-semibold uppercase text-gold-gradient leading-none mt-0.5">
                  Tax | Compliance | Advisory
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-medium text-gray-200 hover:text-[#D4AF37] transition-all duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold-gradient hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Right CTA Button */}
            <div className="hidden sm:flex items-center space-x-4">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="relative group overflow-hidden rounded-full p-px font-semibold text-xs md:text-sm shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gold-gradient rounded-full" />
                <span className="relative flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#580B14] group-hover:bg-[#4A0810] text-[#F3E5AB] group-hover:text-white transition-all duration-300">
                  <span>Get Expert Advice</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="p-2 rounded-full bg-[#7E2231]/50 text-[#D4AF37] hover:bg-[#7E2231] transition-colors sm:hidden"
                aria-label="Call Vitta Vidhi Advisors"
              >
                <Phone className="w-5 h-5" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-white hover:text-[#D4AF37] hover:bg-[#7E2231]/50 focus:outline-none transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden bg-[#36050B] border-b border-[#D4AF37]/30 ${
            mobileMenuOpen ? 'max-h-[500px] opacity-100 py-6 px-6' : 'max-h-0 opacity-0 py-0 px-6'
          }`}
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium text-gray-200 hover:text-[#D4AF37] py-2 border-b border-[#580B14] flex justify-between items-center"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]/50" />
              </a>
            ))}

            {onOpenCalculator && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCalculator();
                }}
                className="flex items-center justify-between text-base font-medium text-[#E4BF52] py-2 border-b border-[#580B14]"
              >
                <span className="flex items-center space-x-2">
                  <Calculator className="w-4 h-4 text-[#D4AF37]" />
                  <span>GST & Loan Calculator Tool</span>
                </span>
              </button>
            )}

            <div className="pt-2 flex flex-col space-y-3">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full py-3 rounded-xl bg-gold-gradient text-center font-bold text-[#36050B] text-sm shadow-md"
              >
                Get Expert Advice
              </a>

              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.contact.whatsappDefaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-center font-bold text-white text-sm flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp ({SITE_CONFIG.contact.phoneFormatted})</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
