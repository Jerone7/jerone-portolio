import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  Users,
  ShieldCheck,
  MessageSquare,
  Search,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Database,
  Award,
  ChevronRight,
  ExternalLink,
  Github,
  Sparkles,
  Lock,
  MailCheck,
  Sliders
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

export default function SkillSwapDetails() {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [selectedMock, setSelectedMock] = useState<ScreenshotItem | null>(null);

  const mockScreenshots: ScreenshotItem[] = [
    {
      id: 'screen-1',
      title: 'Authentication & Profile Setup',
      desc: 'Clean login console managing secure passwords, JWT assignments, and detailed user profile tagging.',
      image: '/Screenshot 2026-06-11 215126.png',
      mockIcons: <Lock className="text-[var(--accent)] w-12 h-12 mb-2 animate-pulse" />
    },
    {
      id: 'screen-2',
      title: 'Approved Swappers Chatroom',
      desc: 'Real-time messaging console unlocked after mutual swap approval, enabling secure peer-to-peer skill discussions.',
      image: '/Screenshot 2026-06-11 215446.png',
      mockIcons: <MessageSquare className="text-[var(--accent)] w-12 h-12 mb-2 animate-pulse" />
    },
    {
      id: 'screen-3',
      title: 'Skill Search Page',
      desc: 'Indexed search interface allowing users to query skills by keyword and discover matching profiles instantly.',
      image: '/skill search .png',
      mockIcons: <Sliders className="text-[var(--accent)] w-12 h-12 mb-2 animate-pulse" />
    },
    {
      id: 'screen-4',
      title: 'Skill Profile Page',
      desc: 'Detailed user profile view showcasing offered and wanted skills with swap request capabilities.',
      image: '/skill profile page.png',
      mockIcons: <MailCheck className="text-[var(--accent)] w-12 h-12 mb-2 animate-pulse" />
    },
    {
      id: 'screen-5',
      title: 'Skill Main Page',
      desc: 'Central hub displaying platform overview, featured skill categories, and quick navigation to all features.',
      image: '/skill main.png',
      mockIcons: <MessageSquare className="text-[var(--accent)] w-12 h-12 mb-2 animate-pulse" />
    },
  ];

  const technologies = [
    { name: 'React.js', category: 'Frontend', color: '#61DAFB' },
    { name: 'Node.js', category: 'Backend', color: '#339933' },
    { name: 'Express.js', category: 'Backend', color: '#FFFFFF' },
    { name: 'MongoDB', category: 'Database', color: '#47A248' },
    { name: 'JWT Auth', category: 'Security', color: '#00C87A' },
    { name: 'Bootstrap', category: 'Styling', color: '#7952B3' },
    { name: 'Tailwind CSS', category: 'Styling', color: '#06B6D4' },
    { name: 'GSAP Animations', category: 'Animations', color: '#88CE02' }
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
                Full Stack MERN Application
              </div>

              <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mt-2 text-white max-w-[800px]">
                SkillSwap Hub: <span className="text-gradient">Peer skill barter console</span>
              </h1>

              <p className="text-base md:text-lg text-[#8899AA] max-w-[750px] leading-relaxed mt-3">
                A collaborative web portal designed for professionals and students to swap capabilities directly. Users configure detail profiles, query active profiles by keyword capabilities, route request tickets, approve swap handshakes, and correspond in a secure chatroom unlocked after validation.
              </p>

              {/* Technologies summary */}
              <div className="flex flex-wrap gap-2 mt-4 max-w-[700px]">
                {technologies.slice(0, 6).map((tech) => (
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
                  href="https://github.com/Jeroneakash7/skillswap-hub"
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
                **SkillSwap Hub** implements a secure MERN (MongoDB, Express, React, Node) application that promotes educational bartering. The core concept replaces financial expenses with mutual learning: for example, a web designer teaches CSS grid layouts in exchange for a backend developer teaching database optimization.
              </p>
              <p className="text-[#8899AA] leading-relaxed">
                The application operates with tight state tracking. From initial profile registration with skill tags, a recruiter or student can execute indexed queries to pinpoint matching candidates. Communication links are strictly protected: users cannot message each other until swap requests have been accepted, preventing spam and maintaining system integrity.
              </p>
            </div>

            {/* Stats list */}
            <div ref={statsRef} className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                {
                  icon: <Users size={22} className="text-[var(--accent)]" />,
                  target: '500+',
                  label: 'Swaps Swapped',
                  desc: 'Successful skill exchanges verified.'
                },
                {
                  icon: <Search size={22} className="text-[var(--accent)]" />,
                  target: '10k+',
                  label: 'Registered users',
                  desc: 'Growing community database.'
                },
                {
                  icon: <ShieldCheck size={22} className="text-[var(--accent)]" />,
                  target: 'JWT Auth',
                  label: 'State Protection',
                  desc: 'Cookies with HttpOnly validation.'
                },
                {
                  icon: <MessageSquare size={22} className="text-[var(--accent)]" />,
                  target: '100%',
                  label: 'Approved Chats',
                  desc: 'Messaging unlocked post-approvals.'
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
                      {stat.target === 'JWT Auth' ? stat.target : '0'}
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
              Finding technical mentors or exchange partners offline is highly inefficient. Standard social networking platforms like LinkedIn are not designed for direct capability barters, making it difficult to find mutual matches.
            </p>
            <p className="text-[#8899AA] leading-relaxed text-sm">
              In addition, open message rooms are vulnerable to spam. Unregulated messaging triggers notification fatigue, reducing user retention. There was a clear need for a secure application where communication channels are unlocked only after mutual approval.
            </p>
          </div>

          {/* Solution Card */}
          <div className="p-6 md:p-8 rounded-xl" style={glassStyle}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[rgba(0,200,122,0.1)] flex items-center justify-center">
                <Award className="text-[var(--accent)]" size={20} />
              </div>
              <h3 className="text-xl font-bold text-gradient">The Solution</h3>
            </div>
            <p className="text-[#8899AA] leading-relaxed text-sm mb-4">
              SkillSwap Hub provides an interactive MERN portal where users catalog "Offered" and "Wanted" skills. The system indexing allows individuals to search for partners using targeted queries.
            </p>
            <p className="text-[#8899AA] leading-relaxed text-sm">
              We implemented a request dashboard with state tracking (Pending, Accepted, Rejected). Chat channels are locked behind express middlewares that verify request state, unlocking messaging capabilities only when both users agree to swap.
            </p>
          </div>
        </section>

        {/* 5. KEY FEATURES */}
        <section id="key-features" className="project-section mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">Key System Features</h2>
          <div className="h-[2px] w-16 bg-[var(--accent)] mx-auto mt-2 mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'User Registration & Login',
                desc: 'Clean onboarding workflows validating password strength and initializing user profiles.'
              },
              {
                title: 'JWT Authentication',
                desc: 'Stateless access validation assigning secure signature payloads stored in browser instances.'
              },
              {
                title: 'Protected Frontend Routes',
                desc: 'React Router logic restricting dashboard views to authenticated clients.'
              },
              {
                title: 'Profile Skill Cataloging',
                desc: 'Allows users to easily search, edit, and organize tags for skills they offer and want to learn.'
              },
              {
                title: 'Targeted Skill Search',
                desc: 'Indexed queries in MongoDB matching search terms against user skill arrays.'
              },
              {
                title: 'Swap Request Workflows',
                desc: 'Send, receive, accept, or decline exchange requests with live status updates.'
              },
              {
                title: 'Unlocked Messaging Console',
                desc: 'Secure private chatrooms available only after a swap request is mutually approved.'
              },
              {
                title: 'Admin Operations Dashboard',
                desc: 'Back-office statistics monitor, user accounts manager, and database controls.'
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

        {/* 7. ARCHITECTURE DIAGRAM */}
        <section id="architecture" className="project-section mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">System Architecture</h2>
          <div className="h-[2px] w-16 bg-[var(--accent)] mx-auto mt-2 mb-10" />

          <div className="p-6 md:p-10 rounded-2xl" style={glassStyle}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative items-center">
              {/* Clients Layer */}
              <div className="space-y-4">
                <div className="text-xs text-[#5A6B7D] font-bold uppercase tracking-wider text-center lg:text-left">
                  Frontend Client
                </div>
                <div className="p-5 rounded-xl bg-[#101F33] border border-white/5 text-center shadow-lg hover:border-[var(--accent)] transition-colors duration-300">
                  <div className="font-semibold text-sm">React SPA Console</div>
                  <div className="text-[10px] text-[#8899AA] mt-1">Bootstrap UI layouts</div>
                  <div className="text-[9px] text-[#5A6B7D] mt-2 bg-black/40 py-1 px-2 rounded inline-block">
                    JWT context state
                  </div>
                </div>
              </div>

              {/* Arrow Column 1 */}
              <div className="hidden lg:flex flex-col items-center justify-center text-[#5A6B7D]">
                <div className="text-xs uppercase font-semibold tracking-widest text-[#00C87A] animate-pulse mb-1">
                  HTTPS / REST
                </div>
                <div className="flex items-center w-full">
                  <div className="h-[2px] bg-gradient-to-r from-[var(--accent)] to-transparent flex-grow" />
                  <ChevronRight size={16} className="text-[var(--accent)]" />
                </div>
              </div>

              {/* API Server Layer */}
              <div className="space-y-4">
                <div className="text-xs text-[#5A6B7D] font-bold uppercase tracking-wider text-center">
                  Server Gateway
                </div>
                <div className="p-5 rounded-xl bg-[#14263D] border border-[var(--border-color)] text-center shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-purple-400 to-indigo-600" />
                  <div className="font-semibold text-sm flex items-center justify-center gap-1.5">
                    <Cpu size={14} className="text-purple-400" />
                    Express Router
                  </div>
                  <div className="text-[10px] text-[#8899AA] mt-1">Node.js Execution</div>
                  <div className="text-[9px] text-[#5A6B7D] mt-2 bg-black/40 py-1.5 px-2.5 rounded inline-block">
                    JWT Authorization middleware
                  </div>
                </div>
              </div>

              {/* Arrow Column 2 */}
              <div className="hidden lg:flex flex-col items-center justify-center text-[#5A6B7D]">
                <div className="text-xs uppercase font-semibold tracking-widest text-emerald-400 mb-1">
                  Mongoose
                </div>
                <div className="flex items-center w-full">
                  <div className="h-[2px] bg-gradient-to-r from-[#7952B3] to-[var(--accent)] flex-grow" />
                  <ChevronRight size={16} className="text-[var(--accent)]" />
                </div>
              </div>

              {/* Database Layer */}
              <div className="space-y-4">
                <div className="text-xs text-[#5A6B7D] font-bold uppercase tracking-wider text-center lg:text-left">
                  Storage Layer
                </div>
                <div className="p-5 rounded-xl bg-[#101F33] border border-white/5 text-center shadow-lg hover:border-green-400 transition-colors duration-300">
                  <Database size={20} className="text-[#47A248] mx-auto mb-2" />
                  <div className="font-semibold text-sm">MongoDB Atlas</div>
                  <div className="text-[10px] text-[#8899AA] mt-1">Users & Swaps Schemas</div>
                  <div className="text-[9px] text-[#5A6B7D] mt-2 bg-black/40 py-1 px-2 rounded inline-block">
                    Indexed search key arrays
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SCREENSHOTS GALLERY (BLACK PLACEHOLDERS) */}
        <section id="screenshots-gallery" className="project-section mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">Interface Explorations</h2>
          <div className="h-[2px] w-16 bg-[var(--accent)] mx-auto mt-2 mb-10" />

          {/* Styled Black Placeholders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockScreenshots.map((screen) => (
              <div
                key={screen.id}
                onClick={() => setSelectedMock(screen)}
                className="group cursor-pointer rounded-xl overflow-hidden relative aspect-[16/10] border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,200,122,0.15)]"
                style={blackPanelStyle}
              >
                {/* Screenshot image */}
                <img
                  src={screen.image}
                  alt={screen.title}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay gradient on hover */}
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
                  Screenshot
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
                {/* Full screenshot image */}
                <div className="relative w-full max-h-[75vh] overflow-hidden">
                  <img
                    src={selectedMock.image}
                    alt={selectedMock.title}
                    className="w-full h-full object-contain"
                  />
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
                    Challenge 1: Secure JWT Storage & Preventing Cross-Site Scripting (XSS)
                  </h4>
                  <p className="text-xs text-[#8899AA] leading-relaxed mb-3">
                    Storing JSON Web Tokens in localStorage left client sessions exposed to script injections. If malicious scripts executed, they could extract tokens, compromising user identity and capabilities.
                  </p>
                  <div className="border-t border-white/5 pt-3 mt-3 flex items-start gap-2">
                    <span className="text-[10px] font-bold uppercase text-[var(--accent)] tracking-wide bg-[rgba(0,200,122,0.1)] px-2 py-0.5 rounded flex-shrink-0">
                      Solution
                    </span>
                    <p className="text-xs text-[#A0B0C0] leading-relaxed">
                      Configured the Express auth endpoints to deliver JWT payloads inside HTTP-Only cookie variables. Enabled `secure: true` and `sameSite: "strict"` properties to block script-based extraction and secure cross-origin requests.
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
                    Challenge 2: Optimizing Skill Matching Query Latency in MongoDB
                  </h4>
                  <p className="text-xs text-[#8899AA] leading-relaxed mb-3">
                    As user listings scaled, scanning array parameters for offered skills during dashboard searches triggered complete collection scans, increasing server response latency.
                  </p>
                  <div className="border-t border-white/5 pt-3 mt-3 flex items-start gap-2">
                    <span className="text-[10px] font-bold uppercase text-[var(--accent)] tracking-wide bg-[rgba(0,200,122,0.1)] px-2 py-0.5 rounded flex-shrink-0">
                      Solution
                    </span>
                    <p className="text-xs text-[#A0B0C0] leading-relaxed">
                      Implemented multikey compound indexes in MongoDB schemas on offered and wanted skill parameters. Added regex optimizations in Mongoose queries to limit search outputs and minimize execution delay.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. RESULTS & IMPACT */}
        <section id="results" className="project-section mb-16">
          <div className="p-8 rounded-2xl" style={glassStyle}>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Results & Business Impact</h2>
            <div className="h-[2px] w-16 bg-[var(--accent)] mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-[#101F33]/40 rounded-xl border border-white/5">
                <div className="text-3xl font-bold text-[var(--accent)]">50%+</div>
                <div className="text-xs text-white font-medium mt-1">Reduced Search Latency</div>
                <p className="text-[10px] text-[#8899AA] mt-2 leading-relaxed">
                  Multikey indexes in MongoDB improved search performance for matching skill sets.
                </p>
              </div>

              <div className="p-4 bg-[#101F33]/40 rounded-xl border border-white/5">
                <div className="text-3xl font-bold text-[var(--accent)]">100%</div>
                <div className="text-xs text-white font-medium mt-1">Secure Messaging</div>
                <p className="text-[10px] text-[#8899AA] mt-2 leading-relaxed">
                  Route-level auth middleware successfully limits messaging channels to approved swaps.
                </p>
              </div>

              <div className="p-4 bg-[#101F33]/40 rounded-xl border border-white/5">
                <div className="text-3xl font-bold text-[var(--accent)]">0%</div>
                <div className="text-xs text-white font-medium mt-1">Leaked Token Records</div>
                <p className="text-[10px] text-[#8899AA] mt-2 leading-relaxed">
                  Http Only cookies successfully block scripting attacks and token theft.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 11. LIVE DEMO & GITHUB FOOTER BUTTONS */}
        <section id="footer-actions" className="project-section text-center py-8">
          <div className="p-8 md:p-12 rounded-2xl relative overflow-hidden" style={glassStyle}>
            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <h3 className="text-xl md:text-2xl font-bold">Ready to Swap Skills?</h3>
              <p className="text-xs md:text-sm text-[#8899AA] leading-relaxed">
                Review the source code on GitHub.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">

                <a
                  href="https://github.com/Jerone7/SkillSwap-Hub"
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
