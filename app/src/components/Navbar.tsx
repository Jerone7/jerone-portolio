import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { getLenis } from '../hooks/useLenis';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectPage = location.pathname.startsWith('/project');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    if (isProjectPage) {
      setActiveSection('');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isProjectPage]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (isProjectPage) {
      navigate('/' + href);
    } else {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(href, { offset: -70, duration: 1.2 });
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(15,23,32,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        }}
      >
        <div className="container-custom flex items-center justify-between h-16 md:h-[70px]">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="text-lg font-bold"
            style={{ color: 'var(--accent)' }}
          >
            Portfolio
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => {
              const isActive = activeSection === href;
              return (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(href);
                  }}
                  className="relative px-4 py-2 text-sm font-medium transition-colors duration-300"
                  style={{
                    color: isActive ? '#fff' : '#8899AA',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = '#fff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = '#8899AA';
                    }
                  }}
                >
                  {label}
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] transition-all duration-300"
                    style={{
                      width: isActive ? '60%' : '0%',
                      backgroundColor: 'var(--accent)',
                    }}
                  />
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-500"
        style={{
          backgroundColor: 'rgba(15,23,32,0.98)',
          backdropFilter: 'blur(10px)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(href);
              }}
              className="text-2xl font-medium transition-colors duration-300"
              style={{
                color: activeSection === href ? 'var(--accent)' : '#8899AA',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
