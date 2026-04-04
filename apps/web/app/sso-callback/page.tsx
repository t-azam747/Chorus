// ── SSO Callback Page ───────────────────────────
import React from 'react';
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export default function SSOCallback() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Authenticating your account...</p>
        <AuthenticateWithRedirectCallback />
      </div>
    </div>
  );
}
