import { useState, useEffect } from 'react';
import Lenis from 'lenis';


import { LoadingScreen } from './components/LoadingScreen';
import { AnimatedBackgroundCanvas } from './components/AnimatedBackgroundCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QuickServicesOverview } from './components/QuickServicesOverview';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { DetailedServicesSection } from './components/DetailedServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { CallToActionSection } from './components/CallToActionSection';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { FinancialCalculatorModal } from './components/FinancialCalculatorModal';

export function App() {
  const [loading, setLoading] = useState(true);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [selectedServiceForForm, setSelectedServiceForForm] = useState<string>('Taxation & GST');

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleSelectServiceFromQuickOverview = (serviceId: string) => {
    const serviceNameMap: Record<string, string> = {
      'taxation-gst': 'Taxation & GST',
      'tds': 'TDS Compliance',
      'project-reporting': 'Project Reporting',
      'gst-registration': 'GST Registration',
      'startup-msme': 'Startup & MSME Registration',
    };
    if (serviceNameMap[serviceId]) {
      setSelectedServiceForForm(serviceNameMap[serviceId]);
    }
  };

  return (
    <div className="relative min-h-screen font-sans bg-[#FAF8F5] text-[#1E293B] overflow-x-hidden">
      {/* Luxury Loading Screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Subtle Animated Background Canvas */}
      <AnimatedBackgroundCanvas />

      {/* Main Layout Container */}
      <div className="relative z-10">
        
        {/* Sticky Header Navigation */}
        <Navbar onOpenCalculator={() => setCalculatorOpen(true)} />

        <main>
          {/* 1. Hero Section */}
          <HeroSection
            onExploreServices={() => {
              const el = document.querySelector('#services');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onContactUs={() => {
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 2. Quick Services Overview */}
          <QuickServicesOverview onSelectService={handleSelectServiceFromQuickOverview} />

          {/* 3. About Vitta Vidhi Advisors */}
          <AboutSection />

          {/* 4. Why Choose Us */}
          <WhyChooseUsSection />

          {/* 5. Detailed Interactive Services Spectrum */}
          <DetailedServicesSection
            onSelectServiceForForm={(serviceName) => setSelectedServiceForForm(serviceName)}
          />

          {/* 6. Process / How We Help */}
          <ProcessSection />

          {/* 7. Testimonials / Client Reviews */}
          <TestimonialsSection />

          {/* 8. Lead Generation Contact Section */}
          <ContactSection presetService={selectedServiceForForm} />

          {/* 9. Final Call To Action */}
          <CallToActionSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating WhatsApp Widget */}
        <WhatsAppWidget />

        {/* GST & Loan Calculator Utility Modal */}
        <FinancialCalculatorModal
          isOpen={calculatorOpen}
          onClose={() => setCalculatorOpen(false)}
        />

      </div>
    </div>
  );
}

export default App;
