import { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Toast({ message, type = 'success', isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 transform">
      <div
        className={cn(
          'flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg',
          type === 'success' && 'bg-green-600 text-white',
          type === 'error' && 'bg-red-600 text-white'
        )}
      >
        {type === 'success' && <CheckCircle2 className="h-5 w-5" />}
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-80">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

