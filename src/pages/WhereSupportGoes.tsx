import { useNavigate } from 'react-router-dom';
import { Pill, BookOpen, Building2 } from 'lucide-react';

export default function WhereSupportGoes() {
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

  const supportAreas = [
    {
      icon: Pill,
      title: 'Diabetes Supplies & Medication',
      description: 'Your donations fund essential supplies including insulin, continuous glucose monitors (CGMs), test strips, syringes, and other critical equipment for patients managing diabetes.'
    },
    {
      icon: BookOpen,
      title: 'Patient & Community Education',
      description: 'Funding supports crucial education programs covering health care insurance navigation, diabetes self-management, and self-care strategies for patients and families.'
    }
  ];

  return (
    <div className="bg-[#e8f4f8] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-center text-[#00529b] mb-12">
          Where Your Support Goes
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {supportAreas.map((area, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-md">
              <div className="w-16 h-16 bg-[#e0f2f7] rounded-full flex items-center justify-center mb-4">
                <area.icon className="w-8 h-8 text-[#00529b]" />
              </div>
              <h3 className="text-2xl font-bold text-[#00529b] mb-4">
                {area.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-8 shadow-md w-full md:w-2/3 lg:w-1/2">
            <div className="w-16 h-16 bg-[#fff5e0] rounded-full flex items-center justify-center mb-4 mx-auto">
              <Building2 className="w-8 h-8 text-[#f58220]" />
            </div>
            <h3 className="text-2xl font-bold text-[#f58220] mb-4 text-center">
              Hospital Operational Support
            </h3>
            <p className="text-slate-600 leading-relaxed text-center">
              We work with hospital administrators to identify funding gaps and provide supplemental resources that allow community hospitals to maintain and expand their diabetes care services.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-[#00529b] mb-6">
              Transparent Fund Allocation
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Every dollar raised through Relief Care Foundation goes directly to our hospital partners. We work closely with them to understand their most urgent priorities and ensure funding reaches the programs and supplies that will make the greatest impact.
              </p>
              <p>
                We maintain ongoing communication with hospital administrators and diabetes care coordinators to understand where support is needed most.
              </p>
              <p>
                From insulin vials to educational materials, from glucose monitors to patient support programs, your contribution directly supports diabetes care in communities we serve.
              </p>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80"
              alt="Hospital room"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={scrollToDonate}
            className="bg-[#00529b] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#003d75] transition-colors text-lg"
          >
            Donate Today
          </button>
        </div>
      </div>
    </div>
  );
}
