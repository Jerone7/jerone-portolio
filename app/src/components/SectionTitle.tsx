import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({ title, subtitle, className = '' }: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(ref.current.querySelector('.section-title-heading'), {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
    })
      .from(
        ref.current.querySelector('.section-title-underline'),
        {
          width: 0,
          duration: 0.5,
          ease: 'power3.out',
        },
        '-=0.3'
      )
      .from(
        ref.current.querySelector('.section-title-subtitle'),
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: 'power3.out',
        },
        '-=0.2'
      );
  }, { scope: ref });

  return (
    <div ref={ref} className={`mb-12 ${className}`}>
      <h2 className="section-title-heading text-2xl md:text-3xl lg:text-[32px] font-semibold text-white">
        {title}
      </h2>
      <div
        className="section-title-underline h-[3px] mt-3"
        style={{ width: 50, backgroundColor: 'var(--accent)' }}
      />
      {subtitle && (
        <p className="section-title-subtitle mt-4 text-base text-[#8899AA] max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
