import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  enabled: boolean;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children, enabled }) => {
  // If phone frame is turned off or screen is already a small mobile screen, render clean fluid view
  if (!enabled) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col items-center">
        <div className="w-full max-w-md min-h-screen relative flex flex-col shadow-xs">
          {children}
        </div>
      </div>
    );
  }

  // Realistic time
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-stone-900/90 py-4 sm:py-8 px-2 flex flex-col items-center justify-center">
      {/* Device Body Container */}
      <div className="relative w-full max-w-[430px] h-[92vh] max-h-[890px] bg-[var(--bg)] text-[var(--ink)] rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-[10px] border-stone-800 dark:border-stone-950 flex flex-col overflow-hidden ring-1 ring-white/10">
        {/* Dynamic Island / Speaker Pill & Status Bar */}
        <div className="h-10 bg-[var(--bg)] dark:bg-[#0c2e19] px-6 flex items-center justify-between text-[11px] font-bold select-none text-[var(--ink)] z-40 shrink-0">
          <span>{currentTime}</span>

          {/* Notch Pill */}
          <div className="w-24 h-4.5 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-900/40" />
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>

        {/* Scrollable App Viewport */}
        <div className="flex-1 overflow-y-auto relative scrollbar-none flex flex-col">
          {children}
        </div>

        {/* Virtual Home Bar Indicator */}
        <div className="h-4 bg-[var(--bg)] flex items-center justify-center shrink-0 z-40">
          <div className="w-32 h-1 bg-stone-400 dark:bg-stone-600 rounded-full" />
        </div>
      </div>
    </div>
  );
};
