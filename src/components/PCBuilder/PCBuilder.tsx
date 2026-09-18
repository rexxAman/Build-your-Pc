'use client';

import React, { useState } from 'react';
import { PCPartType, PCComponent, PCPreset, BudgetTier, UseCase } from '@/types/setup';
import { COMPONENT_CATALOG, PC_PRESETS } from '@/data/pcPresets';
import { createGoogleSearchUrl, createRedditSearchUrl, createMdComputersSearchUrl, formatINR } from '@/lib/searchUtils';
import { 
  Cpu, 
  Layers, 
  Zap, 
  HardDrive, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  PlusCircle, 
  Search, 
  BookOpen,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  ExternalLink,
  Tag,
  Check
} from 'lucide-react';

interface PCBuilderProps {
  onAddBuildToChecklist: (parts: PCComponent[], buildName: string) => void;
}

const PART_METADATA: Record<PCPartType, { label: string; icon: any; placeholder: string }> = {
  cpu: { label: 'Processor (CPU)', icon: Cpu, placeholder: 'Select Processor (Intel / AMD)' },
  gpu: { label: 'Graphics Card (GPU)', icon: Activity, placeholder: 'Select Graphics Card (NVIDIA / AMD)' },
  motherboard: { label: 'Motherboard', icon: Layers, placeholder: 'Select Motherboard (AM5 / LGA1700 / Z790 / X670E)' },
  ram: { label: 'Memory (RAM)', icon: Zap, placeholder: 'Select RAM (32GB / 64GB / 96GB DDR5)' },
  storage: { label: 'Primary Storage (NVMe SSD)', icon: HardDrive, placeholder: 'Select Gen4 NVMe (1TB / 2TB / 4TB)' },
  psu: { label: 'Power Supply (PSU)', icon: Zap, placeholder: 'Select Power Supply (750W / 850W / 1000W Gold)' },
  cooler: { label: 'CPU Cooler', icon: Activity, placeholder: 'Select Cooler (Air / 360mm AIO / LCD)' },
  case: { label: 'PC Cabinet / Chassis', icon: Layers, placeholder: 'Select Cabinet (Airflow / Walnut Wood / Vision Aquarium)' },
};

const EMPTY_BUILD: Record<PCPartType, PCComponent | null> = {
  cpu: null,
  gpu: null,
  motherboard: null,
  ram: null,
  storage: null,
  psu: null,
  cooler: null,
  case: null,
};

const USE_CASE_LABELS: Record<UseCase, string> = {
  developer: 'Developer',
  gamer: 'Gamer',
  designer: 'Designer / Video Editor',
  gamer_developer: 'Gamer + Developer',
  designer_gamer: 'Designer + Gamer',
  ai_ml_creator: 'AI / ML + 3D Creator',
};

