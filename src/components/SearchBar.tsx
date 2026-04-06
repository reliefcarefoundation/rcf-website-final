import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchResult {
  page: string;
  path: string;
  description: string;
}

const searchIndex: SearchResult[] = [
  {
    page: 'Home',
    path: '/',
    description: 'Learn about Relief Care Foundation and donate to support diabetes care. Make a donation, contribute, give, support, help, fund, zelle, payment, contribute financially'
  },
  {
    page: 'Donate',
    path: '/',
    description: 'Make a donation via Zelle to reliefcarefoundation.org. Donate money, contribute, give, support diabetes care, payment methods, zelle transfer, financial support, charitable giving, contributions'
  },
  {
    page: 'Our Core Values',
    path: '/our-values',
    description: 'Our mission: compassion, transparency, community, and empowerment. Vision, principles, beliefs, foundation values, what we stand for, our philosophy'
  },
  {
    page: 'How We Make An Impact',
    path: '/how-it-works',
    description: 'We identify needs, connect donors, deliver support, and monitor impact. How it works, our process, our approach, what we do, how we help, our method, impact strategy'
  },
  {
    page: 'Where Your Support Goes',
    path: '/where-support-goes',
    description: 'Funding for insulin, supplies, education, and hospital support. How donations are used, where money goes, what we fund, allocation, spending, use of funds, program funding'
  },
  {
    page: 'Your Contribution Matters',
    path: '/your-contribution',
    description: 'See how donations of $25, $50, $100, $250, and $500 make a difference. Donation impact, what your money does, giving levels, contribution amounts, donor impact, donation examples'
  },
  {
    page: 'Contact Us',
    path: '/contact',
    description: 'Get in touch with Relief Care Foundation via email or social media. Reach out, email us, message, communicate, contact information, get help, ask questions, connect with us'
  },
  {
    page: 'Additional Support Resources',
    path: '/additional-support',
    description: 'Find Medicare, Medicaid, Medi-Cal, insurance, prescription assistance, PAN Foundation, NeedyMeds, RxAssist, Pfizer, and AbbVie resources. Financial help, assistance programs, support services, patient resources, help paying, medication assistance'
  },
  {
    page: 'Our Partners',
    path: '/our-partners',
    description: 'Community health partnerships and hospital collaborations. Partner organizations, hospital partners, community partnerships, who we work with, healthcare partners, collaborations'
  },
  {
    page: 'The Diabetes Roundtable',
    path: '/podcast',
    description: 'Listen to our podcast with audio and video episodes about diabetes. Podcast, listen, episodes, audio content, diabetes roundtable, healthcare discussions, educational content, expert interviews'
  },
  {
    page: 'Diabetes Information',
    path: '/diabetes-info',
    description: 'Learn about diabetes effects, complications, prevention, management, glaucoma, neuropathy, kidney disease, heart disease, and blindness. Diabetes education, health information, disease information, symptoms, treatment, complications, diabetes facts'
  },
  {
    page: 'Blog',
    path: '/blog',
    description: 'Read our latest articles, posts, news, and updates. Blog posts, news, articles, stories, updates, latest information, announcements, what\'s new'
  }
];

interface SearchBarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export default function SearchBar({ isMobile = false, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowDropdown(false);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const searchTerms = query.toLowerCase().trim().split(/\s+/);
    const filtered = searchIndex.filter(item => {
      const searchableText = `${item.page} ${item.description}`.toLowerCase();
      return searchTerms.every(term => searchableText.includes(term));
    });

    setResults(filtered);
    setShowDropdown(true);
  }, [query]);

  const handleResultClick = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
    setQuery('');
    setShowDropdown(false);
    if (onClose) onClose();
  };

  return (
    <div ref={searchRef} className={isMobile ? 'w-full' : 'relative'}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            ${isMobile ? 'w-full' : 'w-48 focus:w-64'}
            pl-10 pr-4 py-2 rounded-lg
            bg-slate-100 focus:bg-white
            border border-transparent focus:border-[#00529b]
            focus:ring-2 focus:ring-[#00529b] focus:ring-opacity-20
            text-sm
            transition-all duration-200
            outline-none
          `}
        />
      </div>

      {showDropdown && results.length > 0 && (
        <div className={`
          absolute ${isMobile ? 'left-0 right-0' : 'left-0'}
          mt-2 bg-white rounded-lg shadow-lg border border-gray-100 z-50
          ${isMobile ? 'w-full' : 'w-80'}
          max-h-96 overflow-y-auto
        `}>
          {results.map((result) => (
            <div
              key={result.path}
              onClick={() => handleResultClick(result.path)}
              className="px-4 py-3 hover:bg-[#e0f2f7] cursor-pointer border-b border-slate-100 last:border-b-0"
            >
              <div className="font-semibold text-[#00529b] mb-1">{result.page}</div>
              <div className="text-sm text-slate-600">{result.description}</div>
            </div>
          ))}
        </div>
      )}

      {showDropdown && query.trim().length > 0 && results.length === 0 && (
        <div className={`
          absolute ${isMobile ? 'left-0 right-0' : 'left-0'}
          mt-2 bg-white rounded-lg shadow-lg border border-gray-100 z-50
          ${isMobile ? 'w-full' : 'w-80'}
          px-4 py-3
        `}>
          <div className="text-sm text-slate-600">No results found</div>
        </div>
      )}
    </div>
  );
}
