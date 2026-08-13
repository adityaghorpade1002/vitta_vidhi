import type { TestimonialItem } from '../data/testimonialsData';

// Central configuration for Google Apps Script Web App API URL
export const REVIEWS_API_URL: string =
  (import.meta as any).env?.VITE_REVIEWS_API_URL || '';

export interface SubmitReviewPayload {
  name: string;
  rating: number;
  service: string;
  review: string;
  hp_field?: string; // Honeypot anti-spam
}

/**
 * Helper to construct anti-cached GET URL using timestamp
 */
const getCacheBustedUrl = (baseUrl: string): string => {
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}t=${Date.now()}`;
};

/**
 * Fetch ONLY approved reviews from Google Apps Script GET API
 */
export const fetchApprovedReviews = async (): Promise<TestimonialItem[]> => {
  if (!REVIEWS_API_URL || REVIEWS_API_URL.includes('YOUR_')) {
    console.warn('VITE_REVIEWS_API_URL is missing or unconfigured.');
    return [];
  }

  try {
    const fetchUrl = getCacheBustedUrl(REVIEWS_API_URL);

    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.success === true && Array.isArray(data.reviews)) {
      return data.reviews.map((r: any) => ({
        id: String(r.id || 'REV-' + Math.random()),
        name: String(r.name || 'Valued Client'),
        rating: typeof r.rating === 'number' ? r.rating : parseInt(r.rating, 10) || 5,
        service: String(r.service || 'Taxation & Advisory'),
        review: String(r.review || ''),
        submittedAt: String(r.submittedAt || ''),
      }));
    }

    return [];
  } catch (error) {
    console.error('Unable to fetch approved Google Sheets reviews:', error);
    return [];
  }
};

/**
 * Submit new client review to Google Apps Script POST API (Forces Status = Pending)
 */
export const submitClientReview = async (
  payload: SubmitReviewPayload
): Promise<{ success: boolean; message?: string; error?: string }> => {
  if (!REVIEWS_API_URL || REVIEWS_API_URL.includes('YOUR_')) {
    return {
      success: false,
      error:
        'VITE_REVIEWS_API_URL is not configured. Please add VITE_REVIEWS_API_URL to your environment settings.',
    };
  }

  try {
    const response = await fetch(REVIEWS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data && data.success) {
      return {
        success: true,
        message:
          data.message ||
          'Thank you for sharing your experience! Your review has been submitted for approval.',
      };
    } else {
      return {
        success: false,
        error: data.error || 'Review submission failed. Please try again later.',
      };
    }
  } catch (error) {
    console.error('Review submission fetch error:', error);
    return {
      success: false,
      error: 'We could not submit your review right now. Please try again later.',
    };
  }
};
