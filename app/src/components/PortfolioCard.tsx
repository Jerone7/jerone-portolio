import { useNavigate } from 'react-router';

interface PortfolioCardProps {
  image: string;
  title: string;
  category: string;
  link?: string;
}

export default function PortfolioCard({ image, title, category, link }: PortfolioCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  const isBlackImage = image === 'black';

  return (
    <div
      onClick={handleClick}
      className="group relative rounded-xl overflow-hidden cursor-pointer aspect-[4/3] border border-white/5 hover:border-[var(--accent)]/30 transition-all duration-300"
    >
      {isBlackImage ? (
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #071426 0%, #101F33 100%)'
          }}
        >
          <div className="flex flex-col items-center gap-2 text-[#5A6B7D] group-hover:text-[var(--accent)] transition-colors duration-300">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#5A6B7D] group-hover:text-white transition-colors duration-300">
              MERN Stack
            </span>
          </div>
        </div>
      ) : (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      )}
      {/* Default overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,32,0.9)] via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-400">
        <div className="absolute bottom-4 left-4 right-4">
          <h4 className="text-white font-semibold text-base">{title}</h4>
          <span
            className="inline-block mt-2 px-3 py-1 rounded-full text-xs text-white font-medium"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            {category}
          </span>
        </div>
      </div>
      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ backgroundColor: 'rgba(0, 200, 122, 0.9)' }}
      >
        <span className="text-white font-semibold text-base flex items-center gap-2">
          View Project
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}