export const PCBuilder: React.FC<PCBuilderProps> = ({ onAddBuildToChecklist }) => {
  const [selectedParts, setSelectedParts] = useState<Record<PCPartType, PCComponent | null>>(EMPTY_BUILD);
  const [buildName, setBuildName] = useState('My Custom PC Build');

  // Filter state for pre-built builds (1 Lakh to 4 Lakh)
  const [activeBudgetTier, setActiveBudgetTier] = useState<BudgetTier | 'all'>('all');
  const [activeUseCase, setActiveUseCase] = useState<UseCase | 'all'>('all');
  const [activeProcessorType, setActiveProcessorType] = useState<'all' | 'intel' | 'amd'>('all');
  const [activePresetModal, setActivePresetModal] = useState<PCPreset | null>(null);

  // Filtered presets
  const filteredPresets = PC_PRESETS.filter((preset) => {
    const matchTier = activeBudgetTier === 'all' || preset.budgetTier === activeBudgetTier;
    const matchUseCase = activeUseCase === 'all' || preset.useCases.includes(activeUseCase);
    const matchProc = activeProcessorType === 'all' || preset.processorType === activeProcessorType;
    return matchTier && matchUseCase && matchProc;
  });

  const handleLoadPreset = (preset: PCPreset) => {
    setSelectedParts(preset.parts);
    setBuildName(preset.title);
    setActivePresetModal(null);
  };

  const handleResetBuild = () => {
    setSelectedParts(EMPTY_BUILD);
    setBuildName('My Custom PC Build');
  };

  const handleSelectComponent = (type: PCPartType, componentId: string) => {
    if (!componentId) {
      setSelectedParts((prev) => ({ ...prev, [type]: null }));
      return;
    }
    const comp = COMPONENT_CATALOG[type]?.find((c) => c.id === componentId) || null;
    setSelectedParts((prev) => ({ ...prev, [type]: comp }));
  };

  const chosenComponents = Object.values(selectedParts).filter(Boolean) as PCComponent[];
  const totalCost = chosenComponents.reduce((sum, item) => sum + item.price, 0);
  const estimatedWattage = chosenComponents.length > 0 
    ? chosenComponents.reduce((sum, item) => sum + (item.wattage || 0), 0) + 50 
    : 0;

  const selectedPsu = selectedParts.psu;
  const psuWattage = selectedPsu
    ? selectedPsu.name.includes('1000W')
      ? 1000
      : selectedPsu.name.includes('850W')
      ? 850
      : selectedPsu.name.includes('750W')
      ? 750
      : 650
    : 0;

  const isPowerSufficient = !selectedPsu || (psuWattage >= estimatedWattage + 100);

  const handleSyncToChecklist = () => {
    if (chosenComponents.length === 0) {
      alert('Please select at least one component before adding to your checklist.');
      return;
    }
    onAddBuildToChecklist(chosenComponents, buildName);
  };

  return (
    <div className="space-y-8">
      {/* SECTION 1: CURATED PRE-BUILTS (1 LAKH TO 4 LAKH) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-zinc-800 text-zinc-100 border border-zinc-700">
                <Sparkles className="w-4 h-4 text-zinc-200" />
              </span>
              <h2 className="text-xl font-bold text-zinc-100">
                Pre-Built Configurations (₹1 Lakh to ₹4 Lakh)
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Battle-tested configurations categorized by budget tier and specialized use cases with visual previews.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500 font-mono">Showing {filteredPresets.length} curated builds</span>
          </div>
        </div>

        {/* Filter Controls: Budget Tiers, Use Cases & Processors */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 bg-zinc-950 p-4 rounded-2xl border border-zinc-850">
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
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              All (1L - 4L)
            </button>
            <button
              onClick={() => setActiveBudgetTier('1_2_lakh')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition ${
                activeBudgetTier === '1_2_lakh'
                  ? 'bg-zinc-100 text-zinc-950 font-semibold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              ₹1 Lakh – ₹2 Lakh
            </button>
            <button
              onClick={() => setActiveBudgetTier('2_3_lakh')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition ${
                activeBudgetTier === '2_3_lakh'
                  ? 'bg-zinc-100 text-zinc-950 font-semibold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              ₹2 Lakh – ₹3 Lakh
            </button>
            <button
              onClick={() => setActiveBudgetTier('3_4_lakh')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition ${
                activeBudgetTier === '3_4_lakh'
                  ? 'bg-zinc-100 text-zinc-950 font-semibold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              ₹3 Lakh – ₹4 Lakh
            </button>
          </div>

          {/* Use Case & Processor Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={activeUseCase}
              onChange={(e) => setActiveUseCase(e.target.value as any)}
              className="px-3 py-1.5 text-xs rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 focus:outline-none focus:border-zinc-500"
            >
              <option value="all">All Profiles (Gamer, Dev, Design)</option>
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
              className="px-3 py-1.5 text-xs rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 focus:outline-none focus:border-zinc-500"
            >
              <option value="all">All Processors (Intel & AMD)</option>
              <option value="amd">AMD Ryzen (AM5 / 3D V-Cache)</option>
              <option value="intel">Intel Core (13th & 14th Gen)</option>
            </select>
          </div>
        </div>

        {/* Pre-Built Cards Grid with Pictures */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPresets.map((preset) => {
            const isCurrentLoaded = buildName === preset.title;

            return (
              <div
                key={preset.id}
                className={`rounded-2xl bg-zinc-950 border transition overflow-hidden flex flex-col justify-between group ${
                  isCurrentLoaded ? 'border-zinc-300 ring-1 ring-zinc-300' : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative h-44 w-full bg-zinc-900 overflow-hidden">
                    <img
                      src={preset.image}
                      alt={preset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full bg-zinc-900/90 text-zinc-200 border border-zinc-700 backdrop-blur-md">
                        {preset.badge}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 text-[10px] uppercase font-mono font-bold rounded-full bg-zinc-900/90 text-zinc-300 border border-zinc-700">
                        {preset.processorType.toUpperCase()}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between">
                      <span className="text-lg font-bold font-mono text-zinc-100 drop-shadow-md">
                        {formatINR(preset.targetBudget)}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-medium">Est. Street Price</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-sm font-bold text-zinc-100 leading-snug">
                      {preset.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {preset.subtitle}
                    </p>

                    {/* Key Specs Pills */}
                    <div className="space-y-1.5 pt-2 border-t border-zinc-850">
                      {preset.highlights.slice(0, 2).map((hl, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-zinc-900/70 border-t border-zinc-850 flex items-center gap-2">
                  <button
                    onClick={() => handleLoadPreset(preset)}
                    className="flex-1 py-2 px-3 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold shadow-sm transition active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>Load This Build</span>
                  </button>

                  <button
                    onClick={() => setActivePresetModal(preset)}
                    className="py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-300 text-xs font-medium border border-zinc-700 transition"
                  >
                    Specs
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: CUSTOM PART-BY-PART BUILDER STUDIO */}
      <div className="space-y-6">
        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-zinc-800 text-zinc-200 border border-zinc-700">
                  <SlidersHorizontal className="w-4 h-4 text-zinc-300" />
                </span>
                <h3 className="text-lg font-semibold text-zinc-100">
                  Custom Part-by-Part Studio ({buildName})
                </h3>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Customize any individual component from AMD/Intel processors, graphics cards, RAM, cooling, and cabinets.
              </p>
            </div>

            {chosenComponents.length > 0 && (
              <button
                onClick={handleResetBuild}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-300 text-xs font-medium border border-zinc-700 transition flex items-center gap-1.5 self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Blank</span>
              </button>
            )}
          </div>
        </div>

        {/* Build Metrics (Price, Power, Sync) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-medium">Selected Build Price</span>
            <div className="text-3xl font-semibold text-zinc-100 mt-1 font-mono">
              {formatINR(totalCost)}
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              {chosenComponents.length} of 8 components picked
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-medium">Estimated Power</span>
              {chosenComponents.length > 0 && selectedPsu && (
                isPowerSufficient ? (
                  <span className="flex items-center gap-1 text-[11px] text-zinc-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-200" /> PSU Headroom Safe
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5 text-zinc-300" /> Higher PSU Advised
                  </span>
                )
              )}
            </div>
            <div className="text-3xl font-semibold text-zinc-100 mt-1 font-mono">
              {estimatedWattage > 0 ? `~${estimatedWattage}W` : '0W'}
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              {selectedPsu
                ? `PSU: ${psuWattage}W (Buffer: ${psuWattage - estimatedWattage}W)`
                : chosenComponents.length > 0
                ? 'Select a PSU below to compute wattage safety'
                : 'Select parts to calculate'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-700/80 flex flex-col justify-between">
            <div>
              <span className="text-xs text-zinc-200 font-semibold uppercase tracking-wider">
                Sync into Setup Checklist
              </span>
              <p className="text-xs text-zinc-400 mt-1">
                Transfers all chosen parts and prices into your master setup budget tracker.
              </p>
            </div>
            <button
              onClick={handleSyncToChecklist}
              disabled={chosenComponents.length === 0}
              className={`mt-3 w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-95 ${
                chosenComponents.length > 0
                  ? 'bg-zinc-100 hover:bg-white text-zinc-950 shadow-md shadow-white/5'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              <PlusCircle className="w-4 h-4 stroke-[2.2]" />
              <span>Add PC Parts to Checklist</span>
            </button>
          </div>
        </div>

        {/* 8 Component Selection Rows with Expanded Options */}
        <div className="space-y-3">
          {(Object.keys(PART_METADATA) as PCPartType[]).map((type) => {
            const meta = PART_METADATA[type];
            const currentPart = selectedParts[type];
            const availableOptions = COMPONENT_CATALOG[type] || [];

            return (
              <div
                key={type}
                className={`p-4 rounded-2xl border transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  currentPart
                    ? 'bg-zinc-900 border-zinc-700'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Part Label & Icon */}
                <div className="flex items-center gap-3 md:w-1/4">
                  <div className={`p-2 rounded-xl shrink-0 ${currentPart ? 'bg-zinc-800 text-zinc-100' : 'bg-zinc-950 text-zinc-500'}`}>
                    <meta.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wide">{meta.label}</h4>
                    <span className="text-[11px] text-zinc-500">
                      {availableOptions.length} models available
                    </span>
                  </div>
                </div>

                {/* Selector & Specs */}
                <div className="flex-1 space-y-1.5">
                  <select
                    value={currentPart?.id || ''}
                    onChange={(e) => handleSelectComponent(type, e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-zinc-500 text-zinc-100"
                  >
                    <option value="">-- {meta.placeholder} --</option>
                    {availableOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.name} ({formatINR(opt.price)}) {opt.wattage ? `[${opt.wattage}W]` : ''}
                      </option>
                    ))}
                  </select>

                  {currentPart && (
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-400">
                      {currentPart.specs && (
                        <span className="text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                          {currentPart.specs}
                        </span>
                      )}
                      {currentPart.recommendedFor && (
                        <span className="text-zinc-400 italic">
                          Why: {currentPart.recommendedFor}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Price & Search Links */}
                <div className="flex items-center justify-between md:justify-end gap-3 md:w-1/4 border-t md:border-t-0 pt-2 md:pt-0 border-zinc-800">
                  {currentPart ? (
                    <>
                      <div className="flex items-center gap-1.5">
                        <a
                          href={createGoogleSearchUrl(currentPart.name)}
                          target="_blank"
                          rel="noreferrer"
                          title="Google Price in India"
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] flex items-center gap-1"
                        >
                          <Search className="w-3 h-3 text-zinc-400" />
                          <span className="hidden xl:inline">Google</span>
                        </a>
                        <a
                          href={createMdComputersSearchUrl(currentPart.name)}
                          target="_blank"
                          rel="noreferrer"
                          title="Search MDComputers"
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] flex items-center gap-1"
                        >
                          <span>MDComp</span>
                        </a>
                        <a
                          href={createRedditSearchUrl(currentPart.name)}
                          target="_blank"
                          rel="noreferrer"
                          title="Search r/IndianGaming"
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] flex items-center gap-1"
                        >
                          <BookOpen className="w-3 h-3 text-zinc-400" />
                          <span className="hidden xl:inline">Reddit</span>
                        </a>
                      </div>
                      <div className="text-right font-mono font-semibold text-sm text-zinc-100">
                        {formatINR(currentPart.price)}
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-zinc-500 italic">Select model</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preset Details Modal */}
      {activePresetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="relative h-48 w-full bg-zinc-950">
              <img
                src={activePresetModal.image}
                alt={activePresetModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
              <button
                onClick={() => setActivePresetModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700">
                  {activePresetModal.badge}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{activePresetModal.title}</h3>
                <span className="text-sm font-mono font-bold text-zinc-200">
                  Target Budget: {formatINR(activePresetModal.targetBudget)}
                </span>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <h4 className="text-xs uppercase font-semibold text-zinc-400 tracking-wider">
                Full Parts Breakdown
              </h4>
              <div className="space-y-2">
                {Object.entries(activePresetModal.parts).map(([partType, part]) => (
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
                  {activePresetModal.highlights.map((hl, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setActivePresetModal(null)}
                className="px-4 py-2 text-xs rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              >
                Close
              </button>
              <button
                onClick={() => handleLoadPreset(activePresetModal)}
                className="px-5 py-2 text-xs font-semibold rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 shadow-sm"
              >
                Load into Studio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
