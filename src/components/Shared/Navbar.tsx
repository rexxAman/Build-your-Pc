'use client';

import React from 'react';
import { LayoutList, Cpu, Compass, Cloud, RefreshCw, Sparkles, BookOpen } from 'lucide-react';

interface NavbarProps {
  activeTab: 'checklist' | 'pcbuilder' | 'recommendations';
  setActiveTab: (tab: 'checklist' | 'pcbuilder' | 'recommendations') => void;
  itemsCount: number;
  totalCost: number;
  neonConnected: boolean;
  syncing: boolean;
  onSync: () => void;
  onOpenGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  itemsCount,
  totalCost,
  neonConnected,
  syncing,
  onSync,
  onOpenGuide,
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0c1222]/90 backdrop-blur-md px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-[2px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-[#0c1222] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                  SetupForge
                </h1>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Neon Database
                </span>
              </div>
              <p className="text-xs text-slate-400">Workspace & Custom PC Cost Architecture</p>
            </div>
          </div>

          {/* Mobile Quick Cost */}
          <div className="md:hidden flex flex-col items-end text-xs">
            <span className="text-slate-400">{itemsCount} items</span>
            <span className="font-semibold text-emerald-400">${totalCost.toLocaleString()}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner">
          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'checklist'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <LayoutList className="w-4 h-4" />
            <span>Setup Checklist</span>
            {itemsCount > 0 && (
              <span className="px-1.5 py-0.2 text-xs rounded-full bg-black/30 font-mono">
                {itemsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('pcbuilder')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'pcbuilder'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>PC Builder Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('recommendations')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'recommendations'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Recommendations & Deals</span>
          </button>
        </nav>

        {/* Action Buttons: Step-by-Step Guide & Neon Cloud Sync */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Step-by-step Setup Guide Trigger */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Setup Guide (Step 1 to Final)</span>
          </button>

          {/* Neon Database Cloud Sync */}
          <button
            onClick={onSync}
            disabled={syncing}
            title={
              neonConnected
                ? 'Connected to Neon Postgres. Click to sync.'
                : 'Neon Cloud: set DATABASE_URL in your environment or Vercel settings.'
            }
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
              neonConnected
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-slate-800/70 text-slate-400 border-slate-700/60 hover:text-slate-300'
            }`}
          >
            <Cloud className={`w-3.5 h-3.5 ${neonConnected ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span>Neon Database</span>
            <RefreshCw className={`w-3 h-3 ml-0.5 ${syncing ? 'animate-spin text-indigo-400' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
};
