import { useState, useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import SectionTitle from '../components/SectionTitle';
import PortfolioCard from '../components/PortfolioCard';

gsap.registerPlugin(ScrollTrigger, Flip);

type Category = 'All' | 'Web' | 'Design';

const portfolioItems = [
  {
    image: '/portfolio-ecommerce.jpg',
    title: 'E-Commerce Platform',
    category: 'Web' as const,
    link: '/project/grocery',
  },
  {
    image: 'skill_swap_cover_1781250495627.png',
    title: 'SkillSwap Hub',
    category: 'Web' as const,
    link: '/project/skillswap',
  },
  {
    image: 'portfolio_cover_1781250474764.png',
    title: 'Modern Developer Portfolio',
    category: 'Web' as const,
    link: '/project/portfolio',
  },
  
  

];

const categories: Category[] = ['All', 'Web', 'Design'];

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const handleFilter = useCallback(
    (category: Category) => {
      if (category === activeFilter || !gridRef.current) return;

      const cards = gridRef.current.querySelectorAll('.portfolio-item');
      const state = Flip.getState(cards);

      setActiveFilter(category);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          Flip.from(state, {
            duration: 0.4,
            ease: 'power2.inOut',
            absolute: true,
            onEnter: (elements) =>
              gsap.fromTo(
                elements,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.3 }
              ),
            onLeave: (elements) =>
              gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.3 }),
          });
        });
      });
    },
    [activeFilter]
  );

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.portfolio-item');
    gsap.from(cards, {
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="container-custom">
        <SectionTitle
          title="Portfolio"
          subtitle="Some of my recent work."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={
                activeFilter === cat
                  ? {
                      backgroundColor: 'var(--accent)',
                      color: '#fff',
                      border: '1px solid var(--accent)',
                    }
                  : {
                      backgroundColor: 'transparent',
                      color: '#8899AA',
                      border: '1px solid var(--border-color)',
                    }
              }
              onMouseEnter={(e) => {
                if (activeFilter !== cat) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                  (e.currentTarget as HTMLElement).style.color = '#fff';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== cat) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)';
                  (e.currentTarget as HTMLElement).style.color = '#8899AA';
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioItems.map((item) => {
            const isVisible =
              activeFilter === 'All' || item.category === activeFilter;
            return (
              <div
                key={item.title}
                className="portfolio-item"
                style={{
                  display: isVisible ? 'block' : 'none',
                }}
              >
                <PortfolioCard
                  image={item.image}
                  title={item.title}
                  category={item.category}
                  link={item.link}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
