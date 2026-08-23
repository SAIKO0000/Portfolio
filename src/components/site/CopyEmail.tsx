'use client';

import { useEffect, useState } from 'react';

interface CopyEmailProps {
  email: string;
}

export function CopyEmail({ email }: CopyEmailProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    if (status === 'idle') return;
    const resetTimer = window.setTimeout(() => setStatus('idle'), 2800);
    return () => window.clearTimeout(resetTimer);
  }, [status]);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
  };

  const label = status === 'copied' ? 'Copied' : status === 'failed' ? 'Try again' : 'Copy email';

  return (
    <button
      className="copy-email-control__button"
      type="button"
      onClick={copyAddress}
      aria-live="polite"
    >
      <span>{label}</span>
      <span aria-hidden="true">{status === 'copied' ? '✓' : '+'}</span>
    </button>
  );
}
