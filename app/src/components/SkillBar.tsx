import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillBarProps {
  name: string;
  percentage: number;
  delay?: number;
}

export default function SkillBar({ name, percentage, delay = 0 }: SkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!fillRef.current || !barRef.current) return;

    gsap.fromTo(
      fillRef.current,
      { width: '0%' },
      {
        width: `${percentage}%`,
        duration: 1.2,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: barRef });

  return (
    <div ref={barRef} className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white">{name}</span>
        <span className="text-sm text-[#00C87A] font-medium">{percentage}%</span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--skill-bar-bg)' }}
      >
        <div
          ref={fillRef}
          className="h-full rounded-full"
          style={{
            backgroundColor: 'var(--accent)',
            width: '0%',
          }}
        />
      </div>
    </div>
  );
}
