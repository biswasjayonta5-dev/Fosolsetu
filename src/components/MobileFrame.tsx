import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
  enabled?: boolean;
}

/**
 * Responsive Application Shell:
 * Replaces fixed phone frame with a professional full-width responsive layout.
 * Ensures the app occupies the full available browser viewport on laptops and desktops,
 * while maintaining a clean, touch-friendly interface on mobile and tablet screens.
 */
export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col w-full selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      <div className="w-full flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};
