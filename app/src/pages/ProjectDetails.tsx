import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  ShoppingBag,
  MapPin,
  CreditCard,
  Bell,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Database,
  Layers,
  ShieldAlert,
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { getLenis } from '../hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

interface ScreenshotItem {
  src: string;
  title: string;
  desc: string;
}

export default function ProjectDetails() {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<ScreenshotItem | null>(null);

  const screenshots: ScreenshotItem[] = [
    {
      src: '/home page.png',
      title: 'Storefront Homepage',
      desc: 'Seamless product discovery with smart category filters (Vegetables, Dairy, Snacks) and responsive grids.'
    },
    {
      src: '/cart page.png',
      title: 'Interactive Shopping Cart',
      desc: 'Slide-out cart drawer displaying order lists, delivery time estimate, and instant Proceed to Pay options.'
    },
    {
      src: '/payment page.png',
      title: 'Secure Payment Gateway',
      desc: 'Integrated checkout console supporting Razorpay (Cards, UPI, Netbanking) and Cash on Delivery.'
    },
    {
      src: '/profile page.png',
      title: 'Customer Dashboard',
      desc: 'Personal account center featuring lifetime orders, total spent tracker, and real-time order history logs.'
    },
    {
      src: '/dashboard.png',
      title: 'Admin Catalog Console',
      desc: 'Store manager interface providing full CRUD tools, stock status controllers, and visual transaction charts.'
    }
  ];

  const technologies = [
    { name: 'React.js', category: 'Frontend', color: '#61DAFB' },
    { name: 'Node.js', category: 'Backend', color: '#339933' },
    { name: 'Express.js', category: 'Backend', color: '#FFFFFF' },
    { name: 'MongoDB Atlas', category: 'Database', color: '#47A248' },
    { name: 'Razorpay API', category: 'Payments', color: '#00C87A' },
    { name: 'Firebase FCM', category: 'Notifications', color: '#FFCA28' },
    { name: 'Supabase Storage', category: 'Cloud Store', color: '#3ECF8E' },
    { name: 'Leaflet.js', category: 'Maps & Geo', color: '#B5E61D' },
    { name: 'Tailwind CSS', category: 'Styling', color: '#06B6D4' },
    { name: 'GSAP Animations', category: 'Styling', color: '#88CE02' }
  ];

  // Lenis scroll reset to top on mount
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

    // Fade in sections sequentially on scroll
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

    // Stats count-up animation
    if (statsRef.current) {
      const stats = statsRef.current.querySelectorAll('.stat-count');
      stats.forEach((el) => {
        const rawTarget = el.getAttribute('data-target') || '';
        const hasPlus = rawTarget.includes('+');
        const hasKm = rawTarget.includes('km');
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
              el.textContent = `${formattedVal}${hasPlus ? '+' : ''}${hasKm ? 'km' : ''}`;
            }
          });
        }
      });
    }

    // Technology badges stagger hover glow effect triggers or entry animation
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
          className="absolute top-[100px] right-[5%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-5"
          style={{
            background: 'radial-gradient(circle, #3ECF8E 0%, transparent 70%)'
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
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(0,200,122,0.1)] text-[var(--accent)] border border-[rgba(0,200,122,0.2)]">
                <Sparkles size={12} className="animate-pulse" />
                Full Stack Web Application
              </div>

              <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mt-2 text-white max-w-[800px]">
                Revolutionizing Grocery Shopping with{' '}
                <span className="text-gradient">Smart Payments</span>
              </h1>

              <p className="text-base md:text-lg text-[#8899AA] max-w-[750px] leading-relaxed mt-3">
                A robust digital grocery ecosystem enabling customers to seamlessly browse fresh produce, order online, select precise locations via maps, receive instant push notifications, and checkout securely with a custom integration of Razorpay. Includes a complete operational Dashboard for administrative management.
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
                  href="https://nellaimadha.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-all duration-300 shadow-md hover:-translate-y-0.5"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
                <a
                  href="https://github.com/Jerone7/revoltinizing_grocery_shopping"
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
                The **Nellai Madha** grocery platform was conceived to bridge the gap between small local produce suppliers and consumers who value convenience and cashless payments. Built on a modernized MERN stack architecture, the project provides a unified hub for product discovery, checkout logic, and operations management.
              </p>
              <p className="text-[#8899AA] leading-relaxed">
                In addition to standard shopping elements, the platform implements **Supabase Storage** for product item photo grids, **Leaflet.js** for pinpoint shipping coordinates, **Firebase Cloud Messaging (FCM)** for push announcements, and an elaborate **Admin Catalog Control** panel allowing shop managers to perform real-time stock management and order fulfillments.
              </p>
            </div>

            {/* Stats list */}
            <div ref={statsRef} className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                {
                  icon: <ShoppingBag size={22} className="text-[var(--accent)]" />,
                  target: '100+',
                  label: 'Orders Managed',
                  desc: 'Operational order queue and fulfillment control.'
                },
                {
                  icon: <MapPin size={22} className="text-[var(--accent)]" />,
                  target: '30km',
                  label: 'Delivery Radius',
                  desc: 'Integrated geolocation maps.'
                },
                {
                  icon: <CreditCard size={22} className="text-[var(--accent)]" />,
                  target: 'Secure',
                  label: 'Payments',
                  desc: 'Razorpay UPI, Card & Wallets.'
                },
                {
                  icon: <Bell size={22} className="text-[var(--accent)]" />,
                  target: 'Real-time',
                  label: 'Notifications',
                  desc: 'Push updates powered by Firebase.'
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
                      {stat.target === 'Secure' || stat.target === 'Real-time' ? stat.target : '0'}
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
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <ShieldAlert className="text-red-400" size={20} />
              </div>
              <h3 className="text-xl font-bold">The Problem</h3>
            </div>
            <p className="text-[#8899AA] leading-relaxed text-sm mb-4">
              Local grocery providers like Nellai Madha faced immense challenges with traditional offline ordering models. Customer checkouts were slow and relied entirely on cash or static QR codes that required manual confirmation. 
            </p>
            <p className="text-[#8899AA] leading-relaxed text-sm">
              Furthermore, administrative operations were fragmented. Tracking order histories, verifying customer location bounds, updates regarding stock availabilities, and sending push announcements manually led to processing delays and loss of prospective repeat orders.
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
              We developed a comprehensive full-stack e-commerce system that streamlines both client shopping experiences and admin store operations. Customers browse a beautifully cataloged catalog, choose locations on Leaflet maps, and complete orders with secure payments.
            </p>
            <p className="text-[#8899AA] leading-relaxed text-sm">
              Managers handle inventory dynamically via a dedicated administration panel, making changes that immediately reflect in the client app. Order workflows trigger automatic, real-time Firebase FCM updates to keep the buyer fully informed.
            </p>
          </div>
        </section>

        {/* 5. KEY FEATURES */}
        <section id="key-features" className="project-section mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">System Capabilities & Features</h2>
          <div className="h-[2px] w-16 bg-[var(--accent)] mx-auto mt-2 mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Smart Cart & Product Grid',
                desc: 'Highly responsive frontend catalog showcasing fresh groceries by department with single-tap cart updates.'
              },
              {
                title: 'Razorpay Gateway Integration',
                desc: 'Secure payments flow verifying merchant transactions before processing order completion logic.'
              },
              {
                title: 'Dynamic Location Selection',
                desc: 'Embeds interactive Leaflet.js maps for precision delivery coordinates and address updates.'
              },
              {
                title: 'Instant Push Notifications',
                desc: 'Firebase FCM channels that deliver order status changes directly to user screens.'
              },
              {
                title: 'Supabase Asset Management',
                desc: 'High-speed cloud image assets served from Supabase buckets for crisp, responsive catalog rendering.'
              },
              {
                title: 'Admin Catalog & Order CRUD',
                desc: 'Back-office dashboard for complete control over pricing, listings, stock count, and order routing.'
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
            {/* Visual HTML/CSS Diagram */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative items-center">
              {/* Clients Layer */}
              <div className="space-y-4">
                <div className="text-xs text-[#5A6B7D] font-bold uppercase tracking-wider text-center lg:text-left">
                  Clients Layer
                </div>
                <div className="p-4 rounded-xl bg-[#101F33] border border-white/5 text-center shadow-lg hover:border-[var(--accent)] transition-colors duration-300">
                  <div className="font-semibold text-sm">Customer Web App</div>
                  <div className="text-[10px] text-[#8899AA] mt-1">React.js </div>
                </div>
                <div className="p-4 rounded-xl bg-[#101F33] border border-white/5 text-center shadow-lg hover:border-[var(--accent)] transition-colors duration-300">
                  <div className="font-semibold text-sm">Admin Dashboard</div>
                  <div className="text-[10px] text-[#8899AA] mt-1">React.js</div>
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
                  Server Layer
                </div>
                <div className="p-5 rounded-xl bg-[#14263D] border border-[var(--border-color)] text-center shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-green-400 to-emerald-600" />
                  <div className="font-semibold text-sm flex items-center justify-center gap-1.5">
                    <Cpu size={14} className="text-green-400" />
                    Express API Gateway
                  </div>
                  <div className="text-[10px] text-[#8899AA] mt-1">Node.js API Server</div>
                  <div className="text-[10px] text-[#5A6B7D] mt-2 bg-black/40 py-1 px-2 rounded inline-block">
                    JWT Auth & Webhook Listeners
                  </div>
                </div>
              </div>

              {/* Arrow/Integration Column 2 */}
              <div className="hidden lg:flex flex-col items-center justify-center text-[#5A6B7D]">
                <div className="text-xs uppercase font-semibold tracking-widest text-emerald-400 mb-1">
                  Drivers
                </div>
                <div className="flex items-center w-full">
                  <div className="h-[2px] bg-gradient-to-r from-emerald-500 to-[var(--accent)] flex-grow" />
                  <ChevronRight size={16} className="text-[var(--accent)]" />
                </div>
              </div>

              {/* Databases & Micro-services Layer */}
              <div className="space-y-4 lg:col-span-1">
                <div className="text-xs text-[#5A6B7D] font-bold uppercase tracking-wider text-center lg:text-left">
                  Storage & Services
                </div>
                <div className="p-3.5 rounded-lg bg-[#101F33] border border-white/5 flex items-center gap-3 shadow-md hover:border-emerald-500 transition-colors duration-300">
                  <Database size={16} className="text-[#47A248]" />
                  <div>
                    <div className="font-semibold text-xs text-white">MongoDB Atlas</div>
                    <div className="text-[9px] text-[#8899AA]">Users & Orders DB</div>
                  </div>
                </div>
                <div className="p-3.5 rounded-lg bg-[#101F33] border border-white/5 flex items-center gap-3 shadow-md hover:border-green-400 transition-colors duration-300">
                  <Layers size={16} className="text-[#3ECF8E]" />
                  <div>
                    <div className="font-semibold text-xs text-white">Supabase Buckets</div>
                    <div className="text-[9px] text-[#8899AA]">CDN Image Storage</div>
                  </div>
                </div>
                <div className="p-3.5 rounded-lg bg-[#101F33] border border-white/5 flex items-center gap-3 shadow-md hover:border-blue-400 transition-colors duration-300">
                  <CreditCard size={16} className="text-blue-400" />
                  <div>
                    <div className="font-semibold text-xs text-white">Razorpay API</div>
                    <div className="text-[9px] text-[#8899AA]">Merchant Invoicing</div>
                  </div>
                </div>
                <div className="p-3.5 rounded-lg bg-[#101F33] border border-white/5 flex items-center gap-3 shadow-md hover:border-yellow-500 transition-colors duration-300">
                  <Bell size={16} className="text-[#FFCA28]" />
                  <div>
                    <div className="font-semibold text-xs text-white">Firebase FCM</div>
                    <div className="text-[9px] text-[#8899AA]">Mobile Push channels</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SCREENSHOTS GALLERY */}
        <section id="screenshots-gallery" className="project-section mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">Screenshots Gallery</h2>
          <div className="h-[2px] w-16 bg-[var(--accent)] mx-auto mt-2 mb-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {screenshots.map((screen, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(screen)}
                className="group cursor-pointer rounded-xl overflow-hidden relative aspect-[16/10] shadow-xl border border-white/5 bg-[#101F33]"
              >
                <img
                  src={screen.src}
                  alt={screen.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071426] via-[#071426]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-white font-semibold text-sm md:text-base group-hover:text-[var(--accent)] transition-colors duration-300">
                    {screen.title}
                  </h4>
                  <p className="text-[10px] md:text-xs text-[#8899AA] mt-1 line-clamp-1">
                    {screen.desc}
                  </p>
                </div>

                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur px-2.5 py-1 rounded text-[10px] text-white/80 font-medium">
                  Click to View
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 transition-all duration-300"
              onClick={() => setSelectedImage(null)}
            >
              <div
                className="relative max-w-4xl w-full rounded-2xl overflow-hidden border border-white/10"
                style={{ backgroundColor: '#0F1E33' }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full max-h-[70vh] object-contain block mx-auto bg-black/50"
                />
                <div className="p-6 border-t border-white/5">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">{selectedImage.title}</h3>
                  <p className="text-xs md:text-sm text-[#8899AA] leading-relaxed">{selectedImage.desc}</p>
                </div>
                <button
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2.5 transition-colors duration-200 border border-white/10"
                  onClick={() => setSelectedImage(null)}
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
                    Challenge 1: Transaction Integrity and Webhook Syncing in Checkout Flows
                  </h4>
                  <p className="text-xs text-[#8899AA] leading-relaxed mb-3">
                    During concurrent purchases, webhooks from Razorpay could arrive asynchronously with delays, causing order processing status loops. Without transaction coordination, users would occasionally witness multiple database duplicate invoices.
                  </p>
                  <div className="border-t border-white/5 pt-3 mt-3 flex items-start gap-2">
                    <span className="text-[10px] font-bold uppercase text-[var(--accent)] tracking-wide bg-[rgba(0,200,122,0.1)] px-2 py-0.5 rounded flex-shrink-0">
                      Solution
                    </span>
                    <p className="text-xs text-[#A0B0C0] leading-relaxed">
                      Implemented MongoDB session transactions to hold critical collection records lock during payment validations. Programmed an idempotent transaction processor to coordinate direct client callbacks and webhook endpoints, verifying checkout authenticity before finalizing state transitions.
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
                    Challenge 2: Real-time Client Sync and Offline Service Worker Notification channels
                  </h4>
                  <p className="text-xs text-[#8899AA] leading-relaxed mb-3">
                    Notifying clients when orders transitioned status required persistent notification channels. Standard WebSockets would drop when browser tabs minimized, causing users to miss updates regarding deliveries.
                  </p>
                  <div className="border-t border-white/5 pt-3 mt-3 flex items-start gap-2">
                    <span className="text-[10px] font-bold uppercase text-[var(--accent)] tracking-wide bg-[rgba(0,200,122,0.1)] px-2 py-0.5 rounded flex-shrink-0">
                      Solution
                    </span>
                    <p className="text-xs text-[#A0B0C0] leading-relaxed">
                      Integrated Firebase Cloud Messaging (FCM) on a custom background Service Worker. The client registers device registration tokens to Node.js backend. State shifts in the admin dashboard fire push events via Firebase FCM admin endpoints, pushing status banners directly even when the user tab is offline or minimized.
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
                <div className="text-3xl font-bold text-[var(--accent)]">98%</div>
                <div className="text-xs text-white font-medium mt-1">Transaction Success Rate</div>
                <p className="text-[10px] text-[#8899AA] mt-2 leading-relaxed">
                  Automated Razorpay webhooks virtually eliminated manual receipt validation errors.
                </p>
              </div>

              <div className="p-4 bg-[#101F33]/40 rounded-xl border border-white/5">
                <div className="text-3xl font-bold text-[var(--accent)]">&lt; 1 Min</div>
                <div className="text-xs text-white font-medium mt-1">Average Checkout Time</div>
                <p className="text-[10px] text-[#8899AA] mt-2 leading-relaxed">
                  Integrated address selectors and stored profiles reduced path to order placement.
                </p>
              </div>

              <div className="p-4 bg-[#101F33]/40 rounded-xl border border-white/5">
                <div className="text-3xl font-bold text-[var(--accent)]">100+</div>
                <div className="text-xs text-white font-medium mt-1">Daily Operations Capacity</div>
                <p className="text-[10px] text-[#8899AA] mt-2 leading-relaxed">
                  Back-office product CRUD and status indicators automated merchant workflows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 11. LIVE DEMO & GITHUB FOOTER BUTTONS */}
        <section id="footer-actions" className="project-section text-center py-8">
          <div className="p-8 md:p-12 rounded-2xl relative overflow-hidden" style={glassStyle}>
            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <h3 className="text-xl md:text-2xl font-bold">Ready to Experience the Solution?</h3>
              <p className="text-xs md:text-sm text-[#8899AA] leading-relaxed">
                Test the client shopping flow or view the catalog code in the public GitHub repo. Feel free to reach out via the contact form on the home page for inquiries.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a
                  href="https://nellaimadha.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-md text-sm font-semibold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-all duration-300 shadow-md hover:-translate-y-0.5"
                >
                  <ExternalLink size={16} />
                  Launch Live Demo
                </a>
                <a
                  href="https://github.com/Jeroneakash7/nellai-madha"
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
