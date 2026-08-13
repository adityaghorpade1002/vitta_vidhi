import { useState, useEffect } from 'react';
import type { TestimonialItem } from '../data/testimonialsData';
import { getReviewsApiEndpoint, submitClientReview } from '../config/reviewsConfig';
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquarePlus, X, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<TestimonialItem[]>([]);
  const [loadingReviews, setLoadingReviews] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Review Submission Modal States
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Form State
  const [reviewForm, setReviewForm] = useState({
    fullName: '',
    rating: 5,
    serviceUsed: 'Taxation & GST',
    review: '',
    hp_field: '', // Honeypot anti-spam field
  });

  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Fetch approved reviews from Google Sheets API using /api/reviews proxy on dev
  const loadApprovedReviews = async (isInitial: boolean = false) => {
    const API_ENDPOINT = getReviewsApiEndpoint();
    console.log("Reviews API URL:", API_ENDPOINT);

    if (isInitial) setLoadingReviews(true);
    setFetchError(null);

    try {
      const url = `${API_ENDPOINT}${API_ENDPOINT.includes('?') ? '&' : '?'}t=${Date.now()}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Reviews API response:", data);

      if (data && data.success && Array.isArray(data.reviews)) {
        const parsed = data.reviews.map((r: any, idx: number) => ({
          id: String(r.id || `REV-${idx}`),
          name: String(r.name || 'Valued Client'),
          rating: Number(r.rating) || 5,
          service: String(r.service || 'Taxation & Advisory'),
          review: String(r.review || ''),
          submittedAt: String(r.submittedAt || ''),
        }));

        setReviewsList(parsed);
        setCurrentIndex(0);
      } else {
        setReviewsList([]);
      }
    } catch (err: any) {
      console.error("Error loading reviews:", err);
      setFetchError(err.message || "Unable to load reviews");
    } finally {
      if (isInitial) setLoadingReviews(false);
    }
  };

  // Setup mount fetch and periodic 60-second auto-refresh
  useEffect(() => {
    loadApprovedReviews(true);

    const handleFocus = () => {
      loadApprovedReviews(false);
    };
    window.addEventListener('focus', handleFocus);

    const intervalId = setInterval(() => {
      loadApprovedReviews(false);
    }, 60000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(intervalId);
    };
  }, []);

  const nextTestimonial = () => {
    if (reviewsList.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % reviewsList.length);
  };

  const prevTestimonial = () => {
    if (reviewsList.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);
  };

  // Submit Review Handler
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewForm.fullName.trim()) {
      setSubmitStatus('error');
      setFeedbackMessage('Please enter your full name.');
      return;
    }
    if (!reviewForm.review.trim()) {
      setSubmitStatus('error');
      setFeedbackMessage('Please enter your review message.');
      return;
    }

    if (reviewForm.hp_field) {
      setSubmitStatus('success');
      setFeedbackMessage('Thank you for sharing your experience! Your review has been submitted for approval.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setFeedbackMessage('');

    try {
      const result = await submitClientReview({
        name: reviewForm.fullName.trim(),
        rating: reviewForm.rating,
        service: reviewForm.serviceUsed,
        review: reviewForm.review.trim(),
      });

      if (result.success) {
        setSubmitStatus('success');
        setFeedbackMessage(
          result.message || 'Thank you for sharing your experience! Your review has been submitted for approval.'
        );
        setReviewForm({
          fullName: '',
          rating: 5,
          serviceUsed: 'Taxation & GST',
          review: '',
          hp_field: '',
        });

        setTimeout(() => {
          setSubmitStatus('idle');
          setReviewModalOpen(false);
          loadApprovedReviews(false);
        }, 3000);
      } else {
        setSubmitStatus('error');
        setFeedbackMessage(
          result.error || 'We could not submit your review right now. Please try again later.'
        );
      }
    } catch (err) {
      console.error('Submit review error:', err);
      setSubmitStatus('error');
      setFeedbackMessage('We could not submit your review right now. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const current: TestimonialItem | undefined = reviewsList[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      {/* Background Radial Glow */}
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

        {/* Carousel / Card Showcase */}
        <div className="relative max-w-4xl mx-auto">
          {loadingReviews ? (
            /* Loading State */
            <div className="rounded-3xl bg-white border-2 border-[#D4AF37]/30 shadow-xl p-12 text-center space-y-4">
              <RefreshCw className="w-10 h-10 text-[#D4AF37] animate-spin mx-auto" />
              <div className="text-sm font-semibold text-[#580B14]">
                Loading approved reviews...
              </div>
            </div>
          ) : fetchError ? (
            /* Error State */
            <div className="rounded-3xl bg-white border-2 border-red-200 shadow-xl p-12 text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
              <h3 className="text-xl font-serif-luxury font-bold text-gray-800">
                Unable to load reviews right now
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Please check back in a few moments. You can still share your experience with us below.
              </p>
              <button
                onClick={() => setReviewModalOpen(true)}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gold-gradient text-[#36050B] font-bold text-xs shadow-md"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Share Your Experience</span>
              </button>
            </div>
          ) : reviewsList.length === 0 ? (
            /* Empty State */
            <div className="rounded-3xl bg-white border-2 border-[#D4AF37]/40 shadow-2xl p-12 text-center space-y-6">
              <Quote className="w-14 h-14 text-[#D4AF37] mx-auto opacity-40" />
              <h3 className="text-2xl font-serif-luxury font-bold text-[#580B14]">
                Client reviews will appear here soon.
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                Be the first to share your business growth story with Vitta Vidhi Advisors. Submitted reviews appear automatically after approval in Google Sheets.
              </p>
              <button
                onClick={() => {
                  setSubmitStatus('idle');
                  setFeedbackMessage('');
                  setReviewModalOpen(true);
                }}
                className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-gold-gradient text-[#36050B] font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all"
              >
                <MessageSquarePlus className="w-4 h-4 text-[#36050B]" />
                <span>Share Your Experience</span>
              </button>
            </div>
          ) : current ? (
            /* Approved Review Card - Guaranteed Visible */
            <div className="relative rounded-3xl bg-white border-2 border-[#D4AF37]/40 shadow-2xl p-8 sm:p-12 text-left transition-all duration-300">
              <Quote className="absolute top-6 right-8 w-16 h-16 text-[#D4AF37]/15 pointer-events-none" />

              <div className="space-y-6">
                {/* Star Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(Math.max(1, Math.min(5, Number(current.rating) || 5)))].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                  <span className="text-xs font-bold text-gray-500 ml-2">
                    ({current.service || 'Taxation & Advisory'})
                  </span>
                </div>

                {/* Review Message Text */}
                <p className="text-lg sm:text-xl text-gray-800 font-serif-luxury leading-relaxed italic">
                  "{current.review}"
                </p>

                {/* Author Info & Date */}
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="font-serif-luxury font-bold text-lg text-[#580B14]">
                      {current.name}
                    </div>
                    {current.submittedAt && (
                      <div className="text-xs text-gray-500 font-sans mt-0.5">
                        Submitted: {new Date(current.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    )}
                  </div>

                  {/* Carousel Index Counter */}
                  <div className="text-xs font-bold text-gray-400">
                    {currentIndex + 1} / {reviewsList.length}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Carousel Navigation */}
          {reviewsList.length > 1 && (
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white border border-[#D4AF37] text-[#580B14] hover:bg-[#580B14] hover:text-white transition-colors shadow-md"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => {
                  setSubmitStatus('idle');
                  setFeedbackMessage('');
                  setReviewModalOpen(true);
                }}
                className="inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-full bg-gold-gradient text-[#36050B] font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all"
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
          )}

          {reviewsList.length === 1 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => {
                  setSubmitStatus('idle');
                  setFeedbackMessage('');
                  setReviewModalOpen(true);
                }}
                className="inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-full bg-gold-gradient text-[#36050B] font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all"
              >
                <MessageSquarePlus className="w-4 h-4 text-[#36050B]" />
                <span>Share Your Experience</span>
              </button>
            </div>
          )}

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
                  Your feedback helps Vitta Vidhi Advisors build stronger services
                </p>
              </div>
              <button
                onClick={() => setReviewModalOpen(false)}
                disabled={isSubmitting}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
                aria-label="Close review modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitStatus === 'success' ? (
              /* Success State */
              <div className="py-8 text-center space-y-4 animate-fadeIn">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                <h4 className="text-2xl font-serif-luxury font-bold text-[#580B14]">
                  Thank you for sharing your experience!
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed max-w-sm mx-auto font-medium">
                  {feedbackMessage}
                </p>
                <p className="text-xs text-gray-500">
                  Once approved in Google Sheets by Vitta Vidhi Advisors, your review will appear automatically on the website.
                </p>
                <button
                  onClick={() => {
                    setSubmitStatus('idle');
                    setReviewModalOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-full bg-gold-gradient text-[#36050B] font-bold text-xs shadow-md"
                >
                  Close
                </button>
              </div>
            ) : (
              /* Review Input Form */
              <form onSubmit={handleSubmitReview} className="space-y-5 text-xs sm:text-sm">
                
                {submitStatus === 'error' && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2.5">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-sans">{feedbackMessage}</span>
                  </div>
                )}

                {/* Honeypot Spam Field */}
                <input
                  type="text"
                  name="hp_field"
                  value={reviewForm.hp_field}
                  onChange={(e) => setReviewForm({ ...reviewForm, hp_field: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Full Name */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={reviewForm.fullName}
                    onChange={(e) => setReviewForm({ ...reviewForm, fullName: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#580B14] text-gray-800 disabled:opacity-50"
                    placeholder="e.g. Rahul Sharma"
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
                          disabled={isSubmitting}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          className="p-1 focus:outline-none transform hover:scale-125 transition-transform disabled:opacity-50"
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

                {/* Service Used */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1.5">
                    Service Used *
                  </label>
                  <select
                    value={reviewForm.serviceUsed}
                    onChange={(e) => setReviewForm({ ...reviewForm, serviceUsed: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#580B14] text-gray-800 disabled:opacity-50"
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
                    maxLength={1500}
                    value={reviewForm.review}
                    onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#580B14] text-gray-800 disabled:opacity-50"
                    placeholder="Describe your experience with Vitta Vidhi Advisors..."
                  />
                </div>

                {/* Explanation Notice */}
                <p className="text-[11px] text-gray-500 italic bg-[#FAF8F5] p-2.5 rounded-lg border border-gray-200">
                  "Your review will be sent for approval before being displayed on our website."
                </p>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full bg-gold-gradient text-[#36050B] font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-[#36050B]" />
                        <span>Submitting your review...</span>
                      </span>
                    ) : (
                      <span>Submit Review</span>
                    )}
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
