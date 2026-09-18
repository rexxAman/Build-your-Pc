'use client';

import React, { useState, useEffect } from 'react';
import { SetupItem, Category, ItemPriority, PCComponent, SetupPreset } from '@/types/setup';
import { Navbar } from '@/components/Shared/Navbar';
import { BudgetSummaryCard } from '@/components/Checklist/BudgetSummaryCard';
import { ChecklistManager } from '@/components/Checklist/ChecklistManager';
import { PCBuilder } from '@/components/PCBuilder/PCBuilder';
import { RecommendationHub } from '@/components/Recommendations/RecommendationHub';

const STORAGE_KEY = 'setupforge_items_v1';
const SETUP_ID_KEY = 'setupforge_current_id';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'checklist' | 'pcbuilder' | 'recommendations'>('checklist');
  const [items, setItems] = useState<SetupItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [onlineStorageConnected, setOnlineStorageConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [setupId, setSetupId] = useState<string>('default-setup');

  // Initial load
  useEffect(() => {
    // Generate or fetch ID
    let currentId = localStorage.getItem(SETUP_ID_KEY);
    if (!currentId) {
      currentId = 'setup_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem(SETUP_ID_KEY, currentId);
    }
    setSetupId(currentId);

    // Try loading local items
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse local storage items', e);
      }
    } else {
      // Seed default welcoming item if empty
      const initialItems: SetupItem[] = [
        {
          id: 'item-demo-1',
          name: 'Motorized Dual-Motor Standing Desk (60x30")',
          category: 'desk',
          url: 'https://www.google.com/search?q=dual+motor+standing+desk+60x30',
          price: 549,
          quantity: 1,
          priority: 'must-have',
          status: 'wishlist',
          notes: 'Bamboo desktop, solid T-frame, memory presets',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'item-demo-2',
          name: 'Dell UltraSharp 34" Curved USB-C Hub Monitor (U3423WE)',
          category: 'monitor',
          url: 'https://www.google.com/search?q=Dell+UltraSharp+34+Curved+USB-C+Hub+Monitor',
          price: 799,
          quantity: 1,
          priority: 'must-have',
          status: 'wishlist',
          notes: 'Built-in KVM & 90W PD charging for laptop',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'item-demo-3',
          name: 'Logitech MX Master 3S Ergonomic Mouse',
          category: 'peripherals',
          url: 'https://www.amazon.com/s?k=logitech+mx+master+3s',
          price: 99,
          quantity: 1,
          priority: 'recommended',
          status: 'received',
          notes: 'Quiet clicks, MagSpeed scroll wheel',
          createdAt: new Date().toISOString(),
        }
      ];
      setItems(initialItems);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialItems));
    }

    // Check Neon online availability
    checkNeonStatus(currentId);
    setIsLoaded(true);
  }, []);

  // Save to local storage whenever items change
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isLoaded]);

  // Neon check function
  const checkNeonStatus = async (idToQuery: string) => {
    try {
      const res = await fetch(`/api/setups?id=${idToQuery}`);
      const data = await res.json();
      if (data.onlineStorageAvailable) {
        setOnlineStorageConnected(true);
        if (data.setup?.data?.items && data.setup.data.items.length > 0) {
          // If remote exists and local is default or user wants to sync
          // we can retain or load
        }
      } else {
        setOnlineStorageConnected(false);
      }
    } catch (e) {
      setOnlineStorageConnected(false);
    }
  };

  // Sync to Neon
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
        setOnlineStorageConnected(true);
        alert('Setup saved to Neon Cloud database successfully!');
      } else {
        if (!result.onlineStorageAvailable) {
          alert('Neon is not configured yet. You can set DATABASE_URL in your Vercel project environment variables to enable cloud syncing.');
        } else {
          alert(`Sync note: ${result.message || result.error}`);
        }
      }
    } catch (error) {
      alert('Local storage is active. To connect Neon cloud database, specify DATABASE_URL in your environment or Vercel settings.');
    } finally {
      setSyncing(false);
    }
  };

  // Export JSON
  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `setupforge-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e: any) => {
      const file = e.target?.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          if (Array.isArray(imported)) {
            setItems(imported);
            alert(`Imported ${imported.length} items successfully!`);
          } else {
            alert('Invalid file format: expected an array of items.');
          }
        } catch (err) {
          alert('Error parsing JSON file.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
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

  // PC Builder Sync action
  const handleAddBuildToChecklist = (parts: PCComponent[], buildName: string) => {
    const newItems: SetupItem[] = parts.map((part) => ({
      id: 'pc-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: `${part.name} (${part.type.toUpperCase()})`,
      category: 'pc',
      url: part.url || `https://www.google.com/search?q=${encodeURIComponent(part.name + ' buy')}`,
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
        onlineStorageConnected={onlineStorageConnected}
        syncing={syncing}
        onSync={handleSyncNeon}
        onExport={handleExport}
        onImport={handleImport}
      />

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
            <span>Neon Postgres Ready</span>
            <span>•</span>
            <span>Vercel Deployable</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
