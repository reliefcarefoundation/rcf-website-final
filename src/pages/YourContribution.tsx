import { useNavigate } from 'react-router-dom';
import { DollarSign } from 'lucide-react';

export default function YourContribution() {
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

  const handleSeeWhereFundsGo = () => {
    navigate('/where-support-goes');
    window.scrollTo(0, 0);
  };

  const donationTiers = [
    {
      amount: '$25',
      description: 'Helps fund a week\'s supply of glucose test strips for a patient in need'
    },
    {
      amount: '$50',
      description: 'Contributes toward insulin costs for a patient who cannot afford their monthly supply'
    },
    {
      amount: '$100',
      description: 'Supports participation in a community diabetes education program'
    },
    {
      amount: '$500+',
      description: 'Makes a significant impact on hospital diabetes care resources and patient education programs'
    }
  ];

  return (
    <div className="bg-[#e8f4f8] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-center text-[#00529b] mb-8">
          Your Contribution Matters
        </h1>

        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg text-slate-700 text-center leading-relaxed">
            Every contribution, no matter the size, makes a real difference in the lives of diabetes patients and their families in communities we serve. Your support provides access to life-saving medications, essential supplies, and empowering education that transforms lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {donationTiers.map((tier, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#e0f2f7] rounded-full flex items-center justify-center mr-4">
                  <DollarSign className="w-6 h-6 text-[#00529b]" />
                </div>
                <h3 className="text-3xl font-bold text-[#f58220]">
                  {tier.amount}
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {tier.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-8 shadow-md mb-12">
          <h2 className="text-3xl font-bold text-[#00529b] mb-6 text-center">
            Life-Changing Support
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-slate-700 leading-relaxed">
            <p>
              For many people living with diabetes, access to insulin and supplies isn't just about managing a condition, it's about survival. The cost of diabetes care can be overwhelming, forcing patients to make impossible choices between medication and other basic needs.
            </p>
            <p>
              Your contribution directly addresses this crisis. When you support Relief Care Foundation, you help provide patients with the insulin they need to stay alive. You help give families access to glucose monitors that prevent dangerous complications. You help fund education programs that teach people how to navigate insurance coverage and manage their condition effectively.
            </p>
            <p>
              Beyond the immediate medical support, your donation reduces the financial burden on families already stretched thin. It provides peace of mind. It offers hope. It shows that their community cares about their wellbeing.
            </p>
            <p>
              Your support helps improve health in our community, prevent complications, and ultimately save lives. This is the real, human impact of your generosity.
            </p>
          </div>
        </div>

        <div className="bg-[#00529b] rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Make Your Impact Today</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join us in fighting diabetes and supporting communities in need. Every contribution brings us closer to a future where no one goes without the care they need.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={scrollToDonate}
              className="bg-white text-[#00529b] font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Your Impact Today
            </button>
            <button
              onClick={handleSeeWhereFundsGo}
              className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-[#00529b] transition-colors"
            >
              See Where Funds Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
