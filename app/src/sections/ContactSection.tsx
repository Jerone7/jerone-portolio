import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Share2, Mail, Phone } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import SocialLinks from '../components/SocialLinks';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const infoCards = sectionRef.current.querySelectorAll('.contact-info-card');
    const formEl = sectionRef.current.querySelector('.contact-form');

    infoCards.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        x: -30,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    if (formEl) {
      gsap.from(formEl, {
        opacity: 0,
        x: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, { scope: sectionRef });

  const inputStyle = {
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    padding: '12px 16px',
    color: '#fff',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="container-custom">
        <SectionTitle
          title="Contact Me"
          subtitle="Let's discuss your next project."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Location Card */}
            <div
              className="contact-info-card p-6 rounded-xl"
              style={{
                backgroundColor: 'var(--bg-card)',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(0, 200, 122, 0.1)' }}
                >
                  <MapPin size={20} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">My Address</h4>
                  <p className="text-sm text-[#8899AA]">
                    Madurai, Tamil Nadu, India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Card */}
            <div
              className="contact-info-card p-6 rounded-xl"
              style={{
                backgroundColor: 'var(--bg-card)',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(0, 200, 122, 0.1)' }}
                >
                  <Share2 size={20} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-3">Social Profiles</h4>
                  <SocialLinks iconSize={16} />
                </div>
              </div>
            </div>

            {/* Email/Phone Card */}
            <div
              className="contact-info-card p-6 rounded-xl"
              style={{
                backgroundColor: 'var(--bg-card)',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(0, 200, 122, 0.1)' }}
                >
                  <Mail size={20} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">Email Me</h4>
                  <p className="text-sm text-[#8899AA]">jeroneakash7@gmail.com</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Phone size={14} style={{ color: 'var(--accent)' }} />
                    <span className="text-sm text-[#8899AA]">+91 9342795642</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form — FormSubmit.co */}
          <div className="lg:col-span-3">
            <form
              action="https://formsubmit.co/jeroneakash7@gmail.com"
              method="POST"
              className="contact-form p-6 md:p-8 rounded-xl"
              style={{
                backgroundColor: 'var(--bg-card)',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--border-color)',
              }}
            >
              {/* FormSubmit hidden config fields */}
              <input type="hidden" name="_subject" value="New Portfolio Contact Message" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={typeof window !== 'undefined' ? `${window.location.origin}/#contact` : ''} />
              <input type="hidden" name="_template" value="table" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,200,122,0.15)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,200,122,0.15)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,200,122,0.15)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>

              <div className="mb-6">
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={5}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,200,122,0.15)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-md text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--accent)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-hover)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)';
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
