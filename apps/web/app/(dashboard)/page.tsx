// ── Dashboard Home ──────────────────────────────
import React from 'react';
import { RepoCard } from '../../components/repo/RepoCard';

const MOCK_REPOS = [
  { id: '1', owner: 'facebook', name: 'react', description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.', stars: 212000, language: 'TypeScript' },
  { id: '2', owner: 'vercel', name: 'next.js', description: 'The React Framework for the Web. Elevate your application with server components and edge rendering.', stars: 110000, language: 'TypeScript' },
  { id: '3', owner: 'tailwindlabs', name: 'tailwindcss', description: 'A utility-first CSS framework for rapid UI development.', stars: 72000, language: 'CSS' },
  { id: '4', owner: 'microsoft', name: 'vscode', description: 'Visual Studio Code: Code editing. Redefined.', stars: 150000, language: 'TypeScript' },
  { id: '5', owner: 'torvalds', name: 'linux', description: 'Linux kernel source tree. The history of modern computing.', stars: 160000, language: 'C' }
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto h-full animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
          Dashboard
        </h1>
        <p className="text-lg text-slate-500">
          Your active workspaces and recently analyzed repositories.
        </p>
      </header>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Recent Repositories</h2>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm shadow-blue-500/20 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 active:scale-95">
            + Import Repository
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_REPOS.map((repo) => (
            <RepoCard
              key={repo.id}
              name={repo.name}
              owner={repo.owner}
              description={repo.description}
              stars={repo.stars}
              language={repo.language}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
