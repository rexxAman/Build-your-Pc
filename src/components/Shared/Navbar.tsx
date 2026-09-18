'use client';

import React from 'react';
import { LayoutList, Cpu, Sparkles, LayoutGrid } from 'lucide-react';
import { formatINR } from '@/lib/searchUtils';

interface NavbarProps {
  activeTab: 'checklist' | 'prebuilts' | 'pcbuilder';
  setActiveTab: (tab: 'checklist' | 'prebuilts' | 'pcbuilder') => void;
  itemsCount: number;
  totalCost: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  itemsCount,
  totalCost,
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-tan bg-white/90 backdrop-blur-md px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-olive text-white flex items-center justify-center font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-white stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-olive">
                  SetupForge
                </h1>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-cream-dark text-olive-light border border-tan-dark">
                  ₹ INR
                </span>
              </div>
              <p className="text-xs text-olive-light">Workspace & Custom PC Architecture</p>
            </div>
          </div>

          {/* Mobile Quick Cost */}
          <div className="md:hidden flex flex-col items-end text-xs">
            <span className="text-olive-light">{itemsCount} items</span>
            <span className="font-semibold text-olive">{formatINR(totalCost)}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center p-1 rounded-xl bg-cream-light border border-tan overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 ${
              activeTab === 'checklist'
                ? 'bg-olive text-white font-semibold shadow-sm'
                : 'text-olive-light hover:text-olive hover:bg-cream-dark'
            }`}
          >
            <LayoutList className="w-4 h-4" />
            <span>Checklist</span>
            {itemsCount > 0 && (
              <span className={`px-1.5 py-0.2 text-xs rounded-full font-mono ${
                activeTab === 'checklist' ? 'bg-olive-faint text-olive' : 'bg-cream-dark text-olive-light'
              }`}>
                {itemsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('prebuilts')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 ${
              activeTab === 'prebuilts'
                ? 'bg-olive text-white font-semibold shadow-sm'
                : 'text-olive-light hover:text-olive hover:bg-cream-dark'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Pre-Built Rigs</span>
          </button>

          <button
            onClick={() => setActiveTab('pcbuilder')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 ${
              activeTab === 'pcbuilder'
                ? 'bg-olive text-white font-semibold shadow-sm'
                : 'text-olive-light hover:text-olive hover:bg-cream-dark'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Custom PC Studio</span>
          </button>
        </nav>


      </div>
    </header>
  );
};
