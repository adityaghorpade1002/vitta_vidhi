export interface ServiceSubItem {
  name: string;
  desc?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  badge: string;
  iconName: string;
  shortDescription: string;
  fullDescription: string;
  subItems: ServiceSubItem[];
  benefits: string[];
}

export interface ValueCard {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
}

export interface ProcessStep {
  step: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  comment: string;
  rating: number;
  serviceCategory: string;
}

export const SITE_CONFIG = {
  brandName: "VITTA VIDHI ADVISORS",
  shortName: "Vitta Vidhi",
  tagline: "Tax | Compliance | Business Advisory",
  heroTitle: "We are LAUNCHED!",
  heroSubtitle: "Everything Your Business Needs. Under One Roof.",
  heroDescription: "Vitta Vidhi Advisors is a professional advisory firm dedicated to simplifying financial and business complexities and helping you build a stronger foundation for growth.",
  
  contact: {
    phone: "9307479801",
    phoneFormatted: "+91 9307479801",
    email: "vittavidhi@gmail.com",
    address: "Vitta Vidhi Advisors, 4th Floor, Premium Commerce Hub, Shivaji Nagar, Pune, Maharashtra - 411005",
    workingHours: "Mon - Sat: 9:30 AM - 7:00 PM IST",
    whatsappNumber: "919307479801",
    whatsappDefaultMessage: "Hello Vitta Vidhi Advisors, I would like to know more about your services.",
    // Web3Forms Access Key configured via environment variable
    web3FormsAccessKey: "", 
  },


  socials: {
    linkedin: "https://www.linkedin.com/in/vitta-vidhi-advisors-27b304426",
    instagram: "https://www.instagram.com/vittavidhi_advisors",
    instagramHandle: "@vittavidhi_advisors",
  },

  stats: [
    { label: "Client Satisfaction Rate", value: "99.4%" },
    { label: "Returns & Compliances Filed", value: "1,500+" },
    { label: "Financial Reports Prepared", value: "450+" },
    { label: "Client Retainership", value: "100%" },
  ]
};

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: "taxation-gst",
    title: "Taxation & GST",
    badge: "Direct & Indirect Tax",
    iconName: "ReceiptPercent",
    shortDescription: "End-to-end Income Tax filing, Tax Planning, TDS/TCS, GST Registrations & Returns for individuals and enterprises.",
    fullDescription: "Navigate Indian direct and indirect tax laws with complete confidence. Our experts optimize your tax liabilities while ensuring seamless filing and compliance before mandatory deadlines.",
    subItems: [
      { name: "Income Tax Return (ITR) Filing", desc: "For Salaried, Self-employed, HUF, Partnership, LLP & Private Limited Companies" },
      { name: "Advance Tax Computation & Filing", desc: "Quarterly calculation and timely payment setup to avoid Section 234C interest penalties" },
      { name: "Tax Computation & Strategic Tax Planning", desc: "Legal tax savings under Chapter VI-A, capital gains planning, and asset restructuring" },
      { name: "TDS/TCS Compliance & Quarterly Returns", desc: "Comprehensive withholding tax deduction management, challan creation, and Form 26Q/27Q" },
      { name: "GST Registration & Amendment", desc: "Fresh GSTIN application, core field amendments, and LUT filing for exports" },
      { name: "GST Return Filing (GSTR-1, 3B, 9 & 9C)", desc: "Monthly, quarterly, and annual reconciliation with GSTR-2B ITC verification" },
      { name: "GST Compliance & Advisory", desc: "Notice resolution, audit assistance, classification under HSN/SAC codes, and refund claims" },
      { name: "GST Documentation & Legal Support", desc: "Maintain statutory registers, e-way bills, and e-invoicing compliance" }
    ],
    benefits: [
      "Zero Penalty Assurance through proactive reminders",
      "Maximization of eligible Input Tax Credit (ITC)",
      "Dedicated Tax Specialist for your account",
      "Confidential & Audit-ready document archives"
    ]
  },
  {
    id: "tds",
    title: "TDS Compliance & Advisory",
    badge: "Withholding Tax Specialist",
    iconName: "FileCheck2",
    shortDescription: "Comprehensive TDS computation, return filing, certificate generation (Form 16/16A), and notice resolution.",
    fullDescription: "Avoid costly withholding tax defaults, interest penalties, and disallowances under Section 40(a)(ia). We handle the complete lifecycle of TDS/TCS obligations.",
    subItems: [
      { name: "TDS Return Filing", desc: "Form 24Q (Salary), Form 26Q (Non-Salary), Form 27Q (NRIs), Form 27EQ (TCS)" },
      { name: "TDS Computation & Challan Payment", desc: "Accurate monthly tax deduction checks across contractor, rent, professional fee payments" },
      { name: "TDS Certificates (Form 16 & 16A)", desc: "Bulk download and automated generation of digitally signed TRACES certificates" },
      { name: "TDS Compliance & Documentation", desc: "Correction statements, pan verification, and lower deduction certificate (Form 13) applications" },
      { name: "TDS Advisory & Legal Support", desc: "Expert guidance on international remittance TDS (Form 15CA/15CB) and income tax notices" }
    ],
    benefits: [
      "Timely 7th of every month payment tracking",
      "Error-free TRACES reconciliation",
      "Form 15CA/15CB assistance for foreign payments",
      "Fast demand resolution for short deductions"
    ]
  },
  {
    id: "project-reporting",
    title: "Project Reporting & Financial Modeling",
    badge: "Bank Loan & Funding",
    iconName: "TrendingUp",
    shortDescription: "Bank-ready Project Reports, CMA Data, Projected P&L, Balance Sheets, and Cash/Fund Flow analysis for business financing.",
    fullDescription: "Securing bank credit or investor capital requires flawless financial projections. We build investor-grade Project Reports and Credit Monitoring Arrangement (CMA) data.",
    subItems: [
      { name: "Business Project Reports", desc: "Comprehensive feasibility studies, executive summaries, and market potential reports" },
      { name: "Bank Loan Project Reports", desc: "Structured detailed project reports (DPR) tailored for nationalized & private bank loan approvals" },
      { name: "CMA Data Preparation", desc: "Complete 5-year Credit Monitoring Arrangement data for working capital & term loan sanction" },
      { name: "CMA Reports & Ratio Analysis", desc: "Detailed Debt Equity, DSCR, Current Ratio, Break-Even & IRR analysis" },
      { name: "Projected Profit & Loss Statements", desc: "Realistic revenue forecasting and operating margin modeling" },
      { name: "Projected Balance Sheets", desc: "Asset-liability projection reflecting expansion capital structures" },
      { name: "Cash Flow Projections", desc: "Granular cash inflows/outflows forecasting to prove debt serviceability" },
      { name: "Fund Flow Projections", desc: "Long-term working capital assessment and sources/uses of funds" },
      { name: "Financial Projections for Term & MSME Loans", desc: "Tailored documentation for Mudra, CGTMSE, and Machinery Loan schemes" }
    ],
    benefits: [
      "Higher Approval Rate with Commercial Bank Standards",
      "DSCR and Working Capital Ratio Optimization",
      "Direct Coordination with Bank Credit Managers",
      "Fast Turnaround (24-48 Hours Emergency Processing available)"
    ]
  },
  {
    id: "gst-registration",
    title: "GST Registration & Setup",
    badge: "Business Identity",
    iconName: "ShieldCheck",
    shortDescription: "Hassle-free new GST registration, documentation validation, application tracking, and procedural guidance.",
    fullDescription: "Start your business operations legally with instant GSTIN procurement. We guide you through physical verification requirements, principal place of business setup, and trade names.",
    subItems: [
      { name: "New GST Registration", desc: "For Proprietorship, Partnership, Private Limited, OPC, LLP & E-Commerce Sellers" },
      { name: "GST Registration Documentation", desc: "Verification of rental agreements, electricity bills, NOC, and identity proofs" },
      { name: "Registration Application Support", desc: "ARN generation, query response to GST officers, and site visit clearance support" },
      { name: "GST Procedural Assistance", desc: "Composition scheme opt-in/opt-out, multi-state registration, and core field edits" }
    ],
    benefits: [
      "100% Online process without office visits",
      "Instant query resolution within 24 hours",
      "Guidance on correct HSN code selection",
      "Free initial consultation on GST return cadence"
    ]
  },
  {
    id: "startup-msme",
    title: "Startup & MSME Registration",
    badge: "Government Subsidies",
    iconName: "Rocket",
    shortDescription: "Startup India DPIIT recognition, MSME/Udyam Certificate, subsidies, tender privileges, and compliance setup.",
    fullDescription: "Unlock government incentives, tax exemptions under Section 80-IAC, patent fee rebates, and collateral-free bank loan access with official MSME and Startup India recognitions.",
    subItems: [
      { name: "Startup India (DPIIT) Registration", desc: "Official recognition certificate for tax holiday benefits and self-certification compliance" },
      { name: "MSME / Udyam Registration", desc: "Instant Udyam Registration for Micro, Small & Medium Enterprises" },
      { name: "Business Registration Documentation", desc: "MoA/AoA drafting support, partnership deed drafting, and resolution templates" },
      { name: "Registration Process Support", desc: "Step-by-step handholding for initial legal entity setup" },
      { name: "Guidance on Applicable Registrations & Compliance", desc: "Mapping of Shops & Establishment, FSSAI, Professional Tax, and IEC requirements" }
    ],
    benefits: [
      "Access to Collateral-Free Government Loans (CGTMSE)",
      "Priority Sector Lending benefits from commercial banks",
      "80% discount on Patent filing fees for Startups",
      "Protection against delayed payments under MSMED Act"
    ]
  }
];

