'use client';

import React from 'react';
import { LayoutList, Cpu, Compass, Cloud, RefreshCw, Sparkles, BookOpen, LayoutGrid } from 'lucide-react';
import { formatINR } from '@/lib/searchUtils';

interface NavbarProps {
  activeTab: 'checklist' | 'prebuilts' | 'pcbuilder' | 'recommendations';
  setActiveTab: (tab: 'checklist' | 'prebuilts' | 'pcbuilder' | 'recommendations') => void;
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
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-950 flex items-center justify-center font-bold shadow-md shadow-white/5">
              <Sparkles className="w-4 h-4 text-zinc-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-zinc-100">
                  SetupForge
                </h1>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                  ₹ INR
                </span>
              </div>
              <p className="text-xs text-zinc-400">Workspace & Custom PC Architecture</p>
            </div>
          </div>

          {/* Mobile Quick Cost */}
          <div className="md:hidden flex flex-col items-end text-xs">
            <span className="text-zinc-400">{itemsCount} items</span>
            <span className="font-semibold text-zinc-100">{formatINR(totalCost)}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 ${
              activeTab === 'checklist'
                ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-850'
            }`}
          >
            <LayoutList className="w-4 h-4" />
            <span>Checklist</span>
            {itemsCount > 0 && (
              <span className={`px-1.5 py-0.2 text-xs rounded-full font-mono ${
                activeTab === 'checklist' ? 'bg-zinc-300 text-zinc-900' : 'bg-zinc-800 text-zinc-300'
              }`}>
                {itemsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('prebuilts')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 ${
              activeTab === 'prebuilts'
                ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-850'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Pre-Built Rigs (1L - 4L)</span>
          </button>

          <button
            onClick={() => setActiveTab('pcbuilder')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 ${
              activeTab === 'pcbuilder'
                ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-850'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Custom PC Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('recommendations')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 ${
              activeTab === 'recommendations'
                ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-850'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Workspaces</span>
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold shadow-md shadow-white/5 transition active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Setup Guide (1-6)</span>
          </button>

          <button
            onClick={onSync}
            disabled={syncing}
            title={
              neonConnected
                ? 'Neon Database Connected'
                : 'Configure DATABASE_URL to connect Neon Cloud Database'
            }
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
              neonConnected
                ? 'bg-zinc-800 text-zinc-100 border-zinc-700'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
            }`}
          >
            <Cloud className="w-3.5 h-3.5 text-zinc-300" />
            <span>{neonConnected ? 'Neon Connected' : 'Neon DB'}</span>
            <RefreshCw className={`w-3 h-3 ml-0.5 ${syncing ? 'animate-spin text-zinc-200' : 'text-zinc-500'}`} />
          </button>
        </div>
      </div>
    </header>
  );
};
