'use client';

import React, { useState } from 'react';
import { SETUP_PRESETS } from '@/data/setupPresets';
import { SetupPreset, Category, ItemPriority } from '@/types/setup';
import { 
  createGoogleSearchUrl, 
  createAmazonSearchUrl, 
  createRedditSearchUrl,
  formatINR 
} from '@/lib/searchUtils';
import { 
  Sparkles, 
  Search, 
  ExternalLink, 
  PlusCircle, 
  Compass, 
  Check, 
  Lightbulb
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
}) => {
  const [customSearchTerm, setCustomSearchTerm] = useState('');
  const [copiedPresetId, setCopiedPresetId] = useState<string | null>(null);

  const handleApplyPreset = (preset: SetupPreset) => {
    onAddPresetItems(preset.items);
    setCopiedPresetId(preset.id);
    setTimeout(() => setCopiedPresetId(null), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner with Indian Deals Search Finder */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-tan shadow-md relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-dark border border-tan-dark text-olive-light text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-olive-muted" />
            Curated Blueprints (Indian Market & Rupee Standards)
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-olive tracking-tight">
            Indian Workspace Blueprints & Deal Search Launcher
          </h2>
          <p className="text-sm text-olive-light mt-2 leading-relaxed">
            Explore battle-tested setups with products actively available in India (Amazon.in, Featherlite, Green Soul, MDComputers, Vedant). Search local prices or clone complete setups in ₹ INR.
          </p>
        </div>

        {/* Dynamic Search Assistant Tool */}
        <div className="mt-6 pt-6 border-t border-tan">
          <label className="block text-xs font-semibold text-olive-light mb-2 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-olive-muted" />
            Instant Indian Market Gear Search:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={customSearchTerm}
              onChange={(e) => setCustomSearchTerm(e.target.value)}
              placeholder="e.g. Featherlite chair, standing desk India, 27 inch 1440p monitor..."
              className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-cream-light border border-tan text-olive placeholder-olive-muted focus:outline-none focus:border-olive"
            />
            <div className="flex items-center gap-2">
              <a
                href={createGoogleSearchUrl(customSearchTerm || 'best productive desk setup gear india')}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2.5 rounded-xl bg-olive hover:bg-olive/90 text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <span>Google India</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={createAmazonSearchUrl(customSearchTerm || 'desk setup essentials india')}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2.5 rounded-xl bg-cream-dark hover:bg-tan text-olive-light text-xs font-semibold flex items-center gap-1.5 border border-tan-dark transition"
              >
                <span>Amazon.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={createRedditSearchUrl(customSearchTerm || 'desk setup recommendations')}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2.5 rounded-xl bg-cream-dark hover:bg-tan text-olive-light text-xs font-semibold flex items-center gap-1.5 border border-tan-dark transition"
              >
                <span>r/IndianGaming</span>
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
            <h3 className="text-base font-bold text-olive flex items-center gap-2">
              <Compass className="w-5 h-5 text-olive-light" />
              Curated Workspaces (India Standard)
            </h3>
            <p className="text-xs text-olive-light">Priced in ₹ INR with local warranty and availability.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SETUP_PRESETS.map((preset) => {
            const totalEstimated = preset.items.reduce((s, i) => s + (i.estimatedPrice || 0), 0);
            const isCopied = copiedPresetId === preset.id;

            return (
              <div
                key={preset.id}
                className="rounded-2xl bg-white border border-tan flex flex-col justify-between overflow-hidden shadow-sm hover:border-tan-dark transition group"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-full bg-cream-dark text-olive-light border border-tan-dark">
                      {preset.categoryTag}
                    </span>
                    {totalEstimated > 0 && (
                      <span className="text-xs font-mono font-semibold text-olive">
                        ~{formatINR(totalEstimated)}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-olive">
                    {preset.title}
                  </h4>
                  <p className="text-xs text-olive-light mt-1.5 leading-relaxed">
                    {preset.description}
                  </p>

                  <div className="mt-4 space-y-2 border-t border-tan pt-3">
                    <span className="text-[11px] font-semibold text-olive-light uppercase tracking-wider">
                      Included Gear ({preset.items.length})
                    </span>
                    <div className="space-y-1.5">
                      {preset.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs p-2 rounded-xl bg-cream-light border border-tan"
                        >
                          <div className="truncate pr-2">
                            <span className="text-olive font-medium">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {item.estimatedPrice ? (
                              <span className="font-mono text-olive-light text-[11px]">{formatINR(item.estimatedPrice)}</span>
                            ) : (
                              <span className="text-olive-muted text-[10px]">Live Price</span>
                            )}
                            <a
                              href={createGoogleSearchUrl(item.searchQuery || item.name)}
                              target="_blank"
                              rel="noreferrer"
                              title="Search Indian price & deals"
                              className="text-olive-muted hover:text-olive-light"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-cream-light border-t border-tan">
                  <button
                    onClick={() => handleApplyPreset(preset)}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition ${
                      isCopied
                        ? 'bg-cream-dark text-olive border border-tan-dark'
                        : 'bg-olive hover:bg-olive/90 text-white shadow-sm'
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

      {/* Indian Ergonomic Tips */}
      <div className="p-6 rounded-3xl bg-white border border-tan">
        <h3 className="text-sm font-bold text-olive flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-olive-light" />
          Indian Workstation Pro-Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-olive-light">
          <div className="p-4 rounded-xl bg-cream-light border border-tan">
            <h5 className="font-semibold text-olive mb-1">1. Climate & Full Mesh Chairs</h5>
            <p className="leading-relaxed">
              In warmer Indian regions, full-mesh ergonomic seating (Featherlite or Green Soul) prevents heat buildup and sweat compared to leatherette.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-cream-light border border-tan">
            <h5 className="font-semibold text-olive mb-1">2. Inverter / UPS Power Protection</h5>
            <p className="leading-relaxed">
              Pair your custom PC and monitors with a dependable 1100VA+ pure sine wave line-interactive UPS (APC or Microtek) to handle Indian grid fluctuations.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-cream-light border border-tan">
            <h5 className="font-semibold text-olive mb-1">3. Spike Guard & Under-Desk Trays</h5>
            <p className="leading-relaxed">
              Mount your multi-socket spike guard (GM / Anchor / Belkin) under the desk with wire ties. Only one surge-protected cable should connect to your wall socket.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
