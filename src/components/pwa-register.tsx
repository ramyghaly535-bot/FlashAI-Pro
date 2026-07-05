'use client';

import { useEffect } from 'react';

export function PwaRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('[FlashAI Pro] SW registered:', registration.scope);

          // Check for updates every 30 seconds
          setInterval(() => {
            registration.update();
          }, 30000);
        })
        .catch((error) => {
          console.warn('[FlashAI Pro] SW registration failed:', error);
        });
    }
  }, []);

  return null;
}