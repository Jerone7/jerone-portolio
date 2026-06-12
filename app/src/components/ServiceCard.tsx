import type { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <div
      className="card-bg p-8 transition-all duration-300 hover:-translate-y-1 group"
      style={{
        border: '1px solid var(--border-color)',
      }}
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-colors duration-300"
        style={{ backgroundColor: 'rgba(0, 200, 122, 0.1)' }}
      >
        <Icon
          size={24}
          style={{ color: 'var(--accent)' }}
        />
      </div>
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <p className="text-sm leading-relaxed text-[#8899AA]">{description}</p>
    </div>
  );
}
