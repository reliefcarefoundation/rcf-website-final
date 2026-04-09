import { useNavigate } from 'react-router-dom';
import { Heart, Eye, Users, Zap } from 'lucide-react';

export default function OurValues() {
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

  const handleLearnHowItWorks = () => {
    navigate('/how-it-works');
    window.scrollTo(0, 0);
  };

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We believe every patient deserves access to quality diabetes care regardless of their financial situation or background.',
      color: '#f58220'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'We monitor how funds are used and match donations with specific hospital needs, always ensuring support reaches where it is needed most.',
      color: '#00529b'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Relief Care Foundation works hand-in-hand with community hospitals, building lasting relationships that sustain long-term diabetes care improvements.',
      color: '#f58220'
    },
    {
      icon: Zap,
      title: 'Empowerment',
      description: 'We empower patients and families through education on insurance, diabetes management, and self-care, giving them the tools to live healthier lives.',
      color: '#00529b'
    }
  ];

  return (
    <div className="bg-[#e8f4f8] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-center text-[#00529b] mb-8">
          Our Core Values
        </h1>

        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-slate-700 text-center leading-relaxed">
            Founded on the belief that quality diabetes care should be accessible to all, Relief Care Foundation works to bridge the resource gap that many community hospitals face in serving patients with diabetes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-md">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${value.color}20` }}
              >
                <value.icon className="w-8 h-8" style={{ color: value.color }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: value.color }}>
                {value.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-8 shadow-md mb-12">
          <h2 className="text-3xl font-bold text-[#00529b] mb-6">
            Supporting Community Hospitals
          </h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              Community hospitals serve those most in need but often receive less public and government funding than larger health systems. These hospitals are on the front lines of care for underserved populations, providing essential services despite tighter budgets.
            </p>
            <p>
              Relief Care Foundation steps in to supplement that funding, working directly with hospital administrators to identify specific needs in diabetes care. Whether it's insulin supplies, glucose monitors, or patient education programs, we match donor support with the exact resources hospitals require to maintain and expand their diabetes services.
            </p>
            <p>
              Our partnerships are built on trust and transparency. We monitor how resources are allocated and maintain ongoing communication with our hospital partners to ensure every dollar makes a meaningful impact in patient care.
            </p>
          </div>
        </div>

        <div className="mb-12 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
            alt="Community healthcare"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1559839734033-6461efaf3cef?auto=format&fit=crop&w=1200&q=80';
            }}
            className="rounded-lg shadow-xl w-full max-w-2xl"
          />
        </div>

        <div className="bg-[#00529b] rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Values in Action</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            See how our values translate into real impact for diabetes patients and their families in the communities we serve.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={scrollToDonate}
              className="bg-white text-[#00529b] font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Support Our Mission
            </button>
            <button
              onClick={handleLearnHowItWorks}
              className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-[#00529b] transition-colors"
            >
              Learn How It Works
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
