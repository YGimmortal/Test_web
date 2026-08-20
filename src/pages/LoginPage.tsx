import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { isValidEmail } from '../utils/helpers';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (path: string) => void;
  onLogin?: () => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!isValidEmail(email)) newErrors.email = 'Please enter a valid email';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin?.();
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
          <h1 className="text-4xl font-bold mb-6">Welcome back to HorizonAI</h1>
          <p className="text-lg text-white/80 mb-8">
            Access multiple AI models through a unified interface. 
            Get smarter responses with intelligent model routing.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-xl">🚀</span>
              </div>
              <div>
                <p className="font-medium">Lightning Fast</p>
                <p className="text-sm text-white/70">Get responses in seconds</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-xl">🔒</span>
              </div>
              <div>
                <p className="font-medium">Secure & Private</p>
                <p className="text-sm text-white/70">Your data is encrypted</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-xl">🧠</span>
              </div>
              <div>
                <p className="font-medium">Smart Routing</p>
                <p className="text-sm text-white/70">Best AI for every task</p>
              </div>
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
            <h1 className="text-2xl font-bold text-slate-100 mb-2">Sign in to HorizonAI</h1>
            <p className="text-slate-400">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter your password"
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
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500"
                />
                <span className="text-sm text-slate-400">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => onNavigate('/forgot-password')}
                className="text-sm text-indigo-400 hover:text-indigo-300"
              >
                Forgot password?
              </button>
            </div>

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
              Sign in
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('/signup')}
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Sign up for free
              </button>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
            <p className="text-sm text-slate-400 mb-2 font-medium">Demo Mode:</p>
            <p className="text-xs text-slate-500">
              Enter any email and password to try the demo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
