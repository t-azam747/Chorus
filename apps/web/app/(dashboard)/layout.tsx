// ── Dashboard Layout ────────────────────────────
import { UserButton } from '@clerk/nextjs';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <nav className="w-64 border-r p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Chorus</h2>
          <UserButton />
        </div>
        <ul className="space-y-2">
          <li><a href="/dashboard" className="block p-2 rounded hover:bg-gray-100">Home</a></li>
          <li><a href="/repo" className="block p-2 rounded hover:bg-gray-100">Repositories</a></li>
          <li><a href="/profile" className="block p-2 rounded hover:bg-gray-100">Profile</a></li>
        </ul>
      </nav>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
