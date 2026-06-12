import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../components/SectionTitle';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Bio text animation
    const bioEl = sectionRef.current.querySelector('.about-bio');
    if (bioEl) {
      gsap.from(bioEl, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bioEl,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }

    // Stats count-up animation
    if (statsRef.current) {
      const statNumbers = statsRef.current.querySelectorAll('.stat-number');
      statNumbers.forEach((el) => {
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            (el as HTMLElement).textContent = `${Math.round(proxy.val)}+`;
          },
        });
      });
    }

    // Info card slide in
    if (infoRef.current) {
      gsap.from(infoRef.current, {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, { scope: sectionRef });

  const infoItems = [
    { label: 'Birthday', value: '21 October 2005' },
    { label: 'Phone', value: '+91 9342795642' },
    { label: 'City', value: 'Madurai, Tamil Nadu' },
    { label: 'Age', value: '21' },
    { label: 'Degree', value: 'Bachelor of Science in Information Technology ' },
    { label: 'Email', value: 'jeroneakash7@gmail.com' },
    
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="container-custom">
        <SectionTitle
          title="About Me"
          subtitle="Passionate about building scalable web applications and delivering exceptional user experiences."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Bio + Stats */}
          <div className="lg:col-span-3">
            <p className="about-bio text-base leading-relaxed text-[#8899AA] max-w-[600px] mb-10">
              I am a dedicated Full Stack Developer with expertise in modern web technologies.
              I specialize in building responsive, high-performance applications using React,
              Node.js, and cloud infrastructure. With a strong foundation in both frontend and
              backend development, I bring ideas to life through clean code and intuitive design.
            </p>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-4 max-w-[400px]"
            >
              {[
                { number: 4, label: 'Projects Completed' },
                { number: 10, label: 'Happy Clients' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center lg:text-left py-4"
                  style={{
                    borderRight: i < 1 ? '1px solid var(--border-color)' : 'none',
                  }}
                >
                  <div
                    className="stat-number text-3xl lg:text-4xl font-bold"
                    style={{ color: 'var(--accent)' }}
                    data-target={stat.number}
                  >
                    0+
                  </div>
                  <div className="text-sm text-[#8899AA] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Card */}
          <div ref={infoRef} className="lg:col-span-2">
            <div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: 'var(--bg-card)',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--border-color)',
              }}
            >
              {infoItems.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-start gap-4 py-3"
                  style={{
                    borderBottom:
                      i < infoItems.length - 1 ? '1px solid var(--border-color)' : 'none',
                  }}
                >
                  <span className="text-sm text-[#5A6B7D] font-medium shrink-0">{item.label}</span>
                  <span className="text-sm text-white text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
