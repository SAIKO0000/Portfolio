'use client';

import { useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'portfolio-theme';
const THEME_CHANGE_EVENT = 'portfolio-theme-change';

function readStoredTheme(): Theme | null {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document
    .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#181815' : '#F5F2EA');
  window.dispatchEvent(new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: theme }));
}

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function subscribeToTheme(onStoreChange: () => void) {
  const colorPreference = window.matchMedia('(prefers-color-scheme: dark)');
  const followSystemTheme = (event: MediaQueryListEvent) => {
    if (readStoredTheme()) return;
    applyTheme(event.matches ? 'dark' : 'light');
  };

  colorPreference.addEventListener('change', followSystemTheme);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);

  return () => {
    colorPreference.removeEventListener('change', followSystemTheme);
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
  };
}

interface ThemeToggleProps {
  compact?: boolean;
}

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => 'light');

  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const actionLabel = `Switch to ${nextTheme} mode`;

  const toggleTheme = () => {
    applyTheme(nextTheme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // The selected theme still applies for the current page when storage is unavailable.
    }
  };

  return (
    <button
      className={`theme-toggle${compact ? ' theme-toggle--compact' : ''}`}
      type="button"
      aria-label={actionLabel}
      title={compact ? actionLabel : undefined}
      onClick={toggleTheme}
    >
      {!compact && <span className="theme-toggle__label">Appearance</span>}
      <span className="theme-toggle__state" aria-hidden="true">
        {!compact && <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>}
        <span className="theme-toggle__icon">
          <svg className="theme-toggle__sun" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M12 2.5V5M12 19V21.5M2.5 12H5M19 12H21.5M5.3 5.3L7.1 7.1M16.9 16.9L18.7 18.7M18.7 5.3L16.9 7.1M7.1 16.9L5.3 18.7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
          <svg className="theme-toggle__moon" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 15.2A8.5 8.5 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="miter"
            />
          </svg>
        </span>
      </span>
    </button>
  );
}
