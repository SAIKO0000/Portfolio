'use client';

import { useState } from 'react';

interface CopyEmailProps {
  email: string;
}

export function CopyEmail({ email }: CopyEmailProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
  };

  const label = status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy address';

  return (
    <button className="text-button" type="button" onClick={copyAddress} aria-live="polite">
      {label}
    </button>
  );
}
