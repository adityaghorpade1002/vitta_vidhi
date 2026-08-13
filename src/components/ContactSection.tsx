import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';

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

interface ContactSectionProps {
  presetService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ presetService }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    serviceRequired: presetService || 'Taxation & GST',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastSubmittedInfo, setLastSubmittedInfo] = useState<{
    name: string;
    email: string;
    service: string;
    method: 'Mail' | 'WhatsApp';
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your Full Name.');
      return false;
    }

    const cleanMobile = formData.mobileNumber.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length < 10) {
      setStatus('error');
      setErrorMessage('Please enter a valid 10-digit Mobile Number.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid Email Address.');
      return false;
    }

    if (!formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your Message.');
      return false;
    }

    return true;
  };

  // Primary Action: Open User's Default Email Client via mailto: link
  const handleSendEmail = () => {
    if (!validateForm()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const recipient = SITE_CONFIG.contact.email;
      const subject = `New Enquiry - ${SITE_CONFIG.brandName}`;
      const body = `Name: ${formData.fullName.trim()}
Mobile Number: ${formData.mobileNumber.trim()}
Email Address: ${formData.email.trim()}
Service Required: ${formData.serviceRequired}

Message:
${formData.message.trim()}`;

      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;

      setLastSubmittedInfo({
        name: formData.fullName,
        email: formData.email,
        service: formData.serviceRequired,
        method: 'Mail',
      });
      setStatus('success');

      // Clear form after validation & dispatch
      setFormData({
        fullName: '',
        mobileNumber: '',
        email: '',
        serviceRequired: 'Taxation & GST',
        message: '',
      });
    } catch (err) {
      console.error('Mailto launch error:', err);
      setStatus('error');
      setErrorMessage(
        `Unable to open your email app automatically. Please email your details directly to ${SITE_CONFIG.contact.email} or call ${SITE_CONFIG.contact.phoneFormatted}.`
      );
    }
  };

  // Secondary Action: Open WhatsApp with pre-filled enquiry message
  const handleSendWhatsApp = () => {
    if (!validateForm()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const phone = SITE_CONFIG.contact.whatsappNumber;
      const text = `Hello ${SITE_CONFIG.brandName}, I would like to submit an enquiry:

Name: ${formData.fullName.trim()}
Mobile Number: ${formData.mobileNumber.trim()}
Email Address: ${formData.email.trim()}
Service Required: ${formData.serviceRequired}

Message:
${formData.message.trim()}`;

      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');

      setLastSubmittedInfo({
        name: formData.fullName,
        email: formData.email,
        service: formData.serviceRequired,
        method: 'WhatsApp',
      });
      setStatus('success');

      // Clear form after validation & dispatch
      setFormData({
        fullName: '',
        mobileNumber: '',
        email: '',
        serviceRequired: 'Taxation & GST',
        message: '',
      });
    } catch (err) {
      console.error('WhatsApp launch error:', err);
      setStatus('error');
      setErrorMessage(
        `Unable to open WhatsApp automatically. Please call us directly at ${SITE_CONFIG.contact.phoneFormatted}.`
      );
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#36050B] relative overflow-hidden text-white border-t border-[#D4AF37]/30">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#D4AF37]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#580B14] text-[#D4AF37] text-xs font-bold tracking-widest uppercase border border-[#D4AF37]/30">
            <span>Direct Client Consultation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-white">
            Get In Touch With Our <span className="text-gold-gradient">Advisors</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 font-sans">
            Ready to optimize your taxes, prepare bank loan reports, or register your business? Send us a direct enquiry below.
          </p>

          <div className="w-24 h-1 bg-gold-gradient mx-auto rounded-full" />
        </div>

        {/* Contact Info & Enquiry Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Office Contact Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="rounded-3xl bg-gradient-to-b from-[#580B14] to-[#4A0810] border-2 border-[#D4AF37]/40 shadow-2xl p-8 space-y-8 text-left">
              <div>
                <h3 className="font-serif-luxury font-bold text-2xl text-white">
                  Headquarters & Consultation
                </h3>
                <p className="text-xs text-gray-300 mt-1 font-sans">
                  Visit our office or reach out via direct phone/email consultation.
                </p>
              </div>

              <div className="space-y-6">
                
                {/* Helpline Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#36050B] border border-[#D4AF37]/50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Direct Advisory Helpline</div>
                    <a
                      href={`tel:${SITE_CONFIG.contact.phone}`}
                      className="text-lg font-bold text-white hover:text-[#E4BF52] transition-colors"
                    >
                      {SITE_CONFIG.contact.phoneFormatted}
                    </a>
                    <div className="text-xs text-gray-300 mt-0.5">Click to call directly</div>
                  </div>
                </div>

                {/* Email Contact */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#36050B] border border-[#D4AF37]/50 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Official Business Email</div>
                    <a
                      href={`mailto:${SITE_CONFIG.contact.email}`}
                      className="text-base font-bold text-white hover:text-[#E4BF52] transition-colors"
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                    <div className="text-xs text-gray-300 mt-0.5">Direct enquiry destination</div>
                  </div>
                </div>

                {/* Office Location */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#36050B] border border-[#D4AF37]/50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Advisory Headquarters</div>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      {SITE_CONFIG.contact.address}
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#36050B] border border-[#D4AF37]/50 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Business Working Hours</div>
                    <div className="text-sm font-semibold text-white">
                      {SITE_CONFIG.contact.workingHours}
                    </div>
                  </div>
                </div>

              </div>

              {/* Instant WhatsApp Action Strip */}
              <div className="pt-6 border-t border-[#7E2231] text-center space-y-3">
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.contact.whatsappDefaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp with Vitta Vidhi Advisors"
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-bold text-white text-sm flex items-center justify-center space-x-2 shadow-lg transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Instant WhatsApp Chat ({SITE_CONFIG.contact.phoneFormatted})</span>
                </a>

                {/* Official Social Media Profiles */}
                <div className="pt-3 border-t border-[#7E2231]/60 text-left space-y-2">
                  <div className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider text-center">
                    Official Social Profiles
                  </div>
                  <div className="flex items-center space-x-3">
                    <a
                      href={SITE_CONFIG.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow Vitta Vidhi Advisors on Instagram (@vittavidhi_advisors)"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#36050B] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#36050B] transition-all text-xs font-bold flex items-center justify-center space-x-2 shadow-md"
                    >
                      <InstagramIcon className="w-4 h-4" />
                      <span>@vittavidhi_advisors</span>
                    </a>
                    <a
                      href={SITE_CONFIG.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Connect with Vitta Vidhi Advisors on LinkedIn"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#36050B] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#36050B] transition-all text-xs font-bold flex items-center justify-center space-x-2 shadow-md"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                      <span>LinkedIn Profile</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Direct Email / WhatsApp Enquiry Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#FAF8F5] text-gray-900 border-2 border-[#D4AF37] shadow-2xl p-8 sm:p-10 text-left">
              
              <div className="mb-8">
                <h3 className="font-serif-luxury font-bold text-2xl text-[#580B14]">
                  Send Enquiry
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  Fill in your requirements below. Clicking "Send Enquiry" will open your email application pre-filled to <strong className="text-[#580B14]">{SITE_CONFIG.contact.email}</strong>.
                </p>
              </div>

              {/* Success Notification Alert */}
              {status === 'success' && lastSubmittedInfo && (
                <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm space-y-2 animate-fadeIn">
                  <div className="flex items-center space-x-2 font-bold text-emerald-800 text-base">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Enquiry Prepared Successfully!</span>
                  </div>
                  <p className="leading-relaxed">
                    Thank you, <strong>{lastSubmittedInfo.name}</strong>. Your enquiry details for <strong>{lastSubmittedInfo.service}</strong> have been opened in your {lastSubmittedInfo.method} application.
                  </p>
                  <p className="text-xs text-emerald-700">
                    If your email client did not open automatically, please send your email directly to <strong>{SITE_CONFIG.contact.email}</strong>.
                  </p>
                </div>
              )}

              {/* Error Notification Alert */}
              {status === 'error' && errorMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-300 text-red-800 text-xs sm:text-sm flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form Element */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendEmail();
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#580B14] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#580B14] text-sm transition-colors"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#580B14] mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      required
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="e.g. 9307479801"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#580B14] text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#580B14] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#580B14] text-sm transition-colors"
                    />
                  </div>

                  {/* Service Required Dropdown */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#580B14] mb-2">
                      Service Required *
                    </label>
                    <select
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-[#580B14] text-sm transition-colors"
                    >
                      <option value="Taxation & GST">Taxation & GST</option>
                      <option value="TDS">TDS</option>
                      <option value="Project Reporting">Project Reporting</option>
                      <option value="GST Registration">GST Registration</option>
                      <option value="Startup & MSME Registration">Startup & MSME Registration</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#580B14] mb-2">
                    Message / Requirement Details *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details about your business requirements or queries..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#580B14] text-sm transition-colors"
                  />
                </div>

                {/* Dual Action Dispatch Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-4">
                  
                  {/* Action 1: Send via Email */}
                  <button
                    type="button"
                    onClick={handleSendEmail}
                    disabled={status === 'submitting'}
                    className="flex-1 py-4 px-6 rounded-full bg-gold-gradient text-[#36050B] font-bold text-sm shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-[#36050B]" />
                    <span>Send Enquiry (Via Email)</span>
                  </button>

                  {/* Action 2: Send via WhatsApp */}
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    disabled={status === 'submitting'}
                    className="py-4 px-6 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </button>

                </div>

                {/* Confidentiality Notice */}
                <p className="text-[11px] text-gray-500 text-center italic">
                  * All information submitted is strictly confidential and used solely for business consultation by Vitta Vidhi Advisors.
                </p>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
