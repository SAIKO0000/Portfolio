'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';

const MEASUREMENT_ID = 'G-D8BD8TFGQY';
const STORAGE_KEY = 'portfolio-analytics-consent-v1';
const SETTINGS_EVENT = 'portfolio:open-analytics-settings';
const DISABLE_KEY = `ga-disable-${MEASUREMENT_ID}`;

type ConsentChoice = 'loading' | 'unset' | 'accepted' | 'declined';
type GoogleCommand = [string, ...unknown[]];

declare global {
  interface Window {
    dataLayer?: GoogleCommand[];
    gtag?: (...args: GoogleCommand) => void;
  }
}

let currentChoice: ConsentChoice = 'unset';
const listeners = new Set<() => void>();

function readChoice(): ConsentChoice {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'accepted' || saved === 'declined' ? saved : 'unset';
  } catch {
    return 'unset';
  }
}

function notify() {
  listeners.forEach((listener) => listener());
}

function onStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY && event.key !== null) return;
  const wasAccepted = currentChoice === 'accepted';
  currentChoice = readChoice();
  notify();
  if (wasAccepted && currentChoice !== 'accepted') {
    disableAnalytics();
    window.location.reload();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    currentChoice = readChoice();
    window.addEventListener('storage', onStorage);
    notify();
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener('storage', onStorage);
  };
}

function getSnapshot() {
  return currentChoice;
}

function getServerSnapshot(): ConsentChoice {
  return 'loading';
}

function saveChoice(choice: 'accepted' | 'declined') {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // An in-memory choice still governs the current page if storage is unavailable.
  }
  currentChoice = choice;
  notify();
}

function deleteAnalyticsCookies() {
  const names = document.cookie.split(';')
    .map((part) => part.trim().split('=')[0])
    .filter((name) => /^_ga($|_)|^_gid$/.test(name));

  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    if (window.location.hostname === 'markiguban.dev' || window.location.hostname.endsWith('.markiguban.dev')) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.markiguban.dev`;
    }
  }
}

function disableAnalytics() {
  (window as unknown as Record<string, unknown>)[DISABLE_KEY] = true;
  window.gtag?.('consent', 'update', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  deleteAnalyticsCookies();
}

function loadAnalytics() {
  if (document.querySelector('script[data-portfolio-ga4]')) return;

  (window as unknown as Record<string, unknown>)[DISABLE_KEY] = false;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args) => { window.dataLayer?.push(args); };

  // Basic consent mode: the tag is not requested until after the visitor opts in.
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('js', new Date());
  // GA4 owns the initial and history-change page views. Do not send a second manual page_view.
  window.gtag('config', MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement('script');
  script.async = true;
  script.dataset.portfolioGa4 = '';
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function AnalyticsSettingsButton() {
  return (
    <button
      className="site-footer__settings"
      type="button"
      onClick={() => window.dispatchEvent(new Event(SETTINGS_EVENT))}
    >
      Analytics settings
    </button>
  );
}

export function AnalyticsConsent() {
  const choice = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const visible = choice === 'unset' || settingsOpen;

  useEffect(() => {
    const panel = panelRef.current;
    if (!visible || !panel) return;

    const updateClearance = () => {
      document.documentElement.style.setProperty(
        '--analytics-consent-clearance',
        `${Math.ceil(panel.getBoundingClientRect().height)}px`,
      );
    };
    const observer = new ResizeObserver(updateClearance);
    observer.observe(panel);
    updateClearance();

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('--analytics-consent-clearance');
    };
  }, [visible]);

  useEffect(() => {
    const open = () => setSettingsOpen(true);
    window.addEventListener(SETTINGS_EVENT, open);
    return () => window.removeEventListener(SETTINGS_EVENT, open);
  }, []);

  useEffect(() => {
    if (settingsOpen) headingRef.current?.focus();
  }, [settingsOpen]);

  useEffect(() => {
    if (choice === 'accepted') loadAnalytics();
  }, [choice]);

  const choose = (next: 'accepted' | 'declined') => {
    if (choice === 'accepted' && next === 'declined') {
      disableAnalytics();
      saveChoice('declined');
      window.location.reload();
      return;
    }
    saveChoice(next);
    setSettingsOpen(false);
    if (settingsOpen) {
      window.requestAnimationFrame(() => document.querySelector<HTMLButtonElement>('.site-footer__settings')?.focus());
    }
  };

  if (!visible) return null;

  return (
    <aside ref={panelRef} className="analytics-consent" aria-labelledby="analytics-consent-title">
      <div className="analytics-consent__inner">
        <div className="analytics-consent__copy">
          <h2 id="analytics-consent-title" ref={headingRef} tabIndex={settingsOpen ? -1 : undefined}>
            Optional analytics
          </h2>
          <p>
            Google Analytics measures visits, external-link clicks, and résumé downloads only if you allow it. Change
            your choice anytime in the footer.{' '}
            <Link href="/privacy">Privacy details</Link>
          </p>
          {settingsOpen && choice !== 'unset' && (
            <p className="analytics-consent__status">Current choice: {choice === 'accepted' ? 'allowed' : 'not allowed'}.</p>
          )}
        </div>
        <div className="analytics-consent__actions">
          <button type="button" onClick={() => choose('declined')}>No thanks</button>
          <button type="button" onClick={() => choose('accepted')}>Allow analytics</button>
          {settingsOpen && choice !== 'unset' && (
            <button
              className="analytics-consent__close"
              type="button"
              onClick={() => {
                setSettingsOpen(false);
                window.requestAnimationFrame(() => document.querySelector<HTMLButtonElement>('.site-footer__settings')?.focus());
              }}
            >
              Close settings
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