export const VALUE_CARDS: ValueCard[] = [
  {
    id: "integrity",
    title: "Integrity",
    tagline: "We uphold the highest standards.",
    description: "Ethical practices, strict confidentiality, and complete compliance accuracy are the foundation of everything we do.",
    iconName: "Shield"
  },
  {
    id: "expertise",
    title: "Expertise",
    tagline: "Knowledge that drives results.",
    description: "Deep domain proficiency in Indian tax laws, financial engineering, and statutory regulations to safeguard your business.",
    iconName: "Award"
  },
  {
    id: "commitment",
    title: "Commitment",
    tagline: "Dedicated to your success.",
    description: "Proactive communication, timely submissions, and personalized attention for seamless peace of mind.",
    iconName: "Clock"
  },
  {
    id: "growth",
    title: "Growth",
    tagline: "Empowering businesses, enabling growth.",
    description: "Strategic financial reporting and tax optimization that unlock working capital and power sustainable scale.",
    iconName: "TrendingUp"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "Step 1",
    number: "01",
    title: "Connect With Us",
    description: "Share your requirement with our expert advisory team via form, phone call, or WhatsApp.",
    iconName: "MessageSquarePhone"
  },
  {
    step: "Step 2",
    number: "02",
    title: "Understand Your Needs",
    description: "We analyze your business, financial, taxation, or compliance framework in detail.",
    iconName: "SearchCheck"
  },
  {
    step: "Step 3",
    number: "03",
    title: "Expert Guidance",
    description: "Receive customized legal solutions, precision documentation, and proactive advisory execution.",
    iconName: "Lightbulb"
  },
  {
    step: "Step 4",
    number: "04",
    title: "Move Forward With Confidence",
    description: "Build a stronger financial and business foundation equipped for long-term growth and compliance.",
    iconName: "CheckCircle2"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "1",
    name: "Rajesh K. Sharma",
    role: "Managing Director",
    company: "Apex Tech Engineering Pvt Ltd",
    location: "Pune",
    comment: "Vitta Vidhi Advisors transformed our tax and loan documentation. Their CMA Report preparation for our 3 Cr bank expansion loan was processed seamlessly by the bank credit team. Highly professional and dependable!",
    rating: 5,
    serviceCategory: "Project Reporting & Loans"
  },
  {
    id: "2",
    name: "Priya V. Deshmukh",
    role: "Founder & CEO",
    company: "Lumina Organics",
    location: "Mumbai",
    comment: "As a growing startup, getting our DPIIT recognition and GST registration done correctly was vital. Vitta Vidhi Advisors handled everything smoothly. Their team is extremely prompt and knowledgeable.",
    rating: 5,
    serviceCategory: "Startup & MSME Registration"
  },
  {
    id: "3",
    name: "Amitabh Mehta",
    role: "Partner",
    company: "Mehta & Sons Logistics",
    location: "PCMC, Pune",
    comment: "We used to face regular hassle with TDS reconciliations and GST ITC claims. Vitta Vidhi Advisors streamlined our entire tax compliance. Zero penalty guarantee and transparent advice!",
    rating: 5,
    serviceCategory: "Taxation & GST"
  },
  {
    id: "4",
    name: "Sunil R. Patil",
    role: "Proprietor",
    company: "Patil Industrial Tools",
    location: "Chakan",
    comment: "The team at Vitta Vidhi Advisors is top notch. They prepared our projected profit & loss and cash flow statements for our machinery purchase loan in less than 48 hours. Excellent service!",
    rating: 5,
    serviceCategory: "Project Reporting"
  }
];
