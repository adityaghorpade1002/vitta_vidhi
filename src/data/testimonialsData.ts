export interface TestimonialItem {
  id: string;
  name: string;
  rating: number;
  service: string;
  review: string;
  company?: string;
  location?: string;
  isPlaceholder?: boolean;
}

/**
 * CENTRAL TESTIMONIALS DATA FILE
 * 
 * Only reviews listed in this file appear publicly on the website.
 * To add a new approved client review:
 * 1. Add a new object to the array below.
 * 2. Save the file.
 */
export const TESTIMONIALS_LIST: TestimonialItem[] = [
  {
    id: "1",
    name: "Rajesh K. Sharma",
    company: "Apex Tech Engineering Pvt Ltd",
    location: "Pune",
    rating: 5,
    service: "Project Reporting",
    review: "Vitta Vidhi Advisors transformed our tax and loan documentation. Their CMA Report preparation for our 3 Cr bank expansion loan was processed seamlessly by the bank credit team. Highly professional and dependable!"
  },
  {
    id: "2",
    name: "Priya V. Deshmukh",
    company: "Lumina Organics",
    location: "Mumbai",
    rating: 5,
    service: "Startup & MSME Registration",
    review: "As a growing startup, getting our DPIIT recognition and GST registration done correctly was vital. Vitta Vidhi Advisors handled everything smoothly. Their team is extremely prompt and knowledgeable."
  },
  {
    id: "3",
    name: "Amitabh Mehta",
    company: "Mehta & Sons Logistics",
    location: "PCMC, Pune",
    rating: 5,
    service: "Taxation & GST",
    review: "We used to face regular hassle with TDS reconciliations and GST ITC claims. Vitta Vidhi Advisors streamlined our entire tax compliance. Zero penalty guarantee and transparent advice!"
  },
  {
    id: "4",
    name: "Sunil R. Patil",
    company: "Patil Industrial Tools",
    location: "Chakan",
    rating: 5,
    service: "Project Reporting",
    review: "The team at Vitta Vidhi Advisors is top notch. They prepared our projected profit & loss and cash flow statements for our machinery purchase loan in less than 48 hours. Excellent service!"
  },
  {
    id: "placeholder-1",
    name: "Client Review Spot",
    company: "Your Business Here",
    location: "Maharashtra",
    rating: 5,
    service: "Business Advisory",
    review: "Share your business growth story with Vitta Vidhi Advisors! Click 'Share Your Experience' to send your review for approval.",
    isPlaceholder: true
  }
];
