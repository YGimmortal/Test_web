import { useState } from 'react';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Menu, X, ChevronRight } from 'lucide-react';

interface NavbarProps {
  isLoggedIn?: boolean;
  onNavigate: (path: string) => void;
}

export function Navbar({ isLoggedIn = false, onNavigate }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Chat', href: '/chat' },
    { label: 'Models', href: '/models' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-bg-primary/80 backdrop-blur-lg border-b border-border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="font-semibold text-xl text-slate-100 group-hover:text-white transition-colors">
              HorizonAI
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => onNavigate(link.href)}
                className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors rounded-lg hover:bg-slate-800"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => onNavigate('/chat')}>
                  Go to Chat
                </Button>
                <Avatar name="Demo User" size="sm" />
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('/login')}
                >
                  Log in
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onNavigate('/signup')}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border-default bg-bg-primary">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  onNavigate(link.href);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 text-left text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
              >
                {link.label}
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            ))}
            <div className="pt-4 mt-4 border-t border-border-default space-y-2">
              {isLoggedIn ? (
                <>
                  <Button variant="primary" fullWidth onClick={() => { onNavigate('/chat'); setIsMobileMenuOpen(false); }}>
                    Go to Chat
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => { onNavigate('/login'); setIsMobileMenuOpen(false); }}
                  >
                    Log in
                  </Button>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => { onNavigate('/signup'); setIsMobileMenuOpen(false); }}
                  >
                    Sign up free
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
