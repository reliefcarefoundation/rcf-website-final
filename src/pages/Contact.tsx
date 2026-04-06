import { useNavigate } from 'react-router-dom';
import { Mail, Instagram, MessageCircle, Youtube } from 'lucide-react';

export default function Contact() {
  const navigate = useNavigate();

  const scrollToDonate = () => {
    navigate('/');
    setTimeout(() => {
      const donateSection = document.getElementById('donate-section');
      if (donateSection) {
        donateSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-[#00529b] mb-12">
          Get In Touch
        </h1>

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8 mb-12">
          <p className="text-lg text-slate-700 text-center mb-12 leading-relaxed">
            Have questions? Want to learn more? Reach out to us through any of these channels.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <a
              href="mailto:reliefcarefoundation@gmail.com"
              className="flex flex-col items-center text-center hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 rounded-full bg-[#e0f2f7] flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-[#00529b]" />
              </div>
              <h3 className="text-lg font-bold text-[#00529b] mb-2">Email Us</h3>
              <p className="text-sm text-slate-600 hover:text-[#00529b] transition-colors break-all">
                reliefcarefoundation@gmail.com
              </p>
            </a>

            <a
              href="https://www.instagram.com/reliefcare.foundation/?utm_source=ig_web_button_share_sheet"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center mb-4">
                <Instagram className="w-8 h-8 text-[#E1306C]" />
              </div>
              <h3 className="text-lg font-bold text-[#E1306C] mb-2">Instagram</h3>
              <p className="text-sm text-slate-600 hover:text-[#E1306C] transition-colors">
                @reliefcare.foundation
              </p>
            </a>

            <a
              href="https://open.spotify.com/show/3m7Lf3xKQs8FRBgRdLYkXD?si=fde8cf5ed2cb4cff"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#1DB954]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-12.030-1.409-.479.12-1.02-.209-1.14-.66-.12-.486.209-1.02.66-1.14 4.500-1.33 9.869-.63 13.630 1.81.361.22.559.666.301 1.1zm.119-3.478c-3.898-2.318-10.318-2.52-14.037-.84-.481.259-1.080-.198-1.319-.681-.24-.482.198-1.081.681-1.32 4.260-1.858 11.540-1.62 15.738.981.359.219.54.703.319 1.064-.22.359-.704.54-1.063.319z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#1DB954] mb-2">Spotify</h3>
              <p className="text-sm text-slate-600 hover:text-[#1DB954] transition-colors">
                @The Diabetes Roundtable
              </p>
            </a>

            <a
              href="https://youtube.com/@reliefcarefoundation?si=26R9Uh-jjFVR4cbP"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <Youtube className="w-8 h-8 text-[#FF0000]" />
              </div>
              <h3 className="text-lg font-bold text-[#FF0000] mb-2">YouTube</h3>
              <p className="text-sm text-slate-600 hover:text-[#FF0000] transition-colors">
                @reliefcarefoundation
              </p>
            </a>

            <a
              href="https://discord.gg/3TMcTbkc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-[#5865F2]" />
              </div>
              <h3 className="text-lg font-bold text-[#5865F2] mb-2">Join Our Community</h3>
              <p className="text-sm text-slate-600 hover:text-[#5865F2] transition-colors">
                Relief Care Foundation
              </p>
            </a>
          </div>


          <div className="text-center">
            <p className="text-slate-600 mb-6">
              Ready to support our work helping people with diabetes in communities we serve?
            </p>
            <button
              onClick={scrollToDonate}
              className="bg-[#00529b] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#003d75] transition-colors"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
