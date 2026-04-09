import { useNavigate } from 'react-router-dom';
import { Heart, Droplets, GraduationCap, Building2, Mic } from 'lucide-react';
import DonateSection from '../components/DonateSection';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1559839734033-6461efaf3cef?auto=format&fit=crop&w=1200&q=80';

export default function Home() {
  const navigate = useNavigate();

  const scrollToDonate = () => {
    const donateSection = document.getElementById('donate-section');
    if (donateSection) {
      donateSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    navigate('/our-values');
    window.scrollTo(0, 0);
  };

  const handlePodcast = () => {
    navigate('/podcast');
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <section className="bg-[#00529b] pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <img
              src="/image.png"
              alt="Relief Care Foundation Logo"
              className="w-32 h-32 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
            <span className="text-white">Relief Care </span>
            <span className="text-white">Foundation</span>
          </h1>

          <p className="text-2xl sm:text-3xl font-bold text-[#f58220] mb-8">
            Fighting Diabetes One Step At A Time
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={scrollToDonate}
              className="bg-[#f58220] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#d96f1a] transition-colors text-lg w-full sm:w-auto"
            >
              Donate Now
            </button>
            <button
              onClick={handleLearnMore}
              className="bg-white text-[#00529b] font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg w-full sm:w-auto"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#00529b] mb-16">
            Your Support in Action
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-[#00529b] rounded-lg p-8 shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#e0f2f7] rounded-full flex items-center justify-center">
                <Droplets className="w-8 h-8 text-[#00529b]" />
              </div>
              <h3 className="text-xl font-bold text-[#00529b] mb-3 text-center">Insulin & Supplies</h3>
              <p className="text-slate-700 leading-relaxed text-center">
                We help patients access essential supplies like insulin, glucose monitors, and test strips.
              </p>
            </div>

            <div className="bg-white border-2 border-[#f58220] rounded-lg p-8 shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#fff5e0] rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-[#f58220]" />
              </div>
              <h3 className="text-xl font-bold text-[#f58220] mb-3 text-center">Education</h3>
              <p className="text-slate-700 leading-relaxed text-center">
                We fund programs that teach patients about insurance, diabetes management, and self-care.
              </p>
            </div>

            <div className="bg-white border-2 border-[#00529b] rounded-lg p-8 shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#e0f2f7] rounded-full flex items-center justify-center">
                <Building2 className="w-8 h-8 text-[#00529b]" />
              </div>
              <h3 className="text-xl font-bold text-[#00529b] mb-3 text-center">Hospital Support</h3>
              <p className="text-slate-700 leading-relaxed text-center">
                We work with community hospitals to support their diabetes care programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-[#00529b] mb-6">
                Our Approach
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>
                  Diabetes is expensive. For many people, the cost of insulin, supplies, and healthcare is overwhelming. Community hospitals see this every day, but they often lack the funding to help all the patients who need support.
                </p>
                <p>
                  We work directly with these hospitals to understand their needs. Then we connect donors with opportunities to make a real difference. Your donation helps a specific hospital provide specific care, whether that's insulin for a patient who can't afford it, or an education program that teaches people how to manage their condition.
                </p>
                <p>
                  We keep it simple, transparent, and focused. Every dollar goes toward helping people with diabetes in our community.
                </p>
              </div>
              <button
                onClick={handleLearnMore}
                className="mt-8 bg-[#00529b] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#003d75] transition-colors"
              >
                Learn More About Our Values
              </button>
            </div>

            <div className="flex justify-center lg:col-span-1">
              <img
                src="https://images.unsplash.com/photo-1631217314830-4d7367a43280?auto=format&fit=crop&w=800&q=80"
                alt="Doctor speaking with patient"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f58220] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-white text-sm font-bold uppercase tracking-widest mb-3 opacity-90">
                Our Podcast
              </p>
              <h2 className="text-4xl font-extrabold mb-6">
                The Diabetes Roundtable
              </h2>
              <p className="text-lg leading-relaxed mb-8 text-white/90">
                Real conversations about diabetes with physicians, dietitians, certified diabetes educators, and other healthcare professionals. Each episode covers a different aspect of living with and managing diabetes so patients and families can feel more informed and confident.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://open.spotify.com/show/3m7Lf3xKQs8FRBgRdLYkXD?si=fde8cf5ed2cb4cff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1DB954] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#1ed760] transition-colors text-center"
                >
                  Listen on Spotify
                </a>
                <button
                  onClick={handlePodcast}
                  className="bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white hover:text-[#f58220] transition-colors"
                >
                  See All Episodes
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-40 h-40 rounded-full border-4 border-white bg-white/10 flex items-center justify-center">
                <Mic className="w-20 h-20 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <DonateSection />
    </div>
  );
}
