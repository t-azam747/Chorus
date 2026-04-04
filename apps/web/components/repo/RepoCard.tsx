import React from 'react';
import { HealthSignals } from './HealthSignals';
import { DifficultyBadge } from './DifficultyBadge';

interface RepoCardProps {
  key?: string;
  name: string; 
  owner: string; 
  description?: string; 
  stars: number;
  language?: string;
}

export function RepoCard({ key, name, owner, description, stars, language }: RepoCardProps) {
  return (
    <a href={`/repo/${owner}-${name}`} key={key} className="block group">
    <div className="relative p-6 h-full overflow-hidden border border-gray-200/50 bg-white/40 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
      {/* Decorative gradient blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-slate-800 truncate">
            <span className="font-normal text-slate-400">{owner}/</span>{name}
          </h3>
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2 py-1 rounded-full text-xs font-medium text-slate-500">
            <span>⭐</span> {stars}
          </div>
        </div>
        
        {description && (
          <p className="text-sm text-slate-600 line-clamp-2 min-h-[40px] mb-4">
            {description}
          </p>
        )}

        {language && (
           <div className="flex items-center gap-2 mb-4">
             <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
             <span className="text-xs font-medium text-slate-500">{language}</span>
           </div>
        )}
        
        <div className="pt-4 border-t border-slate-100 mt-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
             <DifficultyBadge label="intermediate" score={6} />
             <span className="text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">View Details →</span>
          </div>
        </div>
      </div>
    </div>
  </a>
  );
}
