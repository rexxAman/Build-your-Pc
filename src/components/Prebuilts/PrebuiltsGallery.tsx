'use client';

import React, { useState } from 'react';
import { PCPreset, BudgetTier, UseCase, PCComponent } from '@/types/setup';
import { PC_PRESETS } from '@/data/pcPresets';
import { formatINR } from '@/lib/searchUtils';
import { 
  Sparkles, 
  Tag, 
  Check, 
  PlusCircle, 
  Cpu
} from 'lucide-react';

interface PrebuiltsGalleryProps {
  onLoadBuildToStudio: (preset: PCPreset) => void;
  onAddPresetToChecklist: (parts: PCComponent[], title: string) => void;
}

export const PrebuiltsGallery: React.FC<PrebuiltsGalleryProps> = ({
  onLoadBuildToStudio,
  onAddPresetToChecklist,
}) => {
  const [activeBudgetTier, setActiveBudgetTier] = useState<BudgetTier | 'all'>('all');
  const [activeUseCase, setActiveUseCase] = useState<UseCase | 'all'>('all');
  const [activeProcessorType, setActiveProcessorType] = useState<'all' | 'intel' | 'amd'>('all');
  const [selectedPresetModal, setSelectedPresetModal] = useState<PCPreset | null>(null);

  const filteredPresets = PC_PRESETS.filter((preset) => {
    const matchTier = activeBudgetTier === 'all' || preset.budgetTier === activeBudgetTier;
    const matchUseCase = activeUseCase === 'all' || preset.useCases.includes(activeUseCase);
    const matchProc = activeProcessorType === 'all' || preset.processorType === activeProcessorType;
    return matchTier && matchUseCase && matchProc;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            Curated Showcase (₹1 Lakh to ₹4 Lakh)
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
            Pre-Built Rigs Showcase
          </h2>
          <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
            Explore complete, fully-configured builds tailored for Developers, Competitive Gamers, 3D Designers, and AI/ML Workstations with genuine Indian market pricing and high-resolution visuals.
          </p>
        </div>

        {/* Filter Controls: Budget Tiers, Use Cases & Processors */}
        <div className="mt-6 pt-6 border-t border-zinc-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          {/* Budget Tier Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-zinc-400 font-medium mr-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-zinc-500" />
              Budget:
            </span>
            <button
              onClick={() => setActiveBudgetTier('all')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition ${
                activeBudgetTier === 'all'
                  ? 'bg-zinc-100 text-zinc-950 font-semibold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              All (1L – 4L)
            </button>
            <button
              onClick={() => setActiveBudgetTier('1_2_lakh')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition ${
                activeBudgetTier === '1_2_lakh'
                  ? 'bg-zinc-100 text-zinc-950 font-semibold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              ₹1 Lakh – ₹2 Lakh
            </button>
            <button
              onClick={() => setActiveBudgetTier('2_3_lakh')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition ${
                activeBudgetTier === '2_3_lakh'
                  ? 'bg-zinc-100 text-zinc-950 font-semibold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              ₹2 Lakh – ₹3 Lakh
            </button>
            <button
              onClick={() => setActiveBudgetTier('3_4_lakh')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition ${
                activeBudgetTier === '3_4_lakh'
                  ? 'bg-zinc-100 text-zinc-950 font-semibold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              ₹3 Lakh – ₹4 Lakh
            </button>
          </div>

          {/* Profile & Processor Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={activeUseCase}
              onChange={(e) => setActiveUseCase(e.target.value as any)}
              className="px-3 py-1.5 text-xs rounded-xl bg-zinc-950 border border-zinc-700 text-zinc-300 focus:outline-none focus:border-zinc-500"
            >
              <option value="all">All User Profiles (Gamer, Dev, Design)</option>
              <option value="gamer_developer">Gamer + Developer</option>
              <option value="designer_gamer">Designer + Gamer</option>
              <option value="developer">Developer Workstation</option>
              <option value="designer">Designer / 3D Creator</option>
              <option value="gamer">Pure Competitive Gamer</option>
              <option value="ai_ml_creator">AI / ML + VFX</option>
            </select>

            <select
              value={activeProcessorType}
              onChange={(e) => setActiveProcessorType(e.target.value as any)}
              className="px-3 py-1.5 text-xs rounded-xl bg-zinc-950 border border-zinc-700 text-zinc-300 focus:outline-none focus:border-zinc-500"
            >
              <option value="all">All Architectures (Intel & AMD)</option>
              <option value="amd">AMD Ryzen (AM5 / 3D V-Cache)</option>
              <option value="intel">Intel Core (13th & 14th Gen)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pre-Built Rigs Grid with Photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPresets.map((preset) => {
          return (
            <div
              key={preset.id}
              className="rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition overflow-hidden flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Photo showcase */}
                <div className="relative h-48 w-full bg-zinc-950 overflow-hidden">
                  <img
                    src={preset.image}
                    alt={preset.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full bg-zinc-950/80 text-zinc-200 border border-zinc-700 backdrop-blur-md">
                      {preset.badge}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 text-[10px] uppercase font-mono font-bold rounded-full bg-zinc-950/80 text-zinc-300 border border-zinc-700">
                      {preset.processorType.toUpperCase()}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between">
                    <span className="text-xl font-bold font-mono text-zinc-100 drop-shadow-md">
                      {formatINR(preset.targetBudget)}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-medium">Est. Street Price</span>
                  </div>
                </div>

                {/* Card description & specs highlights */}
                <div className="p-5 space-y-3">
                  <h3 className="text-sm font-bold text-zinc-100 leading-snug">
                    {preset.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {preset.subtitle}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-zinc-800">
                    {preset.highlights.slice(0, 2).map((hl, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-zinc-950 border-t border-zinc-850 flex items-center gap-2">
                <button
                  onClick={() => onLoadBuildToStudio(preset)}
                  className="flex-1 py-2 px-3 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold shadow-sm transition active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Customize in Studio</span>
                </button>

                <button
                  onClick={() => setSelectedPresetModal(preset)}
                  className="py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-300 text-xs font-medium border border-zinc-700 transition"
                >
                  Specs
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preset Details Modal */}
      {selectedPresetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="relative h-48 w-full bg-zinc-950">
              <img
                src={selectedPresetModal.image}
                alt={selectedPresetModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
              <button
                onClick={() => setSelectedPresetModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700">
                  {selectedPresetModal.badge}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{selectedPresetModal.title}</h3>
                <span className="text-sm font-mono font-bold text-zinc-200">
                  Target Budget: {formatINR(selectedPresetModal.targetBudget)}
                </span>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <h4 className="text-xs uppercase font-semibold text-zinc-400 tracking-wider">
                Full Parts Breakdown
              </h4>
              <div className="space-y-2">
                {Object.entries(selectedPresetModal.parts).map(([partType, part]) => (
                  <div
                    key={partType}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-850 text-xs"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-mono text-zinc-500 block">
                        {partType}
                      </span>
                      <span className="text-zinc-200 font-medium">{part.name}</span>
                    </div>
                    <span className="font-mono font-semibold text-zinc-100">{formatINR(part.price)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <h4 className="text-xs uppercase font-semibold text-zinc-400 tracking-wider mb-2">
                  System Highlights
                </h4>
                <ul className="space-y-1 text-xs text-zinc-300">
                  {selectedPresetModal.highlights.map((hl, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedPresetModal(null)}
                className="px-4 py-2 text-xs rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-750"
              >
                Close
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const partsList = Object.values(selectedPresetModal.parts);
                    onAddPresetToChecklist(partsList, selectedPresetModal.title);
                    setSelectedPresetModal(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition"
                >
                  Add Directly to Checklist
                </button>
                <button
                  onClick={() => {
                    onLoadBuildToStudio(selectedPresetModal);
                    setSelectedPresetModal(null);
                  }}
                  className="px-5 py-2 text-xs font-semibold rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 shadow-sm"
                >
                  Open in Custom Studio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
