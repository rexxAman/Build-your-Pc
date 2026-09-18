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

    setName('');
    setUrl('');
    setPrice('');
    setQuantity(1);
    setNotes('');
    setIsAdding(false);
  };

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
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
        <div>
          <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
            <span>Setup Checklist & Cost Tracker</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-mono">
              {filteredItems.length} items
            </span>
          </h2>
          <p className="text-xs text-zinc-400">Track your workspace gear, paste purchase links, enter prices, and mark items as ordered.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-200 text-xs font-semibold border border-zinc-700 transition active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5 text-zinc-300" />
            <span>Open Step Guide</span>
          </button>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold shadow-md shadow-white/5 transition active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>{isAdding ? 'Close Form' : 'Add Item'}</span>
          </button>

          {items.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Clear all items from your setup checklist?')) {
                  onClearAll();
                }
              }}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 border border-zinc-700 transition"
              title="Clear all checklist items"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Add Item Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-700 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-semibold text-zinc-100">
              Add Setup Item
            </h3>
            <span className="text-xs text-zinc-500">Updates total cost automatically</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-xs font-medium text-zinc-300 mb-1">Item / Product Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Standing Desk 60x30, 4K Display, or MX Master 3S"
                className="w-full px-3 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-zinc-500 text-zinc-100 placeholder-zinc-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-zinc-500 text-zinc-100"
              >
                {Object.entries(CATEGORY_LABELS).map(([catKey, info]) => (
                  <option key={catKey} value={catKey}>
                    {info.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as ItemPriority)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-zinc-500 text-zinc-100"
              >
                <option value="must-have">Must-Have (Essential)</option>
                <option value="recommended">Recommended</option>
                <option value="optional">Optional / Wishlist</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Product Link / URL <span className="text-zinc-500 font-normal">(Optional)</span>
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://amazon.com/... or store link"
                className="w-full px-3 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-zinc-500 text-zinc-100 placeholder-zinc-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Price per unit ($) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-zinc-500 text-zinc-100 placeholder-zinc-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-zinc-500 text-zinc-100 font-mono"
              />
            </div>

            <div className="lg:col-span-4">
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Notes / Specs / Sizing <span className="text-zinc-500 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Walnut tabletop, dual motor, 90W USB-C"
                className="w-full px-3 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-zinc-500 text-zinc-100 placeholder-zinc-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-xs rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 shadow-sm"
            >
              Save Item
            </button>
          </div>
        </form>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items by name or specs..."
            className="w-full pl-10 pr-4 py-1.5 text-xs rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-zinc-600 text-zinc-100 placeholder-zinc-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 focus:outline-none focus:border-zinc-600"
          >
            <option value="all">All Categories</option>
            {Object.entries(CATEGORY_LABELS).map(([key, info]) => (
              <option key={key} value={key}>
                {info.label}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 focus:outline-none focus:border-zinc-600"
          >
            <option value="all">All Statuses</option>
            <option value="wishlist">Wishlist / Planned</option>
            <option value="ordered">Ordered</option>
            <option value="received">Purchased / Received</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 text-xs rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 focus:outline-none focus:border-zinc-600"
          >
            <option value="newest">Recently Added</option>
            <option value="price-desc">Highest Price</option>
            <option value="price-asc">Lowest Price</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-2.5">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/40">
            <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h4 className="text-sm font-semibold text-zinc-200">Your setup checklist is empty</h4>
            <p className="text-xs text-zinc-500 max-w-md mx-auto mt-1 mb-5 leading-relaxed">
              Add your items individually, or open the step-by-step setup guide to plan your desk, seating, monitor, lighting, and cable layout.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onOpenGuide}
                className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold shadow-md flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>Open Step Guide</span>
              </button>
              <button
                onClick={() => setIsAdding(true)}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 flex items-center gap-1.5"
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
              color: 'bg-zinc-800 text-zinc-200 border-zinc-700',
            };
            const itemTotal = item.price * item.quantity;

            return (
              <div
                key={item.id}
                className={`group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl border transition-all ${
                  item.status === 'received'
                    ? 'bg-zinc-900/90 border-zinc-700'
                    : item.status === 'ordered'
                    ? 'bg-zinc-900/70 border-zinc-750'
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Left side */}
                <div className="flex items-start gap-3 flex-1">
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
                    title={`Current: ${item.status}. Click to cycle: Wishlist -> Ordered -> Received`}
                    className={`mt-1 w-5 h-5 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                      item.status === 'received'
                        ? 'bg-zinc-100 border-white text-zinc-950'
                        : item.status === 'ordered'
                        ? 'bg-zinc-700 border-zinc-500 text-zinc-100'
                        : 'border-zinc-700 bg-zinc-950 hover:border-zinc-500 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md border ${catInfo.color}`}>
                        {catInfo.label}
                      </span>

                      {item.priority === 'must-have' && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-200 border border-zinc-700">
                          Must-have
                        </span>
                      )}
                      {item.priority === 'recommended' && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-850 text-zinc-300 border border-zinc-750">
                          Recommended
                        </span>
                      )}

                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                        {item.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-zinc-100">
                        {item.name}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-xs px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 font-mono">
                          x{item.quantity}
                        </span>
                      )}
                    </div>

                    {item.notes && (
                      <p className="text-xs text-zinc-400 leading-relaxed">{item.notes}</p>
                    )}
                  </div>
                </div>

                {/* Right side */}
                <div className="flex items-center justify-between md:justify-end gap-4 mt-3 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-zinc-800">
                  <div className="flex items-center gap-1.5">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        title="Open product link"
                        className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700"
                      >
                        <span>Link</span>
                        <ExternalLink className="w-3 h-3 text-zinc-400" />
                      </a>
                    ) : null}

                    <a
                      href={createGoogleSearchUrl(`${item.name} best price deals`)}
                      target="_blank"
                      rel="noreferrer"
                      title="Search Google"
                      className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
                    >
                      <Search className="w-3 h-3 text-zinc-400" />
                      <span>Google</span>
                    </a>

                    <a
                      href={createAmazonSearchUrl(item.name)}
                      target="_blank"
                      rel="noreferrer"
                      title="Search Amazon"
                      className="hidden sm:flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
                    >
                      <span>Amazon</span>
                    </a>
                  </div>

                  <div className="text-right min-w-[90px]">
                    <div className="text-sm font-semibold text-zinc-100 font-mono">
                      ${itemTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-[10px] text-zinc-500 font-mono">
                        ${item.price.toFixed(2)} each
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition"
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
