import React from 'react';
import { CheckCircle2, AlertCircle, Info, Bell } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-14 left-4 right-4 z-50 max-w-sm mx-auto pointer-events-none animate-slide-down">
      <div className="bg-stone-900/95 text-stone-100 dark:bg-stone-100 dark:text-stone-900 px-4 py-3 rounded-2xl shadow-xl border border-stone-700/50 flex items-center gap-2.5 backdrop-blur-md">
        <Bell className="w-4 h-4 text-amber-400 shrink-0 animate-bounce" />
        <span className="text-xs font-bold leading-tight flex-1">{message}</span>
      </div>
    </div>
  );
};
