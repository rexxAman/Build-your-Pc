'use client';

import React, { useState, useEffect } from 'react';
import { SetupItem, PCComponent, PCPartType, PCPreset } from '@/types/setup';
import { Navbar } from '@/components/Shared/Navbar';
import { BudgetSummaryCard } from '@/components/Checklist/BudgetSummaryCard';
import { ChecklistManager } from '@/components/Checklist/ChecklistManager';
import { PCBuilder } from '@/components/PCBuilder/PCBuilder';
import { PrebuiltsGallery } from '@/components/Prebuilts/PrebuiltsGallery';

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

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'checklist' | 'prebuilts' | 'pcbuilder'>('checklist');
  const [items, setItems] = useState<SetupItem[]>([]);

  const [selectedParts, setSelectedParts] = useState<Record<PCPartType, PCComponent | null>>(EMPTY_BUILD);
  const [buildName, setBuildName] = useState('My Custom PC Build');

  const handleAddItem = (newItem: Omit<SetupItem, 'id' | 'createdAt'>) => {
    const item: SetupItem = {
      ...newItem,
      id: 'item-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
    };
    setItems((prev) => [item, ...prev]);
  };

  const handleUpdateItem = (id: string, updates: Partial<SetupItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setItems([]);
  };

  const handleAddBuildToChecklist = (parts: PCComponent[], title: string) => {
    const newItems: SetupItem[] = parts.map((part) => ({
      id: 'pc-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: `${part.name} (${part.type.toUpperCase()})`,
      category: 'pc',
      url: part.url || `https://www.google.co.in/search?q=${encodeURIComponent(part.name + ' buy online india')}`,
      price: part.price || 0,
      quantity: 1,
      priority: 'must-have',
      status: 'wishlist',
      notes: `Part of ${title}. ${part.specs || ''}`,
      createdAt: new Date().toISOString(),
    }));

    setItems((prev) => [...newItems, ...prev]);
    setActiveTab('checklist');
  };

  const handleLoadBuildToStudio = (preset: PCPreset) => {
    setSelectedParts(preset.parts);
    setBuildName(preset.title);
    setActiveTab('pcbuilder');
  };

  const totalCost = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-cream text-olive font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        itemsCount={items.length}
        totalCost={totalCost}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 sm:py-8">
        {activeTab === 'checklist' && (
          <div className="space-y-6">
            <BudgetSummaryCard items={items} />
            <ChecklistManager
              items={items}
              onAddItem={handleAddItem}
              onUpdateItem={handleUpdateItem}
              onDeleteItem={handleDeleteItem}
              onClearAll={handleClearAll}
            />
          </div>
        )}

        {activeTab === 'prebuilts' && (
          <PrebuiltsGallery
            onLoadBuildToStudio={handleLoadBuildToStudio}
            onAddPresetToChecklist={handleAddBuildToChecklist}
          />
        )}

        {activeTab === 'pcbuilder' && (
          <PCBuilder 
            selectedParts={selectedParts}
            setSelectedParts={setSelectedParts}
            buildName={buildName}
            setBuildName={setBuildName}
            onAddBuildToChecklist={handleAddBuildToChecklist}
            onOpenPrebuiltsTab={() => setActiveTab('prebuilts')}
          />
        )}
      </main>

      <footer className="border-t border-tan py-6 px-4 text-center text-xs text-olive-muted bg-cream">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-olive-light">
            <span className="font-semibold text-olive">SetupForge</span> — Minimalist Workspace & PC Architecture.
          </div>
          <div className="flex items-center gap-3 text-olive-muted">
            <span>Next.js 14</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Vercel Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
