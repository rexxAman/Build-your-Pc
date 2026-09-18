'use client';

import React, { useState } from 'react';
import { SETUP_PRESETS } from '@/data/setupPresets';
import { SetupPreset, Category, ItemPriority } from '@/types/setup';
import { 
  createGoogleSearchUrl, 
  createAmazonSearchUrl, 
  createRedditSearchUrl,
  CATEGORY_LABELS 
} from '@/lib/searchUtils';
import { 
  Sparkles, 
  Search, 
  ExternalLink, 
  PlusCircle, 
  Compass, 
  Sliders, 
  Check, 
  ArrowRight,
  Lightbulb,
  Monitor
} from 'lucide-react';

interface RecommendationHubProps {
  onAddPresetItems: (items: SetupPreset['items']) => void;
  onAddItemDirectly: (item: {
    name: string;
    category: Category;
    price: number;
    priority: ItemPriority;
    notes?: string;
    url?: string;
  }) => void;
}

export const RecommendationHub: React.FC<RecommendationHubProps> = ({
  onAddPresetItems,
  onAddItemDirectly,
}) => {
  // Custom quick search tool
  const [customSearchTerm, setCustomSearchTerm] = useState('');
  const [copiedPresetId, setCopiedPresetId] = useState<string | null>(null);

  // Setup recommendation assistant quiz
  const [quizRole, setQuizRole] = useState<'developer' | 'creator' | 'student' | 'remote-worker'>('developer');
  const [quizBudget, setQuizBudget] = useState<'budget' | 'mid' | 'premium'>('mid');

  const handleApplyPreset = (preset: SetupPreset) => {
    onAddPresetItems(preset.items);
    setCopiedPresetId(preset.id);
    setTimeout(() => setCopiedPresetId(null), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner with Smart Search Finder */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/50 via-slate-900 to-slate-950 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            AI & Curated Workspace Research
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Curated Productivity Setups & Deal Search
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Browse battle-tested developer and creator workspaces. Launch Google and Reddit queries to compare current deals, or clone full setup blueprints directly into your personal checklist.
          </p>
        </div>

        {/* Dynamic Search Assistant Tool */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-indigo-400" />
            Instant Hardware & Desk Deal Search Launcher:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={customSearchTerm}
              onChange={(e) => setCustomSearchTerm(e.target.value)}
              placeholder="e.g. Ergonomic chair under $300, 4K 144Hz monitor, Herman Miller alternative..."
              className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <div className="flex items-center gap-2">
              <a
                href={createGoogleSearchUrl(customSearchTerm || 'best productive desk setup gear 2026')}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <span>Google Deals</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={createRedditSearchUrl(customSearchTerm || 'productivity desk setup recommendations')}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-orange-400 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
              >
                <span>Reddit Discussions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={createAmazonSearchUrl(customSearchTerm || 'desk setup essentials')}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
              >
                <span>Amazon</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Curated Setup Blueprints */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400" />
              Curated Setup Blueprints
            </h3>
            <p className="text-xs text-slate-400">Tested combinations optimized for ergonomics, flow, and budget.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SETUP_PRESETS.map((preset) => {
            const totalEstimated = preset.items.reduce((s, i) => s + i.estimatedPrice, 0);
            const isCopied = copiedPresetId === preset.id;

            return (
              <div
                key={preset.id}
                className="rounded-2xl bg-gradient-to-b from-[#111827] to-[#0b101d] border border-slate-800 flex flex-col justify-between overflow-hidden shadow-xl hover:border-slate-700 transition group"
              >
                <div className="p-5">
                  {/* Category Tag & Total */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {preset.categoryTag}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      ~${totalEstimated.toLocaleString()}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition">
                    {preset.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {preset.description}
                  </p>

                  {/* Included Items Preview */}
                  <div className="mt-4 space-y-2 border-t border-slate-800/80 pt-3">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Included Gear ({preset.items.length})
                    </span>
                    <div className="space-y-1.5">
                      {preset.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-slate-900/50 hover:bg-slate-900 border border-slate-800/60"
                        >
                          <div className="truncate pr-2">
                            <span className="text-slate-200 font-medium">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-mono text-slate-400 text-[11px]">${item.estimatedPrice}</span>
                            <a
                              href={createGoogleSearchUrl(item.searchQuery || item.name)}
                              target="_blank"
                              rel="noreferrer"
                              title="Search deals for this item"
                              className="text-slate-500 hover:text-indigo-400"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Clone Preset Action */}
                <div className="p-4 bg-slate-950/60 border-t border-slate-800">
                  <button
                    onClick={() => handleApplyPreset(preset)}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Added to Checklist!</span>
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-4 h-4" />
                        <span>Add All {preset.items.length} Items to Checklist</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ergonomic & Setup Tips */}
      <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
        <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          Pro-Tips for Productive Workstation Architecture
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <h5 className="font-semibold text-indigo-300 mb-1">1. Eye-Level Ergonomics</h5>
            <p className="text-slate-400 leading-relaxed">
              The top third of your monitor screen should align directly with your eye line. A single gas-spring monitor arm frees up desk space and prevents neck slouching.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <h5 className="font-semibold text-indigo-300 mb-1">2. Single-Cable USB-C / KVM</h5>
            <p className="text-slate-400 leading-relaxed">
              Opt for monitors or docking stations that deliver at least 90W power delivery over USB-C. This lets you seamlessly swap between your custom PC and work laptop with zero cable re-plugging.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <h5 className="font-semibold text-indigo-300 mb-1">3. Under-Desk Wire Trays</h5>
            <p className="text-slate-400 leading-relaxed">
              Mount all power bricks, surge protectors, and transformer plugs to the underside of the desk. When adjusting standing desks, only one main power cord should reach the wall socket.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
