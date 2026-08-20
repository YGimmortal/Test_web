import { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { mockPlans } from '../data/mockData';
import { Check, X, Sparkles, HelpCircle } from 'lucide-react';

interface PricingPageProps {
  onNavigate: (path: string) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);

  const handleUpgrade = (planId: string) => {
    setSelectedPlan(planId);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar isLoggedIn={true} onNavigate={onNavigate} />

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-100 mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Start free and upgrade as you grow. No hidden fees, cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-3">
              <span className={`text-sm ${!isAnnual ? 'text-slate-200' : 'text-slate-500'}`}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-12 h-6 rounded-full bg-slate-700 transition-colors"
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-indigo-500 transition-transform ${isAnnual ? 'left-7' : 'left-1'}`} />
              </button>
              <span className={`text-sm ${isAnnual ? 'text-slate-200' : 'text-slate-500'}`}>
                Annual
                <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-green-500/20 text-green-400 rounded">-20%</span>
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {mockPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-8 ${
                  plan.isPopular
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-border-default bg-bg-card'
                }`}
              >
                {plan.isPopular && (
                  <Badge variant="premium" className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-100">
                      {plan.id === 'free' ? '$0' : isAnnual ? `$${Math.floor(parseInt(plan.price.slice(1)) * 0.8)}` : plan.price}
                    </span>
                    <span className="text-slate-500">/{plan.id === 'free' ? 'forever' : isAnnual ? 'month, billed yearly' : 'month'}</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, i) => (
                    <li key={`lim-${i}`} className="flex items-start gap-3 text-sm">
                      <X className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-500">{limitation}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.isPopular ? 'primary' : plan.id === 'free' ? 'outline' : 'outline'}
                  fullWidth
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={plan.id === 'free'}
                >
                  {plan.id === 'free' ? 'Current Plan' : 'Upgrade'}
                </Button>
              </div>
            ))}
          </div>

          {/* Feature Comparison */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-100 text-center mb-8">
              Compare features
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-default">
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Feature</th>
                    <th className="text-center py-4 px-4 text-slate-100 font-semibold">Free</th>
                    <th className="text-center py-4 px-4 text-purple-400 font-semibold">Premium</th>
                    <th className="text-center py-4 px-4 text-pink-400 font-semibold">Ultra</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Free AI models', free: true, premium: true, ultra: true },
                    { feature: 'Horizon Auto routing', free: true, premium: true, ultra: true },
                    { feature: 'Premium models', free: false, premium: true, ultra: true },
                    { feature: 'Ultra models', free: false, premium: false, ultra: true },
                    { feature: 'Daily requests', free: '100', premium: '500', ultra: 'Unlimited' },
                    { feature: 'Context window', free: '128K', premium: '200K', ultra: '512K' },
                    { feature: 'Response speed', free: 'Standard', premium: 'Fast', ultra: 'Priority' },
                    { feature: 'Support', free: 'Community', premium: 'Priority', ultra: 'Dedicated' },
                    { feature: 'API access', free: false, premium: false, ultra: true },
                    { feature: 'Team features', free: false, premium: false, ultra: true },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border-default/50">
                      <td className="py-4 px-4 text-slate-300">{row.feature}</td>
                      <td className="py-4 px-4 text-center">
                        {typeof row.free === 'boolean' ? (
                          row.free ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />
                        ) : (
                          <span className="text-slate-300">{row.free}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {typeof row.premium === 'boolean' ? (
                          row.premium ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />
                        ) : (
                          <span className="text-slate-300">{row.premium}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {typeof row.ultra === 'boolean' ? (
                          row.ultra ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />
                        ) : (
                          <span className="text-slate-300">{row.ultra}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mt-20">
            <h2 className="text-2xl font-bold text-slate-100 text-center mb-8">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              <FAQItem
                question="Can I change my plan later?"
                answer="Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
              />
              <FAQItem
                question="What happens if I exceed my limits?"
                answer="When you reach your usage limit, you'll need to wait until the next reset period or upgrade your plan."
              />
              <FAQItem
                question="Is there a free trial for Premium?"
                answer="We occasionally offer free trials. Follow us on social media or check back here for promotions."
              />
              <FAQItem
                question="Do you offer refunds?"
                answer="Yes, we offer a 7-day money-back guarantee for all paid plans. No questions asked."
              />
            </div>
          </div>
        </div>
      </main>

      {/* Upgrade Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Upgrade Your Plan"
        size="md"
      >
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mb-2">
            Ready to upgrade?
          </h3>
          <p className="text-slate-400 mb-6">
            You're about to upgrade to the {selectedPlan === 'premium1' ? 'Premium' : 'Ultra'} plan.
            This is a demo - no payment will be processed.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                setShowModal(false);
                // In production, this would initiate payment flow
              }}
            >
              Continue (Demo)
            </Button>
            <Button
              variant="ghost"
              fullWidth
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border-default rounded-xl bg-bg-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <span className="font-medium text-slate-200">{question}</span>
        <HelpCircle className="w-5 h-5 text-slate-400" />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-slate-400">
          {answer}
        </div>
      )}
    </div>
  );
}
