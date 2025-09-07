'use client';

import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110 ${
        isDark 
          ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' 
          : 'bg-gray-800 text-white hover:bg-gray-700'
      }`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="text-xl">
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  );
}
