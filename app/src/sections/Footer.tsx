import { ChevronUp } from 'lucide-react';
import { getLenis } from '../hooks/useLenis';

export default function Footer() {
  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="py-6 relative"
      style={{
        backgroundColor: 'var(--bg-card-alt)',
        borderTop: '1px solid var(--border-color)',
      }}
    >
      <div className="container-custom flex items-center justify-between">
        <p className="text-sm text-[#5A6B7D]">
          &copy; 2026 Jeron Akash. All Rights Reserved.
        </p>

        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-0.5"
          style={{ backgroundColor: 'var(--accent)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-hover)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)';
          }}
          aria-label="Back to top"
        >
          <ChevronUp size={20} />
        </button>
      </div>
    </footer>
  );
}
