import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';

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
    method: 'Email' | 'WhatsApp';
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your full name.');
      return false;
    }

    const cleanPhone = formData.mobileNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setStatus('error');
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return false;
    }

    if (!formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please provide a brief message regarding your requirement.');
      return false;
    }

    return true;
  };

  // Primary Action: Open default email application via mailto:
  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const recipient = SITE_CONFIG.contact.email; // vittavidhi@gmail.com
      const subject = 'New Enquiry - Vitta Vidhi Advisors';
      const body = `Name: ${formData.fullName.trim()}
Mobile Number: ${formData.mobileNumber.trim()}
Email Address: ${formData.email.trim()}
Service Required: ${formData.serviceRequired}

Message:
${formData.message.trim()}`;

      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Open email application
      window.location.href = mailtoUrl;

      setLastSubmittedInfo({
        name: formData.fullName,
        email: formData.email,
        service: formData.serviceRequired,
        method: 'Email',
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
        'Unable to open your email app automatically. Please email your details directly to vittavidhi@gmail.com or call +91 9307479801.'
      );
    }
  };

  // Secondary Action: Open WhatsApp with pre-filled enquiry message
  const handleSendWhatsApp = () => {
    if (!validateForm()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const phone = SITE_CONFIG.contact.whatsappNumber; // 919307479801
      const text = `Hello Vitta Vidhi Advisors, I would like to submit an enquiry:

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
        'Unable to open WhatsApp automatically. Please call us directly at +91 9307479801.'
      );
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#36050B] relative overflow-hidden text-white border-t border-[#D4AF37]/30">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#D4AF37]/15 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-radial from-[#7E2231]/30 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#580B14] text-[#F3E5AB] text-xs font-bold tracking-widest uppercase border border-[#D4AF37]/40">
            <span>Direct Consultation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-white">
            Let's Build Your Growth Story Together
          </h2>

          <p className="text-base sm:text-lg text-gray-300 font-sans">
            Connect with Vitta Vidhi Advisors for professional guidance in taxation, compliance, registrations, project reporting, and business advisory.
          </p>

          <div className="w-24 h-1 bg-gold-gradient mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Official Contact Details */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            <div className="rounded-3xl bg-gradient-to-b from-[#580B14] to-[#42070F] p-8 border border-[#D4AF37]/40 shadow-2xl space-y-6">
              <h3 className="text-2xl font-serif-luxury font-bold text-[#F3E5AB]">
                Official Contact Information
              </h3>

              <div className="space-y-6">
                
                {/* Phone Contact */}
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
              <div className="pt-6 border-t border-[#7E2231] text-center">
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.contact.whatsappDefaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-bold text-white text-sm flex items-center justify-center space-x-2 shadow-lg transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Instant WhatsApp Chat ({SITE_CONFIG.contact.phoneFormatted})</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: Direct Email / WhatsApp Enquiry Form */}
          <div className="lg:col-span-7 bg-[#580B14] rounded-3xl p-8 sm:p-10 border-2 border-[#D4AF37]/40 shadow-2xl text-left">
            
            <h3 className="text-2xl font-serif-luxury font-bold text-white mb-2">
              Send Us An Enquiry
            </h3>
            <p className="text-xs text-gray-300 mb-8">
              Fill out your details below to send an enquiry directly to <strong className="text-[#F3E5AB]">vittavidhi@gmail.com</strong>.
            </p>

            {status === 'success' ? (
              <div className="p-8 bg-[#36050B] rounded-2xl border-2 border-[#D4AF37] text-center space-y-4 animate-fadeIn">
                <CheckCircle2 className="w-16 h-16 text-[#D4AF37] mx-auto" />
                <h4 className="text-2xl font-serif-luxury font-bold text-white">
                  {lastSubmittedInfo?.method === 'WhatsApp' ? 'WhatsApp Opened!' : 'Email App Opened!'}
                </h4>
                <p className="text-sm text-gray-200 leading-relaxed">
                  Thank you <strong className="text-[#E4BF52]">{lastSubmittedInfo?.name}</strong>. Your enquiry details for{' '}
                  <strong className="text-[#D4AF37]">{lastSubmittedInfo?.service}</strong> have been formatted for{' '}
                  <strong className="text-white">vittavidhi@gmail.com</strong>.
                </p>
                <p className="text-xs text-gray-300">
                  {lastSubmittedInfo?.method === 'WhatsApp'
                    ? 'Please click "Send" in WhatsApp to complete your message.'
                    : 'Please click "Send" in your email application to transmit your enquiry.'}
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setLastSubmittedInfo(null);
                  }}
                  className="px-6 py-2.5 rounded-full bg-gold-gradient text-[#36050B] font-bold text-xs shadow-md hover:shadow-lg transition-all"
                >
                  Create Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendEmail} className="space-y-6">
                
                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-red-900/80 border border-red-500 text-red-100 text-xs flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-sans">{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-[#36050B] border border-[#D4AF37]/30 text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      required
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="e.g. 9307479801"
                      className="w-full px-4 py-3 rounded-xl bg-[#36050B] border border-[#D4AF37]/30 text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#36050B] border border-[#D4AF37]/30 text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
                    />
                  </div>

                  {/* Service Required Dropdown */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
                      Service Required *
                    </label>
                    <select
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#36050B] border border-[#D4AF37]/30 text-white focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
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

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
                    Message / Requirement Details *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details regarding loan amount, tax return status, GST compliance, or business advisory..."
                    className="w-full px-4 py-3 rounded-xl bg-[#36050B] border border-[#D4AF37]/30 text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
                  />
                </div>

                {/* Clear User Explanation Notice */}
                <div className="p-3 rounded-xl bg-[#36050B]/80 border border-[#D4AF37]/30 text-[#F3E5AB] text-xs text-center font-medium">
                  "Your email app will open with your enquiry details. Please review and click Send."
                </div>

                {/* Action Buttons: Email & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Send via Email Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-full bg-gold-gradient text-[#36050B] font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
                  >
                    <Send className="w-4 h-4 text-[#36050B]" />
                    <span>Send Enquiry via Email</span>
                  </button>

                  {/* Send via WhatsApp Button */}
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="w-full py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>Send Enquiry via WhatsApp</span>
                  </button>
                </div>

                <p className="text-[11px] text-gray-300 text-center">
                  Direct dispatch to <strong className="text-white">vittavidhi@gmail.com</strong> without third-party databases.
                </p>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
