import { ExternalLink } from 'lucide-react';

export default function AdditionalSupport() {
  const governmentPrograms = [
    {
      name: 'HealthCare.gov (Marketplace Insurance)',
      description: 'The Health Insurance Marketplace helps people find affordable health plans. Depending on income, you may qualify for premium tax credits or cost-sharing reductions that lower monthly payments and out-of-pocket costs. Most plans include coverage for doctor visits, prescriptions, and preventive services. You can apply during Open Enrollment (November–January) or with a Special Enrollment Period if you experience qualifying life changes such as job loss or a move.',
      eligibility: [
        'U.S. citizen or lawfully present immigrant living in the U.S. and cannot be incarcerated.',
        'Must not be eligible for Medicare or non-emergency Medicaid.',
        'You can be eligible if you have employer coverage, but you\'ll only qualify for premium tax credits if that coverage is deemed unaffordable or lacks minimum value.',
        'Income typically between 100% and 400% of the Federal Poverty Level (FPL) may qualify for premium tax credits, though the 400% FPL upper income limit is currently suspended through 2025.',
        'You can apply during Open Enrollment (Nov–Jan) or with a Special Enrollment Period if you have life changes (job loss, move, etc.).'
      ],
      url: 'https://www.healthcare.gov/apply-and-enroll/how-to-apply/'
    },
    {
      name: 'Medicare (Federal Health Insurance for Aged and Disabled)',
      description: 'Medicare provides federal health insurance for adults aged 65 and older, and for some younger individuals with disabilities or certain medical conditions. It consists of multiple parts: Part A covers hospital care (often free if you have paid Medicare taxes), Part B covers doctor visits and outpatient care, Part D covers prescription drugs, and the Extra Help program reduces prescription costs for those with limited income.',
      eligibility: [
        'Age/Disability: Generally age 65 or older, OR under 65 with certain disabilities, OR any age with End-Stage Renal Disease (ESRD) or ALS.',
        'Work Credits: Must have at least 10 years (40 quarters) of Medicare-covered employment to qualify for premium-free Part A. You can buy Part A if you have fewer credits.',
        'Enrollment is based on initial enrollment periods (around age 65 or a 24-month waiting period after disability) or Special Enrollment Periods.'
      ],
      url: 'https://www.medicare.gov/basics/costs/help/drug-costs'
    },
    {
      name: 'Medicaid / CHIP (Free or Low-Cost Coverage)',
      description: 'Medicaid (for adults) and CHIP (for children) provide free or very low-cost health coverage for people with limited income. Coverage typically includes doctor visits, prescriptions, hospital care, lab tests, and preventive services. There is no open enrollment period : you can apply anytime year-round.',
      eligibility: [
        'U.S. citizens or certain qualified noncitizens (lawfully present immigrants may face a five-year wait, depending on the state).',
        'Based on household income (typically MAGI) and family size, with limits that vary by state.',
        'Generally available to: Low-income adults, Pregnant individuals, Children under 19 (via CHIP or Medicaid), Seniors and people with disabilities (in some states).',
        'No open enrollment period : you can apply anytime year-round.'
      ],
      url: 'https://www.healthcare.gov/medicaid-chip/'
    },
    {
      name: 'Medi-Cal (California Residents Only)',
      description: 'Medi-Cal is California\'s version of Medicaid. It now covers all low-income residents, including undocumented adults. Medi-Cal covers doctor visits, prescriptions, hospital care, lab work, and preventive services at no or very low cost.',
      eligibility: [
        'Adults (ages 19–64): income ≤ 138% of the Federal Poverty Level (FPL)',
        'Children (ages 0–18): income ≤ 266% FPL',
        'Pregnant individuals: income ≤ 213% FPL'
      ],
      url: 'https://www.coveredca.com/medi-cal/'
    },
    {
      name: 'Dual Special Needs Plans (D-SNP)',
      description: 'D-SNPs are special Medicare Advantage plans for people who qualify for both Medicare and Medicaid (Medi-Cal in California). They combine medical, prescription, and often dental/vision benefits into one coordinated plan. Enrollees can receive integrated care and potentially reduce their out-of-pocket expenses on medications and treatments.',
      eligibility: [
        'Must be enrolled in both Medicare (Parts A and B) and Medicaid (Medi-Cal in CA).',
        'Typically for people who: Are 65+ years old or have qualifying disabilities, Have limited income/resources (qualify for Medicaid).',
        'You must live in an area where a D-SNP is offered.'
      ],
      url: 'https://www.medicare.gov/plan-compare/#/?year=2025&lang=en'
    }
  ];

  const patientAssistance = [
    {
      name: 'PAN Foundation (Help with Copays & Premiums)',
      description: 'The PAN Foundation offers grants to help pay for insurance copays, deductibles, premiums, and travel expenses related to treatment. It supports people with serious or chronic conditions who have insurance but still struggle with high out-of-pocket costs. Applications are completed online, and funds are often first-come, first-served.',
      eligibility: [
        'Must have active health insurance (private, employer, or government).',
        'Have a diagnosed chronic or rare disease covered by one of PAN\'s open disease funds.',
        'Income must fall at or below a specific percentage of the FPL, which varies by the disease fund (typically 300% to 500% FPL).',
        'Must be receiving treatment in the U.S. or U.S. territories.'
      ],
      url: 'https://www.panfoundation.org/apply-and-manage-grants/applying-for-grants/'
    },
    {
      name: 'Patient Advocate Foundation (Co-Pay Relief Program)',
      description: 'This program provides financial assistance directly to patients who need help paying for prescription medications or treatments. The foundation can also help with appeals, case management, and insurance denials at no cost.',
      eligibility: [
        'Must have active health insurance (any type).',
        'Household income must be at or below a set FPL percentage, which varies by the disease fund (typically 400% to 500% FPL).',
        'Diagnosed with a condition covered by an open assistance fund.',
        'Currently receiving prescribed treatment by a U.S.-licensed provider.'
      ],
      url: 'https://www.patientadvocate.org/connect-with-services/copay-relief/'
    }
  ];

  const manufacturerPrograms = [
    {
      name: 'Pfizer RxPathways',
      description: 'Pfizer RxPathways connects eligible patients to free or discounted Pfizer prescription medicines. Assistance is available to people who are uninsured or whose insurance doesn\'t fully cover their medication. Applicants typically need to provide income documentation and a valid prescription from a healthcare provider.',
      eligibility: [
        'U.S. resident with a valid prescription for a Pfizer medication.',
        'May be uninsured or insured but with high out-of-pocket costs.',
        'Household income usually ≤ 300% of the Federal Poverty Level (FPL) for most products.',
        'Must be treated by a U.S.-licensed healthcare provider.'
      ],
      url: 'https://www.pfizerrxpathways.com/find-program'
    },
    {
      name: 'AbbVie Patient Assistance Program',
      description: 'This program provides certain AbbVie prescription drugs at no cost for eligible patients who cannot afford them. Both uninsured and underinsured individuals may qualify. Applications can be submitted through your healthcare provider.',
      eligibility: [
        'U.S. resident with a valid prescription for an AbbVie medication.',
        'Uninsured or insured but cannot afford copayments or coinsurance.',
        'Household income limit varies by medication and program (generally ≤ 400% to 600% of the Federal Poverty Level).',
        'Must be receiving treatment in the U.S. or its territories.'
      ],
      url: 'https://www.abbvie.com/patients/patient-support/patient-assistance.html'
    },
    {
      name: 'NeedyMeds',
      description: 'NeedyMeds is a national nonprofit that offers free information on assistance programs, including those run by drug manufacturers and community clinics. You can search by medication, condition, or location to find discount cards, coupons, and free/low-cost clinics near you. No application or income verification is required to access most tools.',
      eligibility: [
        'No direct eligibility limits (NeedyMeds is an informational resource).',
        'Anyone can search for and use its free discount cards, clinic locator, and assistance databases.',
        'No application or income verification required to access most tools.'
      ],
      url: 'https://www.needymeds.org/'
    },
    {
      name: 'RxAssist',
      description: 'RxAssist provides a searchable database of patient assistance programs offered by pharmaceutical companies. It helps patients and providers locate free or low-cost medication options and learn how to apply for help directly from the drug manufacturer.',
      eligibility: [
        'Like NeedyMeds, it\'s an informational platform : no direct eligibility.',
        'Anyone can use it to find and apply for manufacturer patient assistance programs.',
        'Each program found through RxAssist has its own specific requirements (usually based on income, insurance, and U.S. residency).'
      ],
      url: 'https://www.rxassist.org/'
    }
  ];

  const ProgramCard = ({ program }: { program: any }) => (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-bold text-[#00529b] mb-3">{program.name}</h3>
      <p className="text-slate-600 mb-4 leading-relaxed">{program.description}</p>

      {program.eligibility && program.eligibility.length > 0 && (
        <div className="bg-[#e0f2f7] rounded-lg p-4 mb-4">
          <h4 className="font-bold text-[#00529b] mb-2">Eligibility:</h4>
          <ul className="space-y-1 text-sm text-slate-700">
            {program.eligibility.map((item: string, index: number) => (
              <li key={index} className="leading-relaxed">• {item}</li>
            ))}
          </ul>
        </div>
      )}

      <a
        href={program.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 bg-[#00529b] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#003d75] transition-colors"
      >
        <span>Visit Website</span>
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );

  return (
    <div className="bg-[#e8f4f8] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-center text-[#00529b] mb-8">
          Find Affordable Medication & Insurance
        </h1>

        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg text-slate-700 text-center leading-relaxed">
            Managing diabetes can be financially challenging. These resources can help you find affordable health coverage and medication assistance. Each program has specific eligibility requirements : explore the options below to find support that fits your situation.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#f58220] mb-6">Government Programs</h2>
          <div className="grid grid-cols-1 gap-6">
            {governmentPrograms.map((program, index) => (
              <ProgramCard key={index} program={program} />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#f58220] mb-6">Patient Assistance Foundations</h2>
          <div className="grid grid-cols-1 gap-6">
            {patientAssistance.map((program, index) => (
              <ProgramCard key={index} program={program} />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#f58220] mb-6">Manufacturer Programs & Resource Databases</h2>
          <div className="grid grid-cols-1 gap-6">
            {manufacturerPrograms.map((program, index) => (
              <ProgramCard key={index} program={program} />
            ))}
          </div>
        </div>

        <div className="bg-[#00529b] rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Need Help Navigating These Resources?
          </h2>
          <p className="text-lg mb-6">
            Contact us for guidance and support in accessing diabetes care resources.
          </p>
          <a
            href="mailto:reliefcarefoundation@gmail.com"
            className="inline-block bg-white text-[#00529b] font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
