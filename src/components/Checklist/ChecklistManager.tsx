'use client';

import React, { useState } from 'react';
import { SetupItem, Category, ItemPriority, ItemStatus } from '@/types/setup';
import { CATEGORY_LABELS, createGoogleSearchUrl, createAmazonSearchUrl } from '@/lib/searchUtils';
import { 
  Plus, 
  Trash2, 
  ExternalLink, 
  Search, 
  Check, 
  Sparkles, 
  ShoppingBag,
  BookOpen
} from 'lucide-react';

interface ChecklistManagerProps {
  items: SetupItem[];
  onAddItem: (item: Omit<SetupItem, 'id' | 'createdAt'>) => void;
  onUpdateItem: (id: string, updates: Partial<SetupItem>) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
  onOpenGuide: () => void;
}

export const ChecklistManager: React.FC<ChecklistManagerProps> = ({
  items,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onClearAll,
  onOpenGuide,
}) => {
  // New item form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('desk');
  const [url, setUrl] = useState('');
  const [price, setPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [priority, setPriority] = useState<ItemPriority>('must-have');
  const [notes, setNotes] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price-desc' | 'price-asc' | 'priority' | 'newest'>('newest');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const parsedPrice = parseFloat(price) || 0;
    onAddItem({
      name: name.trim(),
      category,
      url: url.trim(),
      price: parsedPrice,
      quantity: Math.max(1, quantity),
      priority,
      status: 'wishlist',
      notes: notes.trim() || undefined,
    });

    // Reset
    setName('');
    setUrl('');
    setPrice('');
    setQuantity(1);
    setNotes('');
    setIsAdding(false);
  };

  // Filter & Sort Logic
  const filteredItems = items
    .filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.notes?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = filterCategory === 'all' || item.category === filterCategory;
      const matchStatus = filterStatus === 'all' || item.status === filterStatus;
      return matchSearch && matchCategory && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'price-desc') return b.price * b.quantity - a.price * a.quantity;
      if (sortBy === 'price-asc') return a.price * a.quantity - b.price * b.quantity;
      if (sortBy === 'priority') {
        const pMap: Record<ItemPriority, number> = { 'must-have': 3, recommended: 2, optional: 1 };
        return pMap[b.priority] - pMap[a.priority];
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="space-y-6">
      {/* Action Header & Quick Form Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Setup Checklist & Cost Tracker</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
              {filteredItems.length} items
            </span>
          </h2>
          <p className="text-xs text-slate-400">Add productive gear, paste links, enter prices, and track what you've ordered.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold border border-indigo-500/30 transition active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Open Step Guide</span>
          </button>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{isAdding ? 'Close Form' : 'Add Custom Item'}</span>
          </button>

          {items.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Clear all items from your setup checklist?')) {
                  onClearAll();
                }
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-400 border border-slate-700/60 transition"
              title="Clear all checklist items"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Add Item Form Modal/Collapsible */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-slate-900 border border-indigo-500/30 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-semibold text-indigo-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Add Productive Gear to Setup
            </h3>
            <span className="text-xs text-slate-500">All fields update total cost instantly</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">Item / Product Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Standing Desk 60x30, 4K Monitor, or MX Master 3S"
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border border-slate-700 focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border border-slate-700 focus:outline-none focus:border-indigo-500 text-white"
              >
                {Object.entries(CATEGORY_LABELS).map(([catKey, info]) => (
                  <option key={catKey} value={catKey}>
                    {info.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as ItemPriority)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border border-slate-700 focus:outline-none focus:border-indigo-500 text-white"
              >
                <option value="must-have">Must-Have (Essential)</option>
                <option value="recommended">Recommended</option>
                <option value="optional">Optional / Dream</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Product Link / URL <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://amazon.com/... or store link"
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border border-slate-700 focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Price per unit ($) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border border-slate-700 focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border border-slate-700 focus:outline-none focus:border-indigo-500 text-white font-mono"
              />
            </div>

            <div className="lg:col-span-4">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Notes / Specs / Sizing <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Walnut finish, dual motor, 100W USB-C PD"
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border border-slate-700 focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-xs rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30"
            >
              Save Item
            </button>
          </div>
        </form>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/80">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your items by name or notes..."
            className="w-full pl-10 pr-4 py-1.5 text-xs rounded-xl bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-indigo-500 text-slate-200 placeholder-slate-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Categories</option>
            {Object.entries(CATEGORY_LABELS).map(([key, info]) => (
              <option key={key} value={key}>
                {info.label}
              </option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="wishlist">Wishlist / Planned</option>
            <option value="ordered">Ordered</option>
            <option value="received">Purchased / Received</option>
          </select>

          {/* Sort order */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 text-xs rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="newest">Recently Added</option>
            <option value="price-desc">Highest Price First</option>
            <option value="price-asc">Lowest Price First</option>
            <option value="priority">Priority Order</option>
          </select>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-2.5">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-slate-800 bg-slate-900/20">
            <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-base font-medium text-slate-300">Your setup checklist is empty</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-5">
              Add your items by yourself, or launch the step-by-step setup guide to pick desk, chair, monitors, audio, and accessories.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onOpenGuide}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Launch Step-by-Step Guide</span>
              </button>
              <button
                onClick={() => setIsAdding(true)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item Manually</span>
              </button>
            </div>
          </div>
        ) : (
          filteredItems.map((item) => {
            const catInfo = CATEGORY_LABELS[item.category] || {
              label: item.category,
              color: 'bg-slate-800 text-slate-300 border-slate-700',
            };
            const itemTotal = item.price * item.quantity;

            return (
              <div
                key={item.id}
                className={`group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl border transition-all ${
                  item.status === 'received'
                    ? 'bg-emerald-950/10 border-emerald-500/20'
                    : item.status === 'ordered'
                    ? 'bg-blue-950/10 border-blue-500/20'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Left side: Status toggle, Category, Title, Specs */}
                <div className="flex items-start gap-3 flex-1">
                  {/* Status checkbox */}
                  <button
                    onClick={() => {
                      const nextStatus: ItemStatus =
                        item.status === 'wishlist'
                          ? 'ordered'
                          : item.status === 'ordered'
                          ? 'received'
                          : 'wishlist';
                      onUpdateItem(item.id, { status: nextStatus });
                    }}
                    title={`Current status: ${item.status}. Click to cycle: Wishlist -> Ordered -> Received`}
                    className={`mt-1 w-5 h-5 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                      item.status === 'received'
                        ? 'bg-emerald-500 border-emerald-400 text-black'
                        : item.status === 'ordered'
                        ? 'bg-blue-500 border-blue-400 text-white'
                        : 'border-slate-700 bg-slate-800/60 hover:border-slate-500 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${catInfo.color}`}>
                        {catInfo.label}
                      </span>

                      {item.priority === 'must-have' && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-red-500/10 text-red-400 border border-red-500/20">
                          Must-have
                        </span>
                      )}
                      {item.priority === 'recommended' && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          Recommended
                        </span>
                      )}

                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          item.status === 'received'
                            ? 'text-emerald-400 bg-emerald-500/10'
                            : item.status === 'ordered'
                            ? 'text-blue-400 bg-blue-500/10'
                            : 'text-slate-400 bg-slate-800'
                        }`}
                      >
                        {item.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white group-hover:text-indigo-200 transition">
                        {item.name}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-xs px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                          x{item.quantity}
                        </span>
                      )}
                    </div>

                    {item.notes && (
                      <p className="text-xs text-slate-400 leading-relaxed">{item.notes}</p>
                    )}
                  </div>
                </div>

                {/* Right side: Cost, Link shortcuts, Actions */}
                <div className="flex items-center justify-between md:justify-end gap-4 mt-3 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                  {/* Google & Deal Search shortcuts */}
                  <div className="flex items-center gap-1.5">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        title="Open product link"
                        className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-indigo-300 border border-slate-700"
                      >
                        <span>Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : null}

                    <a
                      href={createGoogleSearchUrl(`${item.name} best price deals`)}
                      target="_blank"
                      rel="noreferrer"
                      title="Search Google for lowest prices"
                      className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300 border border-slate-800"
                    >
                      <Search className="w-3 h-3 text-slate-400" />
                      <span>Google</span>
                    </a>

                    <a
                      href={createAmazonSearchUrl(item.name)}
                      target="_blank"
                      rel="noreferrer"
                      title="Search on Amazon"
                      className="hidden sm:flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-amber-300 border border-slate-800"
                    >
                      <span>Amazon</span>
                    </a>
                  </div>

                  {/* Price info */}
                  <div className="text-right min-w-[90px]">
                    <div className="text-sm font-bold text-white font-mono">
                      ${itemTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-[10px] text-slate-500 font-mono">
                        ${item.price.toFixed(2)} each
                      </div>
                    )}
                  </div>

                  {/* Delete Item */}
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
