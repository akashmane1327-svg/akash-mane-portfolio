'use client';

import { useEffect, useState } from 'react';

export function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Respect users who've already seen the intro this session, and never
    // block content for more than a moment.
    const seen = sessionStorage.getItem('am-loader-seen');
    if (seen) {
      setHidden(true);
      return;
    }

    const minDelay = new Promise<void>((resolve) => setTimeout(resolve, 900));
    const ready =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }));

    Promise.all([minDelay, ready]).then(() => {
      setHidden(true);
      sessionStorage.setItem('am-loader-seen', '1');
    });
  }, []);

  return (
    <div className="loader-screen" data-hidden={hidden} role="status" aria-label="Loading site">
      <div className="flex flex-col items-center">
        <p className="loader-mark">
          AM<span>.</span>
        </p>
        <div className="loader-line" />
      </div>
    </div>
  );
}
