// ── OAuth Callback ──────────────────────────────
'use client';
import { useEffect } from 'react';

export default function CallbackPage() {
  useEffect(() => {
    // Handle OAuth callback, exchange code for token
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-lg">Completing sign in...</p>
    </main>
  );
}
