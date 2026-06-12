import { Linkedin, Instagram } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

export default function SocialLinks({ className = '', iconSize = 18 }: SocialLinksProps) {
  const socials = [
    { icon: Linkedin, label: 'LinkedIn', href: 'www.linkedin.com/in/jerone-akash7-5793a7293' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.linkedin.com/in/jerone-akash7-5793a7293/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BwBcNTb3ESbmb2lNhIKhRHg%3D%3D '},
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="w-10 h-10 rounded-full border border-[#253545] flex items-center justify-center
                     text-[#8899AA] transition-all duration-300
                     hover:border-[#00C87A] hover:text-[#00C87A] hover:bg-[rgba(0,200,122,0.1)]"
        >
          <Icon size={iconSize} />
        </a>
      ))}
    </div>
  );
}
