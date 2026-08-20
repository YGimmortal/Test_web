// HorizonAI Type Definitions

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'premium1' | 'premium2';
  createdAt: Date;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  model?: string;
  timestamp: Date;
  isStreaming?: boolean;
  metadata?: {
    model?: string;
    tokens?: number;
    duration?: number;
  };
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  isFavorite?: boolean;
  isArchived?: boolean;
}

export interface Model {
  id: string;
  name: string;
  provider: string;
  description: string;
  capabilities: string[];
  speed: 'fast' | 'medium' | 'slow';
  quality: 'basic' | 'good' | 'excellent' | 'premium';
  tier: 'free' | 'premium1' | 'premium2';
  contextWindow: number;
  isAvailable: boolean;
  tags: string[];
}

export interface UsageStats {
  tokensUsed: number;
  tokensLimit: number;
  requestsToday: number;
  requestsLimit: number;
  resetTime: Date;
  percentageUsed: number;
}

export interface Plan {
  id: 'free' | 'premium1' | 'premium2';
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  limitations: string[];
  isPopular?: boolean;
  color: string;
}

export interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
  duration?: number;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
}
