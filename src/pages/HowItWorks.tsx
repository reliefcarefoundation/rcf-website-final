import { useNavigate } from 'react-router-dom';
import { Search, Send, Activity, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
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

  const handleSeeWhereSupportGoes = () => {
    navigate('/where-support-goes');
    window.scrollTo(0, 0);
  };

  const steps = [
    {
      icon: Search,
      title: 'Identify Needs',
      description: 'We partner directly with community hospitals to identify unmet diabetes care needs, from insulin shortages to gaps in patient education resources.'
    },
    {
      icon: Send,
      title: 'Deliver Support',
      description: 'Funds are raised and directed to the specific diabetes care programs, supplies, and education initiatives that hospitals need most.'
    },
    {
      icon: Activity,
      title: 'Stay Connected',
      description: 'We stay in touch with our hospital partners and continually assess their needs to ensure support goes where it matters most.'
    }
  ];

  return (
    <div className="bg-[#e8f4f8] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-center text-[#00529b] mb-12">
          How We Make An Impact On Diabetes
        </h1>

        <div className="mb-16">
          <div className="hidden md:flex justify-center items-center space-x-4 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                    <step.icon className="w-12 h-12 text-[#00529b]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#00529b] text-center">
                    {step.title}
                  </h3>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-8 h-8 text-[#f58220] mx-4" />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 md:hidden">
            {steps.map((step, index) => (
              <div key={index}>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-[#e0f2f7] rounded-full flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-8 h-8 text-[#00529b]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#00529b] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-600">{step.description}</p>
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-2">
                    <ArrowRight className="w-6 h-6 text-[#f58220] rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hidden md:block">
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1581594881192-7eae21b94b34?auto=format&fit=crop&w=1200&q=80"
              alt="Diabetes testing equipment"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80';
              }}
              className="rounded-lg shadow-xl w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#00529b] mb-6">
              A Collaborative Approach
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Our impact model is built on strong partnerships with community hospitals and healthcare providers who understand the unique challenges faced by diabetes patients in underserved communities.
              </p>
              <p>
                By maintaining direct communication with hospital administrators and diabetes care coordinators, we ensure that funding reaches the right programs at the right time. This collaborative approach allows us to respond quickly to urgent needs while also supporting long-term improvements in diabetes care infrastructure.
              </p>
              <p>
                Every step of our process is designed to maximize the effectiveness of donor contributions and create sustainable improvements in diabetes care access and quality.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#00529b] rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Your support directly funds diabetes care programs, supplies, and education for patients who need it most.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={scrollToDonate}
              className="bg-white text-[#00529b] font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Donating Today
            </button>
            <button
              onClick={handleSeeWhereSupportGoes}
              className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-[#00529b] transition-colors"
            >
              See Where Support Goes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
