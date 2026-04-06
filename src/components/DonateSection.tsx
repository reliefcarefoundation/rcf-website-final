import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const ZELLE_EMAIL = 'reliefcarefoundation@gmail.com';
const ZELLE_TAG = 'relief-care-foundation';

export default function DonateSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTag, setCopiedTag] = useState(false);

  const donationImpacts = [
    {
      amount: 25,
      impact: "Covers a week's supply of glucose test strips for a patient who cannot afford them"
    },
    {
      amount: 50,
      impact: "Helps fund a month of diabetes management education for a patient and their family"
    },
    {
      amount: 100,
      impact: "Contributes toward insulin costs for a patient with no insurance coverage"
    },
    {
      amount: 250,
      impact: "Helps a community hospital restock critical diabetes supplies for multiple patients"
    },
    {
      amount: 500,
      impact: "Makes a significant contribution toward community hospital diabetes care programs"
    }
  ];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(ZELLE_EMAIL);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopyTag = async () => {
    try {
      await navigator.clipboard.writeText(ZELLE_TAG);
      setCopiedTag(true);
      setTimeout(() => setCopiedTag(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section id="donate-section" className="py-16 bg-[#00529b]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-4">
            Donate to Relief Care Foundation
          </h2>
          <p className="text-lg text-white">
            Your donation directly supports diabetes patients and community hospitals. Every contribution makes a difference.
          </p>
        </div>

        <div className="mb-10">
          <p className="text-xl text-white font-semibold mb-4 text-center">
            Send your donation via Zelle to:
          </p>

          <div className="bg-white rounded-lg p-6 shadow-xl max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-3xl font-bold text-[#00529b] break-all">
                  {ZELLE_EMAIL}
                </p>
              </div>
              <button
                onClick={handleCopyEmail}
                className="flex-shrink-0 bg-[#00529b] text-white px-4 py-3 rounded-lg hover:bg-[#003d75] transition-colors flex items-center space-x-2 font-semibold"
                title="Copy to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <p className="text-sm text-slate-600 mb-2">Or use Zelle tag:</p>
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xl font-bold text-[#00529b] break-all">
                    {ZELLE_TAG}
                  </p>
                </div>
                <button
                  onClick={handleCopyTag}
                  className="flex-shrink-0 bg-[#00529b] text-white px-4 py-2 rounded-lg hover:bg-[#003d75] transition-colors flex items-center space-x-2 font-semibold text-sm"
                  title="Copy to clipboard"
                >
                  {copiedTag ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Your Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {donationImpacts.map((item) => (
              <div
                key={item.amount}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <p className="text-2xl font-bold text-[#00529b] mb-3">
                  ${item.amount}{item.amount === 500 ? '+' : ''}
                </p>
                <p className="text-slate-700 leading-relaxed">
                  {item.impact}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-white mt-10">
          Questions? Contact us at <a href="mailto:reliefcarefoundation@gmail.com" className="font-semibold underline hover:text-gray-200">reliefcarefoundation@gmail.com</a>
        </p>
      </div>
    </section>
  );
}
