import React from 'react';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { OAuthButtons } from '../components/auth/OAuthButtons';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-6xl font-bold text-center mb-4">Chorus</h1>
      <p className="text-xl text-gray-500 text-center max-w-2xl mb-8">
        The codebase your whole team understands — not just the person who wrote it.
      </p>
      
      <SignedOut>
        <OAuthButtons />
      </SignedOut>

      <SignedIn>
        <a href="/dashboard" className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-green-700 transition">
          Go to Dashboard
        </a>
      </SignedIn>
    </main>
  );
}
