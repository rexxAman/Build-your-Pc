'use client';

import React, { useState } from 'react';
import { PCPartType, PCComponent, PCPreset } from '@/types/setup';
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
  SlidersHorizontal,
  LayoutGrid
} from 'lucide-react';

interface PCBuilderProps {
  selectedParts: Record<PCPartType, PCComponent | null>;
  setSelectedParts: React.Dispatch<React.SetStateAction<Record<PCPartType, PCComponent | null>>>;
  buildName: string;
  setBuildName: React.Dispatch<React.SetStateAction<string>>;
  onAddBuildToChecklist: (parts: PCComponent[], buildName: string) => void;
  onOpenPrebuiltsTab: () => void;
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

export const PCBuilder: React.FC<PCBuilderProps> = ({ 
  selectedParts,
  setSelectedParts,
  buildName,
  setBuildName,
  onAddBuildToChecklist,
  onOpenPrebuiltsTab
}) => {
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
    <div className="space-y-6">
      {/* Header Banner with Link to Pre-builts Gallery */}
      <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-zinc-800 text-zinc-200 border border-zinc-700">
                <SlidersHorizontal className="w-4 h-4 text-zinc-300" />
              </span>
              <h2 className="text-xl font-bold text-zinc-100">
                Custom PC Builder Studio
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 font-mono">
                {buildName}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Select each hardware part individually from Intel & AMD processors, RTX/Radeon graphics, memory, and cooling.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPrebuiltsTab}
              className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-200 text-xs font-semibold border border-zinc-700 transition flex items-center gap-1.5 shadow-sm"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-zinc-300" />
              <span>Browse Pre-Built Gallery (1L - 4L)</span>
            </button>

            {chosenComponents.length > 0 && (
              <button
                onClick={handleResetBuild}
                className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-400 hover:text-zinc-100 text-xs font-medium border border-zinc-700 transition flex items-center gap-1.5"
                title="Reset build"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Build Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Cost */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
          <span className="text-xs text-zinc-400 uppercase tracking-wider font-medium">Total PC Build Cost</span>
          <div className="text-3xl font-semibold text-zinc-100 mt-1 font-mono">
            {formatINR(totalCost)}
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            {chosenComponents.length} of 8 components selected
          </p>
        </div>

        {/* Wattage Estimate */}
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

        {/* Sync into Setup Checklist CTA */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-700/80 flex flex-col justify-between">
          <div>
            <span className="text-xs text-zinc-200 font-semibold uppercase tracking-wider">
              Add to Setup Checklist
            </span>
            <p className="text-xs text-zinc-400 mt-1">
              Add all chosen PC parts with prices and Indian dealer links into your checklist.
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
            <span>Add Selected Parts to Checklist</span>
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
  );
};
