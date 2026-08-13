import { useState } from 'react';
import { TESTIMONIALS_LIST } from '../data/testimonialsData';
import type { TestimonialItem } from '../data/testimonialsData';


import { SITE_CONFIG } from '../config/siteConfig';
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquarePlus, X, CheckCircle2, AlertCircle, Send, MessageSquare } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [reviewForm, setReviewForm] = useState({
    fullName: '',
    rating: 5,
    serviceUsed: 'Taxation & GST',
    review: '',
  });

  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_LIST.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_LIST.length) % TESTIMONIALS_LIST.length);
  };

  const validateReviewForm = (): boolean => {
    if (!reviewForm.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return false;
    }
    if (!reviewForm.review.trim()) {
      setErrorMessage('Please enter your review message.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  // Option 1: Send Review via Email (mailto:)
  const handleSendViaEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateReviewForm()) return;

    try {
      const recipient = SITE_CONFIG.contact.email; // vittavidhi@gmail.com
      const subject = 'Client Review - Vitta Vidhi Advisors';
      const body = `Client Name: ${reviewForm.fullName.trim()}
Rating: ${reviewForm.rating}/5
Service Used: ${reviewForm.serviceUsed}

Review:
${reviewForm.review.trim()}`;

      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Open email application
      window.location.href = mailtoUrl;

      // Show confirmation & reset form
      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        setReviewModalOpen(false);
        setReviewForm({
          fullName: '',
          rating: 5,
          serviceUsed: 'Taxation & GST',
          review: '',
        });
      }, 2500);
    } catch (err) {
      console.error('Email launch error:', err);
      setErrorMessage('Could not open default email client. Please send review directly to vittavidhi@gmail.com.');
    }
  };

  // Option 2: Send Review via WhatsApp
  const handleSendViaWhatsApp = () => {
    if (!validateReviewForm()) return;

    try {
      const phone = SITE_CONFIG.contact.whatsappNumber; // 917588536615
      const text = `Hello Vitta Vidhi Advisors,

I would like to share my experience.

Name: ${reviewForm.fullName.trim()}
Rating: ${reviewForm.rating}/5
Service Used: ${reviewForm.serviceUsed}

Review:
${reviewForm.review.trim()}`;

      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');

      // Show confirmation & reset form
      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        setReviewModalOpen(false);
        setReviewForm({
          fullName: '',
          rating: 5,
          serviceUsed: 'Taxation & GST',
          review: '',
        });
      }, 2500);
    } catch (err) {
      console.error('WhatsApp launch error:', err);
      setErrorMessage('Could not open WhatsApp. Please contact +91 7588536615 directly.');
    }
  };

  const current: TestimonialItem = TESTIMONIALS_LIST[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-radial from-[#580B14]/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#580B14]/10 text-[#580B14] text-xs font-bold tracking-widest uppercase border border-[#580B14]/20">
            <span>Client Feedback & Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-[#580B14]">
            What Our Clients Say
          </h2>

          <p className="text-base sm:text-lg text-gray-600 font-sans font-medium">
            Your trust and satisfaction are at the heart of everything we do.
          </p>

          <div className="w-24 h-1 bg-gold-gradient mx-auto rounded-full" />
        </div>

        {/* Carousel Showcase */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Card */}
          <div
            className={`relative rounded-3xl bg-white border-2 border-[#D4AF37]/40 shadow-2xl p-8 sm:p-12 text-left transition-all duration-500 transform hover:-translate-y-1 ${
              current.isPlaceholder ? 'bg-gradient-to-br from-white to-[#FAF8F5] border-dashed border-[#D4AF37]' : ''
            }`}
          >
            <Quote className="absolute top-6 right-8 w-16 h-16 text-[#D4AF37]/15 pointer-events-none" />

            <div className="space-y-6">
              {/* Rating Stars */}
              <div className="flex items-center space-x-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
                <span className="text-xs font-bold text-gray-500 ml-2">
                  ({current.service})
                </span>
              </div>

              {/* Quote Text */}
              <p className="text-lg sm:text-xl text-gray-800 font-serif-luxury leading-relaxed italic">
                "{current.review}"
              </p>

              {/* Author Info */}
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="font-serif-luxury font-bold text-lg text-[#580B14]">
                    {current.name}
                  </div>
                  {current.company && (
                    <div className="text-xs text-gray-600 font-sans mt-0.5">
                      {current.company} {current.location ? `(${current.location})` : ''}
                    </div>
                  )}
                </div>

                {/* Counter */}
                <div className="text-xs font-bold text-gray-400">
                  {currentIndex + 1} / {TESTIMONIALS_LIST.length}
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white border border-[#D4AF37] text-[#580B14] hover:bg-[#580B14] hover:text-white transition-colors shadow-md"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Share Experience Button */}
            <button
              onClick={() => {
                setErrorMessage('');
                setReviewModalOpen(true);
              }}
              className="inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-full bg-gold-gradient text-[#36050B] font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#36050B]" />
              <span>Share Your Experience</span>
            </button>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white border border-[#D4AF37] text-[#580B14] hover:bg-[#580B14] hover:text-white transition-colors shadow-md"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

        </div>

      </div>

      {/* Share Experience Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37] overflow-hidden p-6 sm:p-8 text-left my-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
              <div>
                <h3 className="text-xl font-serif-luxury font-bold text-[#580B14]">
                  Share Your Experience
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  We appreciate your feedback for Vitta Vidhi Advisors
                </p>
              </div>
              <button
                onClick={() => setReviewModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Close review modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="py-8 text-center space-y-4 animate-fadeIn">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                <h4 className="text-2xl font-serif-luxury font-bold text-[#580B14]">
                  Thank you for sharing your experience with us!
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed max-w-sm mx-auto">
                  Your review details have been prepared and sent for verification. Our team will review and display it on the website shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendViaEmail} className="space-y-5 text-xs sm:text-sm">
                
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewForm.fullName}
                    onChange={(e) => setReviewForm({ ...reviewForm, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#580B14] text-gray-800"
                    placeholder="e.g. Anand R. Shah"
                  />
                </div>

                {/* Star Rating Selector */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1.5">
                    Rating * ({reviewForm.rating} / 5 Stars)
                  </label>
                  <div className="flex items-center space-x-2 py-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = (hoverRating !== null ? hoverRating : reviewForm.rating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          className="p-1 focus:outline-none transform hover:scale-125 transition-transform"
                          aria-label={`Rate ${star} star`}
                        >
                          <Star
                            className={`w-7 h-7 transition-colors ${
                              isFilled ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300 fill-transparent'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Service Used (Optional Dropdown) */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1.5">
                    Service Used
                  </label>
                  <select
                    value={reviewForm.serviceUsed}
                    onChange={(e) => setReviewForm({ ...reviewForm, serviceUsed: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#580B14] text-gray-800"
                  >
                    <option value="Taxation & GST">Taxation & GST</option>
                    <option value="TDS">TDS</option>
                    <option value="Project Reporting">Project Reporting</option>
                    <option value="GST Registration">GST Registration</option>
                    <option value="Startup & MSME Registration">Startup & MSME Registration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Your Review */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1.5">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={reviewForm.review}
                    onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#580B14] text-gray-800"
                    placeholder="Describe your experience with Vitta Vidhi Advisors..."
                  />
                </div>

                {/* User explanation text */}
                <p className="text-[11px] text-gray-500 italic bg-[#FAF8F5] p-2.5 rounded-lg border border-gray-200">
                  "Your review will be sent directly to Vitta Vidhi Advisors for approval before being displayed on our website."
                </p>

                {/* Submission Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* Option 1: Email */}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-gold-gradient text-[#36050B] font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4 text-[#36050B]" />
                    <span>Send via Email</span>
                  </button>

                  {/* Option 2: WhatsApp */}
                  <button
                    type="button"
                    onClick={handleSendViaWhatsApp}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
};
