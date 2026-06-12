import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Download, Mail } from 'lucide-react';
import HeroMeshBackground from '../components/HeroMeshBackground';
import SocialLinks from '../components/SocialLinks';
import { useTypingEffect } from '../hooks/useTypingEffect';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  const { displayedText, showCursor } = useTypingEffect({
    text: 'Full Stack Developer',
    speed: 100,
    deleteSpeed: 50,
    pauseDuration: 3000,
    restartDelay: 500,
  });

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({ delay: 0.3 });

    if (portraitRef.current) {
      tl.from(portraitRef.current, {
        opacity: 0,
        x: -80,
        duration: 1,
        ease: 'power3.out',
      });
    }

    if (contentRef.current) {
      const nameEl = contentRef.current.querySelector('.hero-name');
      const roleEl = contentRef.current.querySelector('.hero-role');
      const socialsEl = contentRef.current.querySelector('.hero-socials');
      const buttonsEl = contentRef.current.querySelector('.hero-buttons');

      if (nameEl) {
        tl.from(nameEl, {
          opacity: 0,
          x: 40,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.5');
      }

      if (roleEl) {
        tl.from(roleEl, {
          opacity: 0,
          x: 30,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.4');
      }

      if (socialsEl) {
        tl.from(socialsEl, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: 'power3.out',
        }, '-=0.2');
      }

      if (buttonsEl) {
        tl.from(buttonsEl, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: 'power3.out',
        }, '-=0.3');
      }
    }
  }, { scope: sectionRef });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <HeroMeshBackground />

      <div className="container-custom relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Portrait */}
          <div
            ref={portraitRef}
            className="w-full lg:w-[45%] flex justify-center lg:justify-start"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-full lg:h-[500px] xl:h-[550px] max-w-[420px]">
              <img
                src="/hero-portrait.jpg"
                alt="Developer Portrait"
                className="w-full h-full object-cover rounded-2xl lg:rounded-r-2xl lg:rounded-l-none"
                style={{
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                }}
              />
              <div
                className="absolute inset-0 rounded-2xl lg:rounded-r-2xl lg:rounded-l-none pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, transparent 60%, rgba(15,23,32,0.4) 100%)',
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className="w-full lg:w-[55%] text-center lg:text-left"
          >
            <h1
              className="hero-name text-4xl sm:text-5xl lg:text-[56px] font-bold mb-3"
              style={{ color: 'var(--accent)' }}
            >
              Jerone akash G
            </h1>
            <div className="hero-role text-xl sm:text-2xl text-white font-light mb-6 min-h-[36px]">
              {displayedText}
              <span
                className="inline-block w-[2px] h-[1em] bg-white ml-1 align-middle"
                style={{
                  opacity: showCursor ? 1 : 0,
                  transition: 'opacity 0.1s',
                }}
              />
            </div>

            <div className="hero-socials flex justify-center lg:justify-start mb-8">
              <SocialLinks />
            </div>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                className="flex items-center justify-center gap-2 px-7 py-3 rounded-md text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'var(--accent)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-hover)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)';
                }}
              >
                <Download size={16} />
                Download CV
              </button>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 px-7 py-3 rounded-md text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  border: '1px solid var(--accent)',
                  color: 'var(--accent)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0,200,122,0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                <Mail size={16} />
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
