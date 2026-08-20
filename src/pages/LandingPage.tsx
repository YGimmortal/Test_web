import { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent } from '../components/ui/Card';
import { mockModels, mockPlans, faqData } from '../data/mockData';
import { cn } from '../utils/helpers';
import {
  Sparkles,
  Zap,
  Brain,
  Code,
  Palette,
  Shield,
  Rocket,
  ArrowRight,
  Check,
  ChevronDown,
  MessageSquare,
  Cpu,
  Layers,
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar isLoggedIn={false} onNavigate={onNavigate} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px]" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge variant="info" size="md" className="mb-6">
            <Sparkles className="w-3 h-3 mr-1" />
            Introducing HorizonAI
          </Badge>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-100 mb-6 leading-tight">
            One place for
            <span className="gradient-text"> smarter AI</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Access multiple AI models through a unified interface. 
            HorizonAI intelligently routes your requests to the best model for every task.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/chat')}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="h-12 px-8 text-base"
            >
              Try HorizonAI Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('/models')}
              className="h-12 px-8 text-base"
            >
              Explore Models
            </Button>
          </div>

          {/* Hero Visual - Chat Preview */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="relative bg-bg-card border border-border-default rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-4 text-left">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-slate-400">U</span>
                  </div>
                  <div className="bg-indigo-600 rounded-2xl rounded-tl-none px-4 py-2 text-white max-w-md">
                    Help me create a Python script to analyze sales data
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-bg-tertiary border border-border-default rounded-2xl rounded-tl-none px-4 py-3 max-w-lg">
                    <p className="text-slate-300 text-sm">
                      I'll help you create a Python script for sales data analysis. 
                      Here's a comprehensive solution using pandas...
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                      <Badge variant="default" size="sm">Horizon Auto</Badge>
                      <span>• Generated in 1.2s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
              Everything you need in one place
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              HorizonAI brings together the best AI models with intelligent routing, 
              so you always get the right tool for the job.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="Smart Routing"
              description="Horizon Auto analyzes your request and automatically selects the best AI model for optimal results."
            />
            <FeatureCard
              icon={<Layers className="w-6 h-6" />}
              title="Multiple Models"
              description="Access 10+ AI models from different providers, all through a single unified interface."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Lightning Fast"
              description="Get responses in seconds with our optimized infrastructure and smart model selection."
            />
            <FeatureCard
              icon={<Code className="w-6 h-6" />}
              title="Code Expert"
              description="Specialized models for coding, debugging, and software development across all languages."
            />
            <FeatureCard
              icon={<Palette className="w-6 h-6" />}
              title="Creative Assistant"
              description="Models optimized for writing, content creation, and creative brainstorming sessions."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Secure & Private"
              description="Your conversations are encrypted and never used to train models without consent."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
              How HorizonAI works
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Our intelligent system ensures you get the best response every time.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              number={1}
              title="You send a prompt"
              description="Describe what you need in natural language."
              icon={<MessageSquare className="w-6 h-6" />}
            />
            <StepCard
              number={2}
              title="Horizon analyzes"
              description="Our system understands your task requirements."
              icon={<Cpu className="w-6 h-6" />}
            />
            <StepCard
              number={3}
              title="Best AI selected"
              description="Automatically routes to the optimal model."
              icon={<Layers className="w-6 h-6" />}
            />
            <StepCard
              number={4}
              title="Response delivered"
              description="Get high-quality results in seconds."
              icon={<Rocket className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>

      {/* Models Preview */}
      <section className="py-20 px-4 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
              Powerful AI models at your fingertips
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              From fast everyday models to ultra-powerful reasoning engines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {mockModels.slice(0, 6).map((model) => (
              <Card key={model.id} hover className="bg-bg-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-slate-100">{model.name}</h3>
                      <p className="text-sm text-slate-500">{model.provider}</p>
                    </div>
                    {model.tier !== 'free' ? (
                      <Badge variant={model.tier === 'premium2' ? 'premium2' : 'premium1'}>
                        {model.tier === 'premium2' ? 'Ultra' : 'Premium'}
                      </Badge>
                    ) : (
                      <Badge variant="default">Free</Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mb-4">{model.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {model.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-slate-800 text-slate-400 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              variant="outline"
              onClick={() => onNavigate('/models')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View all models
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Start free and upgrade as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {mockPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-8 rounded-2xl border ${
                  plan.isPopular
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-border-default bg-bg-card'
                }`}
              >
                {plan.isPopular && (
                  <Badge variant="premium" className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-slate-100">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-slate-100">{plan.price}</span>
                    <span className="text-slate-500">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.slice(0, 5).map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.isPopular ? 'primary' : 'outline'}
                  fullWidth
                  onClick={() => onNavigate('/pricing')}
                >
                  {plan.id === 'free' ? 'Get Started' : 'Upgrade'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-bg-secondary">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
              Ready to experience smarter AI?
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already getting better results with HorizonAI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('/signup')}
                className="h-12 px-8"
              >
                Start for free
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('/pricing')}
                className="h-12 px-8"
              >
                View pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-default py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="font-semibold text-slate-100">HorizonAI</span>
              </div>
              <p className="text-sm text-slate-500">
                One place for smarter AI. Access multiple models through a unified interface.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><button onClick={() => onNavigate('/models')} className="hover:text-slate-200">Models</button></li>
                <li><button onClick={() => onNavigate('/pricing')} className="hover:text-slate-200">Pricing</button></li>
                <li><button onClick={() => onNavigate('/chat')} className="hover:text-slate-200">Chat</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-200 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><button onClick={() => onNavigate('/about')} className="hover:text-slate-200">About</button></li>
                <li><a href="#" className="hover:text-slate-200">Blog</a></li>
                <li><a href="#" className="hover:text-slate-200">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-200 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-slate-200">Privacy</a></li>
                <li><a href="#" className="hover:text-slate-200">Terms</a></li>
                <li><a href="#" className="hover:text-slate-200">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border-default text-center text-sm text-slate-500">
            © 2024 HorizonAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card hover className="bg-bg-card">
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
        <p className="text-slate-400">{description}</p>
      </CardContent>
    </Card>
  );
}

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function StepCard({ number, title, description, icon }: StepCardProps) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <div className="text-3xl font-bold text-slate-700 mb-2">{number}</div>
      <h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
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
        <ChevronDown
          className={cn(
            'w-5 h-5 text-slate-400 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-slate-400">
          {answer}
        </div>
      )}
    </div>
  );
}
