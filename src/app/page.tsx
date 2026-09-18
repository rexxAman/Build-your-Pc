'use client';

import React, { useState, useEffect } from 'react';
import { SetupItem, PCComponent, PCPartType, PCPreset } from '@/types/setup';
import { Navbar } from '@/components/Shared/Navbar';
import { BudgetSummaryCard } from '@/components/Checklist/BudgetSummaryCard';
import { ChecklistManager } from '@/components/Checklist/ChecklistManager';
import { PCBuilder } from '@/components/PCBuilder/PCBuilder';
import { PrebuiltsGallery } from '@/components/Prebuilts/PrebuiltsGallery';
import { SetupWizard } from '@/components/SetupWizard/SetupWizard';

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
  const [neonConnected, setNeonConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [setupId, setSetupId] = useState<string>('primary-setup');
  const [showGuide, setShowGuide] = useState(false);

  const [selectedParts, setSelectedParts] = useState<Record<PCPartType, PCComponent | null>>(EMPTY_BUILD);
  const [buildName, setBuildName] = useState('My Custom PC Build');

  useEffect(() => {
    checkNeonStatus('primary-setup');
  }, []);

  const checkNeonStatus = async (idToQuery: string) => {
    try {
      const res = await fetch(`/api/setups?id=${idToQuery}`);
      const data = await res.json();
      if (data.onlineStorageAvailable) {
        setNeonConnected(true);
        if (data.setup?.data?.items && Array.isArray(data.setup.data.items)) {
          setItems(data.setup.data.items);
        }
      } else {
        setNeonConnected(false);
      }
    } catch (e) {
      setNeonConnected(false);
    }
  };

  const handleSyncNeon = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/setups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: setupId,
          name: 'My Productivity Workspace',
          data: { items },
        }),
      });
      const result = await res.json();
      if (res.ok) {
        setNeonConnected(true);
        alert('Setup saved to Neon Database successfully!');
      } else {
        if (!result.onlineStorageAvailable) {
          alert('Neon is not configured yet. Set DATABASE_URL in your Vercel Project Settings or .env file to enable Neon Database.');
        } else {
          alert(`Neon sync status: ${result.message || result.error}`);
        }
      }
    } catch (error) {
      alert('Unable to connect to Neon database. Please make sure DATABASE_URL is set in your Vercel project environment variables.');
    } finally {
      setSyncing(false);
    }
  };

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

  const handleFinishWizard = (wizardItems: Omit<SetupItem, 'id' | 'createdAt'>[]) => {
    const newItems: SetupItem[] = wizardItems.map((wi) => ({
      ...wi,
      id: 'guide-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
    }));

    setItems((prev) => [...prev, ...newItems]);
    setShowGuide(false);
    setActiveTab('checklist');
  };

  const handleAddBuildToChecklist = (parts: PCComponent[], title: string) => {
    const newItems: SetupItem[] = parts.map((part) => ({
      id: 'pc-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: `${part.name} (${part.type.toUpperCase()})`,
      category: 'pc',
      url: part.url || `https://www.google.co.in/search?q=${encodeURIComponent(part.name + ' buy online india')}`,
      price: part.price,
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
    <div className="min-h-screen flex flex-col bg-[#09090b] text-zinc-100 font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        itemsCount={items.length}
        totalCost={totalCost}
        neonConnected={neonConnected}
        syncing={syncing}
        onSync={handleSyncNeon}
        onOpenGuide={() => setShowGuide(true)}
      />

      {showGuide && (
        <SetupWizard
          onFinishWizard={handleFinishWizard}
          onClose={() => setShowGuide(false)}
        />
      )}

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
              onOpenGuide={() => setShowGuide(true)}
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

      <footer className="border-t border-zinc-900 py-6 px-4 text-center text-xs text-zinc-500 bg-[#09090b]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-zinc-400">
            <span className="font-semibold text-zinc-200">SetupForge</span> — Minimalist Workspace & PC Architecture.
          </div>
          <div className="flex items-center gap-3 text-zinc-500">
            <span>Next.js 14</span>
            <span>•</span>
            <span>Neon Postgres</span>
            <span>•</span>
            <span>Vercel Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
