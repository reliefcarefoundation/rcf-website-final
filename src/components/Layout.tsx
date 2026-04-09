import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Mail, Instagram, MessageCircle, Youtube } from 'lucide-react';
import SearchBar from './SearchBar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const scrollToDonate = () => {
    navigate('/');
    setTimeout(() => {
      const donateSection = document.getElementById('donate-section');
      if (donateSection) {
        donateSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const navigationItems = {
    'The Diabetes Roundtable': [
      { label: 'Listen Now', path: '/podcast' }
    ],
    'About Us': [
      { label: 'Our Core Values', path: '/our-values' },
      { label: 'Our Partners', path: '/our-partners' }
    ],
    'Our Impact': [
      { label: 'How We Make An Impact', path: '/how-it-works' },
      { label: 'Where Your Support Goes', path: '/where-support-goes' },
      { label: 'Your Contribution Matters', path: '/your-contribution' }
    ],
    'Resources': [
      { label: 'Blog', path: '/blog' },
      { label: 'Additional Support Resources', path: '/additional-support' },
      { label: 'Diabetes Information', path: '/diabetes-info' }
    ],
    'Get Involved': [
      { label: 'Contact Us', path: '/contact' }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3" onClick={() => window.scrollTo(0, 0)}>
              <img
                src="/image.png"
                alt="Relief Care Foundation Logo"
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="font-bold text-lg bg-gradient-to-r from-[#00529b] to-[#f58220] bg-clip-text text-transparent">
                Relief Care Foundation
              </span>
            </Link>

            <div className="hidden lg:flex items-center space-x-6" ref={dropdownRef}>
              {Object.entries(navigationItems).map(([category, items]) => (
                <div key={category} className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === category ? null : category)}
                    className="flex items-center space-x-1 font-medium text-[#00529b] hover:text-[#f58220] transition-colors"
                  >
                    <span>{category}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {activeDropdown === category && (
                    <div className="absolute right-0 mt-2 w-auto min-w-[280px] bg-white rounded-lg shadow-lg py-2 border border-gray-100 z-50">
                      {items.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => handleNavClick(item.path)}
                          className="px-5 py-3 hover:bg-[#e0f2f7] w-full text-left text-sm text-slate-700 transition-colors whitespace-nowrap"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <SearchBar />

              <button
                onClick={scrollToDonate}
                className="bg-[#00529b] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#003d75] transition-colors"
              >
                Donate
              </button>
            </div>

            <button
              className="lg:hidden text-[#00529b]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100">
              <div className="px-4 mb-4">
                <SearchBar isMobile={true} onClose={() => setMobileMenuOpen(false)} />
              </div>
              {Object.entries(navigationItems).map(([category, items]) => (
                <div key={category} className="mb-4">
                  <div className="font-bold text-[#00529b] px-4 py-2">{category}</div>
                  {items.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavClick(item.path)}
                      className="w-full text-left px-6 py-2 text-sm text-slate-600 hover:bg-[#e0f2f7] transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ))}
              <button
                onClick={scrollToDonate}
                className="w-full bg-[#00529b] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#003d75] transition-colors mt-4 mx-4"
                style={{ width: 'calc(100% - 2rem)' }}
              >
                Donate
              </button>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-6">
            <img
              src="/image.png"
              alt="Relief Care Foundation Logo"
              className="w-20 h-20 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <h3 className="text-xl font-bold text-[#00529b]">Relief Care Foundation</h3>

            <div className="flex justify-center items-center space-x-8">
              <a
                href="mailto:reliefcarefoundation@gmail.com"
                className="flex flex-col items-center hover:scale-110 transition-transform"
                title="Email us"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-[#e0f2f7] transition-colors">
                  <Mail className="w-5 h-5 text-[#00529b]" />
                </div>
                <span className="text-xs text-slate-600 mt-2 text-center">reliefcarefoundation@gmail.com</span>
              </a>

              <a
                href="https://www.instagram.com/reliefcare.foundation/?utm_source=ig_web_button_share_sheet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center hover:scale-110 transition-transform"
                title="Follow us on Instagram"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-pink-50 transition-colors">
                  <Instagram className="w-5 h-5 text-[#E1306C]" />
                </div>
                <span className="text-xs text-slate-600 mt-2 text-center">@reliefcare.foundation</span>
              </a>

              <a
                href="https://open.spotify.com/show/3m7Lf3xKQs8FRBgRdLYkXD?si=fde8cf5ed2cb4cff"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center hover:scale-110 transition-transform"
                title="Listen on Spotify"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-green-50 transition-colors">
                  <svg className="w-5 h-5 text-[#1DB954]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-12.030-1.409-.479.12-1.02-.209-1.14-.66-.12-.486.209-1.02.66-1.14 4.500-1.33 9.869-.63 13.630 1.81.361.22.559.666.301 1.1zm.119-3.478c-3.898-2.318-10.318-2.52-14.037-.84-.481.259-1.080-.198-1.319-.681-.24-.482.198-1.081.681-1.32 4.260-1.858 11.540-1.620 15.738.981.359.219.540.703.319 1.064-.22.359-.704.54-1.063.319z"/>
                  </svg>
                </div>
                <span className="text-xs text-slate-600 mt-2 text-center">@The Diabetes Roundtable</span>
              </a>

              <a
                href="https://youtube.com/@reliefcarefoundation?si=26R9Uh-jjFVR4cbP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center hover:scale-110 transition-transform"
                title="Watch on YouTube"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-red-50 transition-colors">
                  <Youtube className="w-5 h-5 text-[#FF0000]" />
                </div>
                <span className="text-xs text-slate-600 mt-2 text-center">@reliefcarefoundation</span>
              </a>

              <a
                href="https://discord.gg/3TMcTbkc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center hover:scale-110 transition-transform"
                title="Join our Discord"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-indigo-50 transition-colors">
                  <MessageCircle className="w-5 h-5 text-[#5865F2]" />
                </div>
                <span className="text-xs text-slate-600 mt-2 text-center">Relief Care Foundation</span>
              </a>
            </div>

            <p className="text-xs text-slate-400 text-center mt-8">
              Relief Care Foundation is a registered nonprofit organization. EIN 41-3028077
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
