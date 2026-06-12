import { Monitor, Code, TrendingUp } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import { useScrollEntrance } from '../hooks/useScrollEntrance';

const services = [
  {
    icon: Monitor,
    title: 'Web Design',
    description:
      'Creating beautiful, responsive websites with modern UI/UX principles. Pixel-perfect implementation with accessibility in mind.',
  },
  {
    icon: Code,
    title: 'Web Development',
    description:
      'Building robust web applications with clean, maintainable code. Full stack solutions from database to deployment.',
  },
  
  {
    icon: TrendingUp,
    title: 'SEO Optimization',
    description:
      'Improving search rankings through technical SEO, performance optimization, and content strategy. Data-driven results.',
  },
];

export default function ServicesSection() {
  const gridRef = useScrollEntrance<HTMLDivElement>({
    y: 40,
    duration: 0.8,
    stagger: 0.1,
    childSelector: '.service-card',
  });

  return (
    <section
      id="services"
      className="section-padding"
      style={{ backgroundColor: 'var(--bg-card-alt)' }}
    >
      <div className="container-custom">
        <SectionTitle title="Services" subtitle="What I can do for you." />

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <div key={service.title} className="service-card">
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
