import { useEffect } from 'react';
import { cn } from '../../utils/helpers';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';

interface ToastProps {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
  onClose: (id: string) => void;
  duration?: number;
}

const icons = {
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
};

const colors = {
  success: 'border-green-500/30 bg-green-500/10',
  info: 'border-blue-500/30 bg-blue-500/10',
  warning: 'border-yellow-500/30 bg-yellow-500/10',
  error: 'border-red-500/30 bg-red-500/10',
};

const iconColors = {
  success: 'text-green-400',
  info: 'text-blue-400',
  warning: 'text-yellow-400',
  error: 'text-red-400',
};

export function Toast({ id, type, title, message, onClose, duration = 5000 }: ToastProps) {
  const Icon = icons[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, onClose, duration]);

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border shadow-lg',
        'animate-slide-in-right',
        colors[type],
        'min-w-[300px] max-w-md'
      )}
      role="alert"
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', iconColors[type])} />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-slate-100">{title}</p>
        {message && (
          <p className="text-sm text-slate-400 mt-0.5">{message}</p>
        )}
      </div>
      <button
        onClick={() => onClose(id)}
        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
}
