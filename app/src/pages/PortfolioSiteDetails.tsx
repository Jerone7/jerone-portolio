import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  Monitor,
  Smartphone,
  Tablet,
  Palette,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Layers,
  Layout,
  Github,
  Sparkles,
  GraduationCap,
  Eye,
  MousePointerClick,
  Globe,
  BookOpen
} from 'lucide-react';
import { getLenis } from '../hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

interface ScreenshotItem {
  id: string;
  title: string;
  desc: string;
  image: string;
  mockIcons: React.ReactNode;
}

export default function PortfolioSiteDetails() {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [selectedMock, setSelectedMock] = useState<ScreenshotItem | null>(null);

  const mockScreenshots: ScreenshotItem[] = [
    {
      id: 'screen-1',
      title: 'Hero Landing Section',
      desc: 'Eye-catching hero section with animated text, gradient backgrounds, and a professional call-to-action layout.',
      image: '/port home.png',
      mockIcons: <Eye className="text-[var(--accent)] w-12 h-12 mb-2 animate-pulse" />
    },
    {
      id: 'screen-2',
      title: 'About & Skills Overview',
      desc: 'Clean about section with skill progress bars, profile image, and organized professional summary.',
      image: '/about port.png',
      mockIcons: <BookOpen className="text-[var(--accent)] w-12 h-12 mb-2 animate-pulse" />
    },
    {
      id: 'screen-3',
      title: 'Services & Offerings',
      desc: 'Card-based services layout presenting web development, design, and consultation capabilities.',
      image: '/service port.png',
      mockIcons: <Layers className="text-[var(--accent)] w-12 h-12 mb-2 animate-pulse" />
    },
    {
      id: 'screen-4',
      title: 'Project Showcase Gallery',
      desc: 'Filterable portfolio grid with hover animations, project previews, and category-based navigation.',
      image: '/portfolio port.png',
      mockIcons: <Layout className="text-[var(--accent)] w-12 h-12 mb-2 animate-pulse" />
    },
    {
      id: 'screen-5',
      title: 'Contact & Footer',
      desc: 'Interactive contact form with validation, social links, and a polished footer design.',
      image: '/contact port.png',
      mockIcons: <Globe className="text-[var(--accent)] w-12 h-12 mb-2 animate-pulse" />
    },
  ];

  const technologies = [
    { name: 'HTML5', category: 'Structure', color: '#E34F26' },
    { name: 'CSS3', category: 'Styling', color: '#1572B6' },
    { name: 'Bootstrap 5', category: 'Framework', color: '#7952B3' },
    { name: 'JavaScript', category: 'Logic', color: '#F7DF1E' },
    { name: 'Responsive Design', category: 'Layout', color: '#06B6D4' },
  ];

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  useGSAP(() => {
    if (!pageRef.current) return;

    // Fade-in sections
    const sections = pageRef.current.querySelectorAll('.project-section');
    sections.forEach((sec) => {
      gsap.fromTo(
        sec,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Stats count-up
    if (statsRef.current) {
      const stats = statsRef.current.querySelectorAll('.stat-count');
      stats.forEach((el) => {
        const rawTarget = el.getAttribute('data-target') || '';
        const hasPlus = rawTarget.includes('+');
        const targetVal = parseInt(rawTarget.replace(/[^0-9]/g, ''), 10);

        if (!isNaN(targetVal)) {
          const proxy = { val: 0 };
          gsap.to(proxy, {
            val: targetVal,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            },
            onUpdate: () => {
              const formattedVal = Math.round(proxy.val);
              el.textContent = `${formattedVal}${hasPlus ? '+' : ''}`;
            }
          });
        }
      });
    }

    // Technology badges entrance
    const badges = pageRef.current.querySelectorAll('.tech-badge');
    gsap.from(badges, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      stagger: 0.05,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '#tech-stack-container',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

  }, { scope: pageRef });

  const goBack = () => {
    navigate('/#portfolio');
  };

  const glassStyle = {
    background: 'rgba(26, 37, 53, 0.4)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
  };

  const blackPanelStyle = {
    backgroundColor: '#000000',
    border: '1px solid rgba(0, 200, 122, 0.2)',
    boxShadow: '0 4px 20px rgba(0, 200, 122, 0.05)'
  };

  return (
    <div
      ref={pageRef}
      className="min-h-screen pt-20 pb-16 text-white overflow-hidden"
      style={{ backgroundColor: '#071426' }}
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-[250px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10"
          style={{
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)'
          }}
        />
        <div
          className="absolute top-[100px] left-[5%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-5"
          style={{
            background: 'radial-gradient(circle, #7952B3 0%, transparent 70%)'
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Floating Back Button */}
        <button
          onClick={goBack}
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-white/10 hover:border-[var(--accent)] hover:text-[var(--accent)] bg-[#101F33] hover:translate-x-[-4px]"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </button>

        {/* 1. HERO SECTION */}
        <section id="hero-showcase" className="project-section mb-16">
          <div className="p-8 md:p-12 rounded-2xl relative overflow-hidden" style={glassStyle}>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(0,200,122,0.1)] text-[var(--accent)] border border-[rgba(0,200,122,0.2)]">
                <Sparkles size={12} className="animate-pulse" />
                Frontend Development
              </div>

              <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mt-2 text-white max-w-[800px]">
                Modern Developer Portfolio: <span className="text-gradient">Professional showcase console</span>
              </h1>

              <p className="text-base md:text-lg text-[#8899AA] max-w-[750px] leading-relaxed mt-3">
                A modern and fully responsive portfolio website developed to showcase professional skills, projects, and services. The project focuses on clean UI/UX design, responsive layouts, smooth navigation, and interactive frontend elements built with core web technologies.
              </p>

              {/* Technologies summary */}
              <div className="flex flex-wrap gap-2 mt-4 max-w-[700px]">
                {technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className="text-xs px-3 py-1 rounded-md bg-[#101F33] border border-white/5 text-[#A0B0C0]"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href="https://jerone7.github.io/portfolio_template/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-all duration-300 shadow-md hover:-translate-y-0.5"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
                <a
                  href="https://github.com/Jerone7/portfolio_template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold text-[#8899AA] border border-white/10 hover:border-[var(--accent)] hover:text-white bg-[#101F33] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Github size={16} />
                  GitHub Repository
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROJECT OVERVIEW & STATS */}
        <section id="project-overview" className="project-section mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Project Overview</h2>
              <div className="h-[2px] w-16 bg-[var(--accent)] -mt-2 mb-4" />
              <p className="text-[#8899AA] leading-relaxed">
                This portfolio website serves as a professional digital resume, designed to make a strong first impression on recruiters and potential clients. Built entirely with vanilla frontend technologies — HTML5, CSS3, Bootstrap 5, and JavaScript — it demonstrates mastery of fundamental web development without relying on heavy frameworks.
              </p>
              <p className="text-[#8899AA] leading-relaxed">
                Every section is crafted with attention to visual hierarchy, whitespace balance, and interactive micro-animations. The responsive layout adapts seamlessly across desktops, tablets, and mobile devices, ensuring a consistent experience for every visitor regardless of their screen size.
              </p>
            </div>

            {/* Stats list */}
            <div ref={statsRef} className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                {
                  icon: <Monitor size={22} className="text-[var(--accent)]" />,
                  target: '7+',
                  label: 'Sections Built',
                  desc: 'Hero, About, Skills, Services, Portfolio, Contact, Footer.'
                },
                {
                  icon: <Smartphone size={22} className="text-[var(--accent)]" />,
                  target: '100%',
                  label: 'Responsive',
                  desc: 'Works on mobile, tablet, and desktop.'
                },
                {
                  icon: <Zap size={22} className="text-[var(--accent)]" />,
                  target: '95+',
                  label: 'Performance Score',
                  desc: 'Optimized load speed and rendering.'
                },
                {
                  icon: <Palette size={22} className="text-[var(--accent)]" />,
                  target: '5+',
                  label: 'Technologies',
                  desc: 'HTML5, CSS3, Bootstrap, JS, and more.'
                }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl flex flex-col justify-between"
                  style={glassStyle}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5">
                    {stat.icon}
                  </div>
                  <div className="mt-4">
                    <div
                      className="stat-count text-2xl md:text-3xl font-bold text-white tracking-tight"
                      data-target={stat.target}
                    >
                      0
                    </div>
                    <div className="text-sm font-semibold mt-1 text-[var(--accent)]">{stat.label}</div>
                    <div className="text-xs text-[#5A6B7D] mt-1 leading-snug">{stat.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 & 4. PROBLEM & SOLUTION */}
        <section id="problem-solution" className="project-section mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div className="p-6 md:p-8 rounded-xl" style={glassStyle}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <AlertTriangle className="text-purple-400" size={20} />
              </div>
              <h3 className="text-xl font-bold">The Problem</h3>
            </div>
            <p className="text-[#8899AA] leading-relaxed text-sm mb-4">
              Most developer portfolios rely on generic templates or heavy JavaScript frameworks that add unnecessary complexity. These template-based sites often look identical to thousands of others, failing to differentiate the developer in a competitive job market.
            </p>
            <p className="text-[#8899AA] leading-relaxed text-sm">
              Additionally, many portfolios sacrifice mobile responsiveness and performance for visual complexity, resulting in poor user experiences on smaller devices and slow load times that cause recruiters to bounce before viewing content.
            </p>
          </div>

          {/* Solution Card */}
          <div className="p-6 md:p-8 rounded-xl" style={glassStyle}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[rgba(0,200,122,0.1)] flex items-center justify-center">
                <CheckCircle2 className="text-[var(--accent)]" size={20} />
              </div>
              <h3 className="text-xl font-bold text-gradient">The Solution</h3>
            </div>
            <p className="text-[#8899AA] leading-relaxed text-sm mb-4">
              Built a custom portfolio from scratch using core web technologies, ensuring complete control over design, performance, and branding. Every component was hand-crafted to reflect a unique professional identity.
            </p>
            <p className="text-[#8899AA] leading-relaxed text-sm">
              Implemented a mobile-first responsive approach using Bootstrap 5 grid and custom CSS media queries. Combined smooth scroll behaviors, hover micro-animations, and carefully chosen typography to create an engaging yet fast-loading experience.
            </p>
          </div>
        </section>

        {/* 5. KEY FEATURES */}
        <section id="key-features" className="project-section mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">Key Features</h2>
          <div className="h-[2px] w-16 bg-[var(--accent)] mx-auto mt-2 mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Responsive Multi-Device Layout',
                desc: 'Fully adaptive design that renders perfectly on desktop, tablet, and mobile viewports using Bootstrap grid.'
              },
              {
                title: 'Smooth Scroll Navigation',
                desc: 'Single-page scroll experience with anchor-based navigation and smooth scrolling between sections.'
              },
              {
                title: 'Interactive Hover Effects',
                desc: 'Custom CSS transitions and animations on buttons, cards, and navigation elements for a polished feel.'
              },
              {
                title: 'Portfolio Filter Gallery',
                desc: 'Category-based project filtering with animated transitions to showcase different types of work.'
              },
              {
                title: 'Contact Form Integration',
                desc: 'Functional contact form with client-side validation and a clean, accessible form layout.'
              },
              {
                title: 'SEO-Optimized Structure',
                desc: 'Semantic HTML5 elements, proper meta tags, heading hierarchy, and alt attributes for search visibility.'
              },
              {
                title: 'Custom CSS Animations',
                desc: 'Keyframe animations, gradient transitions, and scroll-triggered effects built with vanilla CSS.'
              },
              {
                title: 'Cross-Browser Compatibility',
                desc: 'Tested across Chrome, Firefox, Safari, and Edge to ensure consistent rendering and behavior.'
              },
              {
                title: 'Optimized Performance',
                desc: 'Minified assets, optimized images, and lazy-loaded resources for fast initial page load times.'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-xl hover:translate-y-[-4px] transition-all duration-300 group border border-white/5 hover:border-[var(--accent)]/30"
                style={glassStyle}
              >
                <div className="flex items-center gap-2 text-[var(--accent)] font-semibold text-base mb-2">
                  <CheckCircle2 size={16} />
                  {feature.title}
                </div>
                <p className="text-xs text-[#8899AA] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. TECHNOLOGY STACK */}
        <section id="tech-stack" className="project-section mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Technology Stack</h2>
          <div className="h-[2px] w-16 bg-[var(--accent)] -mt-2 mb-8" />

          <div id="tech-stack-container" className="flex flex-wrap gap-3">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="tech-badge flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 border border-white/5"
                style={{
                  backgroundColor: 'rgba(16, 31, 51, 0.6)',
                  boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = tech.color;
                  e.currentTarget.style.boxShadow = `0 4px 20px -5px ${tech.color}44`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tech.color }} />
                <span className="text-[#D0D9E0]">{tech.name}</span>
                <span className="text-[10px] text-[#5A6B7D] uppercase tracking-wider ml-1 bg-black/25 px-1.5 py-0.5 rounded">
                  {tech.category}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 7. RESPONSIVE DESIGN SHOWCASE */}
        <section id="responsive-showcase" className="project-section mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">Responsive Design Showcase</h2>
          <div className="h-[2px] w-16 bg-[var(--accent)] mx-auto mt-2 mb-10" />

          <div className="p-6 md:p-10 rounded-2xl" style={glassStyle}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Desktop */}
              <div className="text-center space-y-4 group">
                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mx-auto group-hover:bg-[rgba(0,200,122,0.1)] transition-colors duration-300">
                  <Monitor size={28} className="text-[var(--accent)]" />
                </div>
                <h4 className="font-semibold text-white text-base">Desktop View</h4>
                <p className="text-xs text-[#8899AA] leading-relaxed max-w-[260px] mx-auto">
                  Full-width layout with multi-column grids, expanded navigation bar, and detailed content sections optimized for large screens.
                </p>
                <div className="text-[9px] text-[#5A6B7D] uppercase tracking-wider font-semibold bg-black/40 px-3 py-1 rounded inline-block">
                  1200px+ viewport
                </div>
              </div>

              {/* Tablet */}
              <div className="text-center space-y-4 group">
                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mx-auto group-hover:bg-[rgba(0,200,122,0.1)] transition-colors duration-300">
                  <Tablet size={28} className="text-[var(--accent)]" />
                </div>
                <h4 className="font-semibold text-white text-base">Tablet View</h4>
                <p className="text-xs text-[#8899AA] leading-relaxed max-w-[260px] mx-auto">
                  Adaptive two-column layouts with reorganized cards, collapsible navigation, and touch-friendly interaction areas.
                </p>
                <div className="text-[9px] text-[#5A6B7D] uppercase tracking-wider font-semibold bg-black/40 px-3 py-1 rounded inline-block">
                  768px – 1199px
                </div>
              </div>

              {/* Mobile */}
              <div className="text-center space-y-4 group">
                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mx-auto group-hover:bg-[rgba(0,200,122,0.1)] transition-colors duration-300">
                  <Smartphone size={28} className="text-[var(--accent)]" />
                </div>
                <h4 className="font-semibold text-white text-base">Mobile View</h4>
                <p className="text-xs text-[#8899AA] leading-relaxed max-w-[260px] mx-auto">
                  Single-column stacked layout with hamburger navigation, optimized touch targets, and condensed content for small screens.
                </p>
                <div className="text-[9px] text-[#5A6B7D] uppercase tracking-wider font-semibold bg-black/40 px-3 py-1 rounded inline-block">
                  Below 768px
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SCREENSHOTS GALLERY */}
        <section id="screenshots-gallery" className="project-section mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">Interface Explorations</h2>
          <div className="h-[2px] w-16 bg-[var(--accent)] mx-auto mt-2 mb-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockScreenshots.map((screen) => (
              <div
                key={screen.id}
                onClick={() => setSelectedMock(screen)}
                className="group cursor-pointer rounded-xl overflow-hidden relative aspect-[16/10] border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,200,122,0.15)]"
                style={blackPanelStyle}
              >
                {/* Show image if available, otherwise show icon placeholder */}
                {screen.image ? (
                  <img
                    src={screen.image}
                    alt={screen.title}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#071426]/60 flex items-center justify-center">
                    {screen.mockIcons}
                  </div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Title overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-white font-semibold text-sm md:text-base group-hover:text-[var(--accent)] transition-colors duration-300">
                    {screen.title}
                  </h4>
                  <p className="text-[10px] md:text-xs text-[#8899AA] mt-1 max-w-[280px] leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {screen.desc}
                  </p>
                </div>

                {/* Badge */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur px-2.5 py-1 rounded text-[9px] text-white/50 border border-white/10 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors duration-200 z-10">
                  {screen.image ? 'Screenshot' : 'Placeholder'}
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedMock && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 transition-all duration-300"
              onClick={() => setSelectedMock(null)}
            >
              <div
                className="relative max-w-4xl w-full rounded-2xl overflow-hidden border border-[var(--accent)]/30 flex flex-col shadow-[0_0_50px_-12px_rgba(0,200,122,0.2)]"
                style={{ backgroundColor: '#000000' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image or placeholder */}
                <div className="relative w-full max-h-[75vh] overflow-hidden flex items-center justify-center min-h-[300px]">
                  {selectedMock.image ? (
                    <img
                      src={selectedMock.image}
                      alt={selectedMock.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-16">
                      {selectedMock.mockIcons}
                      <div className="text-[10px] text-[#5A6B7D] uppercase tracking-wider font-semibold bg-white/5 px-3 py-1 rounded border border-white/5">
                        Screenshot will be added here
                      </div>
                    </div>
                  )}
                </div>

                {/* Caption bar */}
                <div className="p-5 border-t border-white/5 bg-[#0a0a0a]">
                  <h3 className="text-lg font-bold text-white mb-1">{selectedMock.title}</h3>
                  <p className="text-sm text-[#8899AA] leading-relaxed">{selectedMock.desc}</p>
                </div>

                <button
                  className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white rounded-full p-2.5 transition-colors duration-200 border border-white/10 hover:border-[var(--accent)] z-20"
                  onClick={() => setSelectedMock(null)}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </section>

        {/* 9. CHALLENGES & SOLUTIONS */}
        <section id="challenges" className="project-section mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Technical Challenges & Solutions</h2>
          <div className="h-[2px] w-16 bg-[var(--accent)] -mt-2 mb-8" />

          <div className="space-y-6">
            <div className="p-6 rounded-xl relative overflow-hidden" style={glassStyle}>
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-500/10 text-yellow-400">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white mb-2">
                    Challenge 1: Consistent Cross-Browser Rendering
                  </h4>
                  <p className="text-xs text-[#8899AA] leading-relaxed mb-3">
                    CSS properties like flexbox gaps, custom properties, and backdrop-filter rendered differently across Chrome, Firefox, and Safari. Gradient overlays and blur effects failed entirely in older Safari versions.
                  </p>
                  <div className="border-t border-white/5 pt-3 mt-3 flex items-start gap-2">
                    <span className="text-[10px] font-bold uppercase text-[var(--accent)] tracking-wide bg-[rgba(0,200,122,0.1)] px-2 py-0.5 rounded flex-shrink-0">
                      Solution
                    </span>
                    <p className="text-xs text-[#A0B0C0] leading-relaxed">
                      Implemented vendor-prefixed fallbacks (-webkit-backdrop-filter), replaced unsupported gap properties with margin-based spacing, and added feature detection queries. Tested systematically across all major browsers using BrowserStack.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl relative overflow-hidden" style={glassStyle}>
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-500/10 text-yellow-400">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white mb-2">
                    Challenge 2: Responsive Layout Breakpoint Conflicts
                  </h4>
                  <p className="text-xs text-[#8899AA] leading-relaxed mb-3">
                    Bootstrap's default grid breakpoints caused overlapping content at certain viewport widths (especially between 576px and 768px). Navigation menus and card layouts broke at intermediate sizes.
                  </p>
                  <div className="border-t border-white/5 pt-3 mt-3 flex items-start gap-2">
                    <span className="text-[10px] font-bold uppercase text-[var(--accent)] tracking-wide bg-[rgba(0,200,122,0.1)] px-2 py-0.5 rounded flex-shrink-0">
                      Solution
                    </span>
                    <p className="text-xs text-[#A0B0C0] leading-relaxed">
                      Added custom media query breakpoints alongside Bootstrap's grid. Implemented a mobile-first approach with progressive enhancement, using min-width queries to add complexity at larger viewports instead of stripping it at smaller ones.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl relative overflow-hidden" style={glassStyle}>
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-500/10 text-yellow-400">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white mb-2">
                    Challenge 3: Performance Optimization Without Build Tools
                  </h4>
                  <p className="text-xs text-[#8899AA] leading-relaxed mb-3">
                    Without bundlers like Webpack or Vite, managing multiple CSS files, unoptimized images, and render-blocking scripts led to slower initial page loads and poor Lighthouse scores.
                  </p>
                  <div className="border-t border-white/5 pt-3 mt-3 flex items-start gap-2">
                    <span className="text-[10px] font-bold uppercase text-[var(--accent)] tracking-wide bg-[rgba(0,200,122,0.1)] px-2 py-0.5 rounded flex-shrink-0">
                      Solution
                    </span>
                    <p className="text-xs text-[#A0B0C0] leading-relaxed">
                      Manually minified CSS and JS files, compressed images using WebP format, deferred non-critical scripts with async/defer attributes, and consolidated stylesheets to reduce HTTP requests. Achieved 95+ Lighthouse performance score.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. LEARNING OUTCOMES */}
        <section id="learning-outcomes" className="project-section mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">Learning Outcomes</h2>
          <div className="h-[2px] w-16 bg-[var(--accent)] mx-auto mt-2 mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Code2 size={20} className="text-[var(--accent)]" />,
                title: 'Semantic HTML Mastery',
                desc: 'Gained deep understanding of HTML5 semantic elements, accessibility attributes, and proper document structure for SEO optimization.'
              },
              {
                icon: <Palette size={20} className="text-[var(--accent)]" />,
                title: 'Advanced CSS Techniques',
                desc: 'Mastered CSS Grid, Flexbox, custom properties, keyframe animations, and gradient compositions for modern UI design.'
              },
              {
                icon: <MousePointerClick size={20} className="text-[var(--accent)]" />,
                title: 'JavaScript DOM Manipulation',
                desc: 'Built interactive components using vanilla JavaScript — scroll handling, form validation, and dynamic content toggling without frameworks.'
              },
              {
                icon: <GraduationCap size={20} className="text-[var(--accent)]" />,
                title: 'Design Thinking & UX',
                desc: 'Developed an eye for visual hierarchy, typography pairing, color theory, and user-centric layout decisions that improve engagement.'
              }
            ].map((outcome, i) => (
              <div
                key={i}
                className="p-6 rounded-xl flex items-start gap-4 hover:translate-y-[-2px] transition-all duration-300 border border-white/5 hover:border-[var(--accent)]/20"
                style={glassStyle}
              >
                <div className="w-10 h-10 rounded-lg bg-[rgba(0,200,122,0.1)] flex items-center justify-center flex-shrink-0">
                  {outcome.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">{outcome.title}</h4>
                  <p className="text-xs text-[#8899AA] leading-relaxed">{outcome.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 11. RESULTS & IMPACT */}
        <section id="results" className="project-section mb-16">
          <div className="p-8 rounded-2xl" style={glassStyle}>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Results & Impact</h2>
            <div className="h-[2px] w-16 bg-[var(--accent)] mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-[#101F33]/40 rounded-xl border border-white/5">
                <div className="text-3xl font-bold text-[var(--accent)]">95+</div>
                <div className="text-xs text-white font-medium mt-1">Lighthouse Score</div>
                <p className="text-[10px] text-[#8899AA] mt-2 leading-relaxed">
                  Optimized assets, semantic HTML, and efficient CSS deliver top-tier performance metrics.
                </p>
              </div>

              <div className="p-4 bg-[#101F33]/40 rounded-xl border border-white/5">
                <div className="text-3xl font-bold text-[var(--accent)]">100%</div>
                <div className="text-xs text-white font-medium mt-1">Responsive Coverage</div>
                <p className="text-[10px] text-[#8899AA] mt-2 leading-relaxed">
                  Pixel-perfect rendering across all major breakpoints from 320px to 2560px screens.
                </p>
              </div>

              <div className="p-4 bg-[#101F33]/40 rounded-xl border border-white/5">
                <div className="text-3xl font-bold text-[var(--accent)]">&lt;2s</div>
                <div className="text-xs text-white font-medium mt-1">Page Load Time</div>
                <p className="text-[10px] text-[#8899AA] mt-2 leading-relaxed">
                  Fast initial render through optimized images, deferred scripts, and minimal HTTP requests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 12. FOOTER CTA */}
        <section id="footer-actions" className="project-section text-center py-8">
          <div className="p-8 md:p-12 rounded-2xl relative overflow-hidden" style={glassStyle}>
            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <h3 className="text-xl md:text-2xl font-bold">Explore This Portfolio</h3>
              <p className="text-xs md:text-sm text-[#8899AA] leading-relaxed">
                Visit the live demo or review the source code on GitHub.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a
                  href="https://jerone7.github.io/portfolio_template/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-md text-sm font-semibold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-all duration-300 shadow-md hover:-translate-y-0.5"
                >
                  <ExternalLink size={16} />
                  Launch Live Demo
                </a>
                <a
                  href="https://github.com/Jerone7/portfolio_template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-md text-sm font-semibold text-[#8899AA] border border-white/10 hover:border-[var(--accent)] hover:text-white bg-[#101F33] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Github size={16} />
                  Explore Source Code
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
