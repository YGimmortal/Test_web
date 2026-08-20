import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { isValidEmail, getPasswordStrength } from '../utils/helpers';
import { Eye, EyeOff, Mail, Lock, User, Check, ArrowLeft } from 'lucide-react';

interface SignupPageProps {
  onNavigate: (path: string) => void;
  onSignup?: () => void;
}

export function SignupPage({ onNavigate, onSignup }: SignupPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string; general?: string }>({});

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const newErrors: typeof errors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!isValidEmail(email)) newErrors.email = 'Please enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agreeToTerms) newErrors.general = 'You must agree to the terms';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSignup?.();
      onNavigate('/chat');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-8">
            <span className="text-3xl font-bold">H</span>
          </div>
          <h1 className="text-4xl font-bold mb-6">Start your AI journey</h1>
          <p className="text-lg text-white/80 mb-8">
            Join thousands of users who are getting better results with HorizonAI.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center">
                <Check className="w-4 h-4 text-green-400" />
              </div>
              <span>Free to get started</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center">
                <Check className="w-4 h-4 text-green-400" />
              </div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center">
                <Check className="w-4 h-4 text-green-400" />
              </div>
              <span>Access to free AI models</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <button
            onClick={() => onNavigate('/')}
            className="lg:hidden flex items-center gap-2 mb-8"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="font-semibold text-xl text-slate-100">HorizonAI</span>
          </button>

          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-100 mb-2">Create your account</h1>
            <p className="text-slate-400">
              Start using HorizonAI for free today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              leftIcon={<User className="w-4 h-4" />}
              autoComplete="name"
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              leftIcon={<Mail className="w-4 h-4" />}
              autoComplete="email"
            />

            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                leftIcon={<Lock className="w-4 h-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                autoComplete="new-password"
              />
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    <div className={`h-1 flex-1 rounded ${passwordStrength === 'weak' ? 'bg-red-500' : passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`} />
                    <div className={`h-1 flex-1 rounded ${['medium', 'strong'].includes(passwordStrength) ? (passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500') : 'bg-slate-700'}`} />
                    <div className={`h-1 flex-1 rounded ${passwordStrength === 'strong' ? 'bg-green-500' : 'bg-slate-700'}`} />
                  </div>
                  <p className="text-xs text-slate-500">
                    Password strength: <span className={
                      passwordStrength === 'weak' ? 'text-red-400' :
                      passwordStrength === 'medium' ? 'text-yellow-400' : 'text-green-400'
                    }>{passwordStrength}</span>
                  </p>
                </div>
              )}
            </div>

            <Input
              label="Confirm password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              leftIcon={<Lock className="w-4 h-4" />}
              autoComplete="new-password"
            />

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-400">
                I agree to the{' '}
                <button type="button" className="text-indigo-400 hover:text-indigo-300">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-indigo-400 hover:text-indigo-300">
                  Privacy Policy
                </button>
              </span>
            </label>

            {errors.general && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {errors.general}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              className="h-11"
            >
              Create account
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('/login')}
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>

          {/* Demo Note */}
          <div className="mt-8 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
            <p className="text-sm text-slate-400 mb-2 font-medium">Demo Mode:</p>
            <p className="text-xs text-slate-500">
              Fill in any details to try the demo. No real account is created.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
