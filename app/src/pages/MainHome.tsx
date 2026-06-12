import { useEffect } from 'react';
import { useLocation } from 'react-router';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import SkillsSection from '../sections/SkillsSection';
import ServicesSection from '../sections/ServicesSection';
import PortfolioSection from '../sections/PortfolioSection';
import ContactSection from '../sections/ContactSection';
import { getLenis } from '../hooks/useLenis';

export default function MainHome() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to section on load/navigation if hash exists
    if (location.hash) {
      const target = location.hash;
      const timer = setTimeout(() => {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(target, { offset: -70, duration: 1.2 });
        } else {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Scroll to top if no hash
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { duration: 0.5 });
      }
    }
  }, [location]);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
    </>
  );
}
