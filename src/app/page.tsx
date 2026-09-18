'use client';

import React, { useState, useEffect } from 'react';
import { SetupItem, PCComponent, SetupPreset } from '@/types/setup';
import { Navbar } from '@/components/Shared/Navbar';
import { BudgetSummaryCard } from '@/components/Checklist/BudgetSummaryCard';
import { ChecklistManager } from '@/components/Checklist/ChecklistManager';
import { PCBuilder } from '@/components/PCBuilder/PCBuilder';
import { RecommendationHub } from '@/components/Recommendations/RecommendationHub';
import { SetupWizard } from '@/components/SetupWizard/SetupWizard';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'checklist' | 'pcbuilder' | 'recommendations'>('checklist');
  // Starts completely empty — user creates items themselves or uses the step guide
  const [items, setItems] = useState<SetupItem[]>([]);
  const [neonConnected, setNeonConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [setupId, setSetupId] = useState<string>('primary-setup');
  const [showGuide, setShowGuide] = useState(false);

  // Check Neon Postgres connection on mount
  useEffect(() => {
    checkNeonStatus('primary-setup');
  }, []);

  // Fetch Neon database status & existing data if saved
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

  // Sync / Save to Neon database
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

  // Checklist Actions
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

  // Step-by-Step Wizard Finish action
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

  // PC Builder Sync action
  const handleAddBuildToChecklist = (parts: PCComponent[], buildName: string) => {
    const newItems: SetupItem[] = parts.map((part) => ({
      id: 'pc-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: `${part.name} (${part.type.toUpperCase()})`,
      category: 'pc',
      url: part.url || `https://www.google.com/search?q=${encodeURIComponent(part.name + ' buy deals')}`,
      price: part.price,
      quantity: 1,
      priority: 'must-have',
      status: 'wishlist',
      notes: `Part of ${buildName}. ${part.specs || ''}`,
      createdAt: new Date().toISOString(),
    }));

    setItems((prev) => [...newItems, ...prev]);
    setActiveTab('checklist');
  };

  // Preset import action
  const handleAddPresetItems = (presetItems: SetupPreset['items']) => {
    const newItems: SetupItem[] = presetItems.map((pi) => ({
      id: 'preset-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: pi.name,
      category: pi.category,
      url: `https://www.google.com/search?q=${encodeURIComponent(pi.searchQuery || pi.name)}`,
      price: pi.estimatedPrice,
      quantity: 1,
      priority: pi.priority,
      status: 'wishlist',
      notes: pi.notes,
      createdAt: new Date().toISOString(),
    }));

    setItems((prev) => [...newItems, ...prev]);
    setActiveTab('checklist');
  };

  const totalCost = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
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

      {/* Step-by-Step Setup Guide Modal */}
      {showGuide && (
        <SetupWizard
          onFinishWizard={handleFinishWizard}
          onClose={() => setShowGuide(false)}
        />
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
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

        {activeTab === 'pcbuilder' && (
          <PCBuilder onAddBuildToChecklist={handleAddBuildToChecklist} />
        )}

        {activeTab === 'recommendations' && (
          <RecommendationHub
            onAddPresetItems={handleAddPresetItems}
            onAddItemDirectly={(item) =>
              handleAddItem({
                name: item.name,
                category: item.category,
                price: item.price,
                priority: item.priority,
                status: 'wishlist',
                quantity: 1,
                url: item.url || '',
                notes: item.notes,
              })
            }
          />
        )}
      </main>

      <footer className="border-t border-slate-800/60 py-6 px-4 text-center text-xs text-slate-500 bg-[#070a12]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-slate-400">SetupForge</span> — Plan, Budget, and Build Productive Workspaces.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Next.js 14</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Neon Database</span>
            <span>•</span>
            <span>Vercel Deployable</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
