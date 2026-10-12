'use client';

import { useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';
type ThemePreference = 'system' | Theme;

const THEME_STORAGE_KEY = 'portfolio-theme';
const listeners = new Set<() => void>();
let currentPreference: ThemePreference = 'system';
let initialized = false;
let colorPreference: MediaQueryList | null = null;
let storageAvailable = true;

function readStoredPreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : 'system';
  } catch {
    storageAvailable = false;
    return 'system';
  }
}

function resolveTheme(preference: ThemePreference): Theme {
  return preference === 'system'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    : preference;
}

function applyTheme(preference: ThemePreference) {
  const theme = resolveTheme(preference);
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#181815' : '#FAF9F6');
}

function notify() {
  listeners.forEach((listener) => listener());
}

function onSystemChange() {
  if (currentPreference === 'system') {
    applyTheme(currentPreference);
    notify();
  }
}

function onStorageChange(event: StorageEvent) {
  if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
  currentPreference = readStoredPreference();
  applyTheme(currentPreference);
  notify();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!initialized) {
    initialized = true;
    if (storageAvailable) currentPreference = readStoredPreference();
    applyTheme(currentPreference);
    colorPreference = window.matchMedia('(prefers-color-scheme: dark)');
    colorPreference.addEventListener('change', onSystemChange);
    window.addEventListener('storage', onStorageChange);
    notify();
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      colorPreference?.removeEventListener('change', onSystemChange);
      colorPreference = null;
      window.removeEventListener('storage', onStorageChange);
      initialized = false;
    }
  };
}

function getSnapshot(): string {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  return `${currentPreference}:${theme}`;
}

function setPreference(preference: ThemePreference) {
  currentPreference = preference;
  applyTheme(preference);
  try {
    if (preference === 'system') window.localStorage.removeItem(THEME_STORAGE_KEY);
    else window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    storageAvailable = false;
    // Keep the chosen appearance for this page when storage is unavailable.
  }
  notify();
}

interface ThemeToggleProps {
  compact?: boolean;
}

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => 'system:light');
  const [preference, theme] = snapshot.split(':') as [ThemePreference, Theme];
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const actionLabel = `Switch to ${nextTheme} mode`;
  const systemActive = preference === 'system';

  return (
    <div className={`theme-controls${compact ? ' theme-controls--compact' : ''}`} role="group" aria-label="Appearance">
      {!compact && <span className="theme-controls__label">Appearance</span>}
      <div className="theme-controls__buttons">
        <button
          className="theme-toggle"
          type="button"
          aria-label={actionLabel}
          title={compact ? actionLabel : undefined}
          onClick={() => setPreference(nextTheme)}
        >
          <span className="theme-toggle__icon" aria-hidden="true">
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
        </button>
        <button
          className="theme-system-toggle"
          type="button"
          aria-label="Follow system appearance"
          aria-pressed={systemActive}
          title={compact ? 'Follow system appearance' : undefined}
          onClick={() => setPreference('system')}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3.5" y="4.5" width="17" height="12" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9 20H15M12 16.5V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </button>
      </div>
    </div>
  );
}
