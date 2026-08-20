import { cn } from '../../utils/helpers';

interface LoadingStateProps {
  variant?: 'spinner' | 'dots' | 'skeleton' | 'text';
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingState({
  variant = 'spinner',
  text,
  size = 'md',
  className,
}: LoadingStateProps) {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  if (variant === 'spinner') {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
        <div
          className={cn(
            'border-2 border-slate-700 border-t-indigo-500 rounded-full animate-spin',
            sizeStyles[size]
          )}
        />
        {text && <p className="text-sm text-slate-400">{text}</p>}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        {text && <span className="text-sm text-slate-400 ml-2">{text}</span>}
      </div>
    );
  }

  if (variant === 'skeleton') {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="h-4 bg-slate-800 rounded animate-shimmer" />
        <div className="h-4 bg-slate-800 rounded animate-shimmer w-5/6" />
        <div className="h-4 bg-slate-800 rounded animate-shimmer w-4/6" />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <p className={cn('text-sm text-slate-400 loading-dots', className)}>
        {text || 'Loading'}
      </p>
    );
  }

  return null;
}

// Thinking indicator for AI responses
export function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-2 text-slate-400">
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="text-sm">Thinking</span>
    </div>
  );
}
