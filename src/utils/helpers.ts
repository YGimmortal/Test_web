import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge Tailwind classes with clsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to relative time
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

// Format large numbers
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Format tokens with commas
export function formatTokens(num: number): string {
  return num.toLocaleString();
}

// Get model tier badge color
export function getTierColor(tier: string): string {
  switch (tier) {
    case 'premium2':
      return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
    case 'premium1':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'free':
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
}

// Get speed indicator color
export function getSpeedColor(speed: string): string {
  switch (speed) {
    case 'fast':
      return 'text-green-400';
    case 'medium':
      return 'text-yellow-400';
    case 'slow':
      return 'text-red-400';
    default:
      return 'text-slate-400';
  }
}

// Get quality indicator color
export function getQualityColor(quality: string): string {
  switch (quality) {
    case 'premium':
      return 'text-pink-400';
    case 'excellent':
      return 'text-purple-400';
    case 'good':
      return 'text-blue-400';
    case 'basic':
      return 'text-slate-400';
    default:
      return 'text-slate-400';
  }
}

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength
export function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  if (password.length < 8) return 'weak';
  if (password.length < 12) return 'medium';
  if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
    return 'strong';
  }
  return 'medium';
}

// Copy to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// Parse markdown-like content (basic implementation)
export function parseContent(content: string): string {
  // This is a placeholder - in production, use a proper markdown parser
  return content;
}

// Get greeting based on time
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}
