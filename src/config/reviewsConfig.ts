import type { TestimonialItem } from '../data/testimonialsData';

export const CONFIGURED_API_URL: string =
  (import.meta.env.VITE_REVIEWS_API_URL as string) || '';

export const REVIEWS_API_URL = CONFIGURED_API_URL;

export const getReviewsApiEndpoint = (): string => {
  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1');

  if (import.meta.env.DEV || isLocalhost) {
    return '/api/reviews';
  }

  return CONFIGURED_API_URL || '/api/reviews';
};

export interface SubmitReviewPayload {
  name: string;
  rating: number;
  service: string;
  review: string;
  hp_field?: string;
}

/**
 * Fetch approved reviews from Google Apps Script GET API (using proxy in dev)
 */
export const fetchApprovedReviews = async (): Promise<TestimonialItem[]> => {
  const API_ENDPOINT = getReviewsApiEndpoint();
  console.log('Reviews API Endpoint:', API_ENDPOINT);

  try {
    const separator = API_ENDPOINT.includes('?') ? '&' : '?';
    const url = `${API_ENDPOINT}${separator}t=${Date.now()}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Reviews API response:', data);

    if (data && data.success && Array.isArray(data.reviews)) {
      return data.reviews.map((r: any, idx: number) => ({
        id: String(r.id || `REV-${idx}`),
        name: String(r.name || 'Valued Client'),
        rating: Number(r.rating) || 5,
        service: String(r.service || 'Taxation & Advisory'),
        review: String(r.review || ''),
        submittedAt: String(r.submittedAt || ''),
      }));
    }

    return [];
  } catch (error) {
    console.error('Error fetching approved reviews:', error);
    return [];
  }
};

/**
 * Submit new client review to Google Apps Script POST API
 * Strictly returns success: true ONLY if Google Apps Script returns success: true
 */
export const submitClientReview = async (
  payload: SubmitReviewPayload
): Promise<{ success: boolean; message?: string; error?: string }> => {
  const API_ENDPOINT = getReviewsApiEndpoint();

  console.log('Submitting review:', {
    name: payload.name,
    rating: payload.rating,
    service: payload.service,
    review: payload.review,
  });

  try {
    const formData = new URLSearchParams();
    formData.append('name', payload.name);
    formData.append('rating', String(payload.rating));
    formData.append('service', payload.service);
    formData.append('review', payload.review);

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: formData,
    });

    console.log('POST response status:', response.status);

    if (!response.ok) {
      throw new Error(`Server returned HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('POST response data:', data);

    // Strictly check response.ok AND data.success === true
    if (data && data.success === true) {
      return {
        success: true,
        message:
          data.message ||
          'Thank you for sharing your experience! Your review has been submitted for approval.',
      };
    } else {
      return {
        success: false,
        error:
          data.error ||
          'We could not submit your review right now. Please try again later.',
      };
    }
  } catch (error: any) {
    console.error('Review submission error:', error);
    return {
      success: false,
      error:
        error.message ||
        'We could not submit your review right now. Please try again later.',
    };
  }
};
