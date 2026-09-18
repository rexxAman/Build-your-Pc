'use client';

import React, { useState } from 'react';
import { PCPartType, PCComponent, PCBuild } from '@/types/setup';
import { COMPONENT_CATALOG, PC_PRESETS } from '@/data/pcPresets';
import { createGoogleSearchUrl, createPCPartPickerSearchUrl, createRedditSearchUrl } from '@/lib/searchUtils';
import { 
  Cpu, 
  Layers, 
  Zap, 
  HardDrive, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  PlusCircle, 
  ExternalLink, 
  Search,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface PCBuilderProps {
  onAddBuildToChecklist: (parts: PCComponent[], buildName: string) => void;
}

const PART_METADATA: Record<PCPartType, { label: string; icon: any; placeholder: string }> = {
  cpu: { label: 'Processor (CPU)', icon: Cpu, placeholder: 'Select CPU' },
  gpu: { label: 'Graphics Card (GPU)', icon: Activity, placeholder: 'Select Graphics Card' },
  motherboard: { label: 'Motherboard', icon: Layers, placeholder: 'Select Motherboard' },
  ram: { label: 'Memory (RAM)', icon: Zap, placeholder: 'Select RAM' },
  storage: { label: 'Primary Storage (SSD)', icon: HardDrive, placeholder: 'Select NVMe SSD' },
  psu: { label: 'Power Supply (PSU)', icon: Zap, placeholder: 'Select Power Supply' },
  cooler: { label: 'CPU Cooler', icon: Activity, placeholder: 'Select Cooler' },
  case: { label: 'PC Case', icon: Layers, placeholder: 'Select Case' },
};

export const PCBuilder: React.FC<PCBuilderProps> = ({ onAddBuildToChecklist }) => {
  const [selectedParts, setSelectedParts] = useState<Record<PCPartType, PCComponent | null>>({
    cpu: COMPONENT_CATALOG.cpu[0],
    gpu: COMPONENT_CATALOG.gpu[1],
    motherboard: COMPONENT_CATALOG.motherboard[0],
    ram: COMPONENT_CATALOG.ram[0],
    storage: COMPONENT_CATALOG.storage[0],
    psu: COMPONENT_CATALOG.psu[0],
    cooler: COMPONENT_CATALOG.cooler[0],
    case: COMPONENT_CATALOG.case[0],
  });

  const [buildName, setBuildName] = useState('Custom Productivity Rig');

  // Load a preset
  const handleLoadPreset = (presetId: string) => {
    const found = PC_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setSelectedParts(found.parts);
      setBuildName(found.title);
    }
  };

  // Select a component
  const handleSelectComponent = (type: PCPartType, componentId: string) => {
    if (!componentId) {
      setSelectedParts((prev) => ({ ...prev, [type]: null }));
      return;
    }
    const comp = COMPONENT_CATALOG[type]?.find((c) => c.id === componentId) || null;
    setSelectedParts((prev) => ({ ...prev, [type]: comp }));
  };

  // Calculations
  const chosenComponents = Object.values(selectedParts).filter(Boolean) as PCComponent[];
  const totalCost = chosenComponents.reduce((sum, item) => sum + item.price, 0);
  const estimatedWattage = chosenComponents.reduce((sum, item) => sum + (item.wattage || 0), 0) + 50; // +50W buffer for fans, chipset

  // Determine PSU capacity if selected
  const selectedPsu = selectedParts.psu;
  const psuWattage = selectedPsu
    ? selectedPsu.name.includes('1000W')
      ? 1000
      : selectedPsu.name.includes('850W')
      ? 850
      : 750
    : 0;

  const isPowerSufficient = !selectedPsu || psuWattage >= estimatedWattage + 100;

  const handleSyncToChecklist = () => {
    if (chosenComponents.length === 0) return;
    onAddBuildToChecklist(chosenComponents, buildName);
  };

  return (
    <div className="space-y-6">
      {/* Header with Quick Presets */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-[#111827] to-[#0f172a] border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <Cpu className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white">Custom PC Builder Studio</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Realtime Compatibility
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Select parts or pick a curated preset. Calculate wattage, check pricing, and sync directly to your workspace setup checklist.
            </p>
          </div>

          {/* Presets Button Group */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Load Preset:</span>
            {PC_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleLoadPreset(preset.id)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-medium transition hover:border-indigo-500/50"
              >
                {preset.title.split(' ')[0]} ({preset.badge})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Build Summary & Specs Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Cost */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total PC Build Cost</span>
          <div className="text-3xl font-extrabold text-white mt-1 font-mono">
            ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-slate-400 mt-1">{chosenComponents.length} of 8 components picked</p>
        </div>

        {/* Wattage Estimate */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Estimated Draw</span>
            {isPowerSufficient ? (
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> PSU Adequate
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                <AlertTriangle className="w-3.5 h-3.5" /> Recommend Higher PSU
              </span>
            )}
          </div>
          <div className="text-3xl font-extrabold text-indigo-400 mt-1 font-mono">
            ~{estimatedWattage}W
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {selectedPsu ? `Selected PSU: ${psuWattage}W (Headroom: ${psuWattage - estimatedWattage}W)` : 'No PSU chosen'}
          </p>
        </div>

        {/* Sync into Setup Checklist CTA */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/30 flex flex-col justify-between">
          <div>
            <span className="text-xs text-indigo-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Add to Workspace
            </span>
            <p className="text-xs text-slate-400 mt-1">
              Add this entire PC build into your primary setup checklist with all prices & links.
            </p>
          </div>
          <button
            onClick={handleSyncToChecklist}
            className="mt-3 w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add PC Build into Checklist</span>
          </button>
        </div>
      </div>

      {/* Part Selection Rows */}
      <div className="space-y-3">
        {(Object.keys(PART_METADATA) as PCPartType[]).map((type) => {
          const meta = PART_METADATA[type];
          const currentPart = selectedParts[type];
          const availableOptions = COMPONENT_CATALOG[type] || [];

          return (
            <div
              key={type}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Part Label & Icon */}
              <div className="flex items-center gap-3 md:w-1/4">
                <div className="p-2 rounded-xl bg-slate-800 text-indigo-400 shrink-0">
                  <meta.icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">{meta.label}</h4>
                  <span className="text-[11px] text-slate-500">
                    {availableOptions.length} recommendations available
                  </span>
                </div>
              </div>

              {/* Selector & Specs */}
              <div className="flex-1 space-y-1.5">
                <select
                  value={currentPart?.id || ''}
                  onChange={(e) => handleSelectComponent(type, e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 focus:outline-none focus:border-indigo-500 text-white"
                >
                  <option value="">-- Choose {meta.label} --</option>
                  {availableOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name} (${opt.price}) {opt.wattage ? `[${opt.wattage}W]` : ''}
                    </option>
                  ))}
                </select>

                {currentPart && (
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                    {currentPart.specs && (
                      <span className="text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700/40">
                        {currentPart.specs}
                      </span>
                    )}
                    {currentPart.recommendedFor && (
                      <span className="text-indigo-300/90 italic">
                        Why: {currentPart.recommendedFor}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Price & Search Links */}
              <div className="flex items-center justify-between md:justify-end gap-3 md:w-1/4 border-t md:border-t-0 pt-2 md:pt-0 border-slate-800">
                {currentPart ? (
                  <>
                    <div className="flex items-center gap-1.5">
                      <a
                        href={createGoogleSearchUrl(`${currentPart.name} best price`)}
                        target="_blank"
                        rel="noreferrer"
                        title="Google Search deals"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center gap-1"
                      >
                        <Search className="w-3 h-3 text-slate-400" />
                        <span className="hidden xl:inline">Google</span>
                      </a>
                      <a
                        href={createRedditSearchUrl(currentPart.name)}
                        target="_blank"
                        rel="noreferrer"
                        title="Search Reddit reviews"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-orange-400 text-[11px] flex items-center gap-1"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span className="hidden xl:inline">Reddit</span>
                      </a>
                    </div>
                    <div className="text-right font-mono font-bold text-sm text-white">
                      ${currentPart.price.toFixed(2)}
                    </div>
                  </>
                ) : (
                  <div className="text-xs text-slate-500 italic">None selected</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
