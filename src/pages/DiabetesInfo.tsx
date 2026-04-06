import { Eye, Zap, Droplet, Heart, Stethoscope, Footprints, Shield } from 'lucide-react';

export default function DiabetesInfo() {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };
  const effects = [
    {
      icon: Eye,
      title: 'Vision Problems & Blindness',
      description: 'Diabetes is a leading cause of blindness in adults. High blood sugar damages the blood vessels in the retina (diabetic retinopathy), which can lead to vision loss and eventually blindness. Glaucoma and cataracts are also significantly more common in people with diabetes.'
    },
    {
      icon: Zap,
      title: 'Nerve Damage (Diabetic Neuropathy)',
      description: 'Chronically high blood sugar damages nerves throughout the body, particularly in the hands and feet. Symptoms include numbness, tingling, burning pain, and loss of sensation. Severe nerve damage can result in loss of limb function.'
    },
    {
      icon: Droplet,
      title: 'Poor Wound Healing & Bleeding Issues',
      description: 'Diabetes impairs the body\'s ability to heal wounds. Even small cuts or sores can become serious infections. High blood sugar affects clotting and circulation, which means wounds heal more slowly and are at high risk of infection, sometimes requiring amputation.'
    },
    {
      icon: Heart,
      title: 'Cardiovascular Disease',
      description: 'People with diabetes are significantly more likely to develop heart disease, heart attacks, and strokes. High blood sugar damages blood vessels and promotes the buildup of plaque in arteries.'
    },
    {
      icon: Stethoscope,
      title: 'Kidney Damage (Diabetic Nephropathy)',
      description: 'Over time, high blood sugar damages the kidneys\' filtering system. Diabetic kidney disease is a leading cause of kidney failure and the need for dialysis.'
    },
    {
      icon: Footprints,
      title: 'Foot Complications',
      description: 'Nerve damage and poor circulation in the feet create a dangerous combination. Minor injuries can go unnoticed and become infected, sometimes resulting in amputation.'
    },
    {
      icon: Shield,
      title: 'Increased Infection Risk',
      description: 'High blood sugar weakens the immune system, making people with diabetes more susceptible to infections including skin infections, urinary tract infections, and pneumonia.'
    }
  ];

  const managementTips = [
    'Monitor Blood Sugar Regularly: Check glucose levels as recommended by your doctor. Keeping records helps identify patterns and triggers.',
    'Take Medications as Prescribed: Whether insulin or oral medications, consistency is key. Never skip doses without consulting your healthcare provider.',
    'Follow a Balanced Diet: Focus on whole grains, vegetables, lean proteins, and healthy fats. Limit processed foods, refined sugars, and high-sodium options.',
    'Stay Active: Regular physical activity helps lower blood sugar and improves insulin sensitivity. Aim for at least 30 minutes of moderate activity most days.',
    'Attend Regular Check-Ups: See your doctor regularly to monitor A1C levels, kidney function, eye health, and foot health.',
    'Manage Stress: Stress raises blood sugar. Mindfulness, exercise, and adequate sleep all help manage stress levels.',
    'Know the Signs of Low and High Blood Sugar: Learn to recognize hypoglycemia (shakiness, sweating, confusion) and hyperglycemia (excessive thirst, frequent urination) so you can act quickly.'
  ];

  const preventionTips = [
    'Maintain a Healthy Weight: Even modest weight loss (5 to 10% of body weight) can significantly reduce the risk of developing Type 2 diabetes.',
    'Eat a Nutritious Diet: Prioritize fiber-rich foods, whole grains, and vegetables. Limit sugary beverages and highly processed foods.',
    'Exercise Regularly: Physical activity helps your body use insulin more efficiently. Aim for at least 150 minutes of moderate exercise per week.',
    'Get Regular Health Screenings: Blood sugar screenings can catch prediabetes early, allowing for lifestyle changes before Type 2 diabetes develops.',
    'Limit Alcohol and Avoid Smoking: Both increase the risk of diabetes complications and metabolic dysfunction.',
    'Stay Informed: Know your family history. Those with a family history of diabetes should be especially proactive about healthy lifestyle habits and regular screenings.'
  ];

  return (
    <div className="bg-[#e8f4f8] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-center text-[#00529b] mb-12">
          Understanding Diabetes
        </h1>

        <section className="mb-16">
          <h2 className="text-4xl font-bold text-[#f58220] mb-8">
            The Effects of Diabetes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {effects.map((effect, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#e0f2f7] rounded-full flex items-center justify-center flex-shrink-0">
                    <effect.icon className="w-6 h-6 text-[#00529b]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#00529b] mb-2">
                      {effect.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {effect.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold text-[#f58220] mb-8">
            Managing Diabetes Day-to-Day
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="space-y-4">
              {managementTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#00529b] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-4xl font-bold text-[#f58220] mb-8">
            Preventing Type 2 Diabetes
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="space-y-4">
              {preventionTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#f58220] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-[#00529b] rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Help Us Fight Diabetes
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            We support diabetes patients with access to supplies, medication, and education. Your contribution makes a real difference.
          </p>
          <a
            href="mailto:reliefcarefoundation@gmail.com"
            className="inline-block bg-white text-[#00529b] font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
