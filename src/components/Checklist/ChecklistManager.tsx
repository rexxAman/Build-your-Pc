'use client';

import React, { useState } from 'react';
import { SetupItem, Category, ItemPriority, ItemStatus } from '@/types/setup';
import { CATEGORY_LABELS, createGoogleSearchUrl, createAmazonSearchUrl, formatINR } from '@/lib/searchUtils';
import { 
  Plus, 
  Trash2, 
  ExternalLink, 
  Search, 
  Check, 
  ShoppingBag
} from 'lucide-react';

interface ChecklistManagerProps {
  items: SetupItem[];
  onAddItem: (item: Omit<SetupItem, 'id' | 'createdAt'>) => void;
  onUpdateItem: (id: string, updates: Partial<SetupItem>) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export const ChecklistManager: React.FC<ChecklistManagerProps> = ({
  items,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onClearAll,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-tan">
        <div>
          <h2 className="text-base font-semibold text-olive flex items-center gap-2">
            <span>Setup Checklist & Cost Tracker</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cream-dark text-olive-light font-mono">
              {filteredItems.length} items
            </span>
          </h2>
          <p className="text-xs text-olive-light">Track your workspace gear in INR (₹), paste purchase links, enter prices, and track orders.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-olive hover:bg-olive/90 text-white text-xs font-semibold shadow-md transition active:scale-95"
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
              className="p-2 rounded-xl bg-cream-dark hover:bg-tan text-olive-muted hover:text-terra border border-tan-dark transition"
              title="Clear all checklist items"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Add Item Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-white border border-tan-dark shadow-md space-y-4 animate-in fade-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between border-b border-tan pb-3">
            <h3 className="text-sm font-semibold text-olive">
              Add Setup Item (India Standard)
            </h3>
            <span className="text-xs text-olive-muted">Calculates total cost in ₹ INR</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-xs font-medium text-olive-light mb-1">Item / Product Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Standing Desk, Featherlite Chair, or MX Master 3S"
                className="w-full px-3 py-2 text-sm rounded-xl bg-cream-light border border-tan focus:outline-none focus:border-olive text-olive placeholder-olive-muted"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-olive-light mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-cream-light border border-tan focus:outline-none focus:border-olive text-olive"
              >
                {Object.entries(CATEGORY_LABELS).map(([catKey, info]) => (
                  <option key={catKey} value={catKey}>
                    {info.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-olive-light mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as ItemPriority)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-cream-light border border-tan focus:outline-none focus:border-olive text-olive"
              >
                <option value="must-have">Must-Have (Essential)</option>
                <option value="recommended">Recommended</option>
                <option value="optional">Optional / Wishlist</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-xs font-medium text-olive-light mb-1">
                Product Link / URL <span className="text-olive-muted font-normal">(Amazon.in / MDComputers / Store)</span>
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://amazon.in/... or store link"
                className="w-full px-3 py-2 text-sm rounded-xl bg-cream-light border border-tan focus:outline-none focus:border-olive text-olive placeholder-olive-muted"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-olive-light mb-1">
                Price per unit (₹ INR) <span className="text-olive-muted font-normal">(Optional)</span>
              </label>
              <input
                type="number"
                step="1"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 14999 (or leave blank)"
                className="w-full px-3 py-2 text-sm rounded-xl bg-cream-light border border-tan focus:outline-none focus:border-olive text-olive placeholder-olive-muted font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-olive-light mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-cream-light border border-tan focus:outline-none focus:border-olive text-olive font-mono"
              />
            </div>

            <div className="lg:col-span-4">
              <label className="block text-xs font-medium text-olive-light mb-1">
                Notes / Specs / Warranty <span className="text-olive-muted font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. 3-year warranty in India, dual motor, 65W Type-C"
                className="w-full px-3 py-2 text-sm rounded-xl bg-cream-light border border-tan focus:outline-none focus:border-olive text-olive placeholder-olive-muted"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-xs rounded-xl bg-cream-dark hover:bg-tan text-olive-light"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-olive hover:bg-olive/90 text-white shadow-sm"
            >
              Save Item
            </button>
          </div>
        </form>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-tan">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-olive-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items by name or specs..."
            className="w-full pl-10 pr-4 py-1.5 text-xs rounded-xl bg-cream-light border border-tan focus:outline-none focus:border-olive text-olive placeholder-olive-muted"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-cream-light border border-tan text-olive-light focus:outline-none focus:border-olive"
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
            className="px-3 py-1.5 text-xs rounded-xl bg-cream-light border border-tan text-olive-light focus:outline-none focus:border-olive"
          >
            <option value="all">All Statuses</option>
            <option value="wishlist">Wishlist / Planned</option>
            <option value="ordered">Ordered</option>
            <option value="received">Purchased / Received</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 text-xs rounded-xl bg-cream-light border border-tan text-olive-light focus:outline-none focus:border-olive"
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
          <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-tan bg-cream-light">
            <ShoppingBag className="w-12 h-12 text-olive-muted mx-auto mb-3" />
            <h4 className="text-sm font-semibold text-olive">Your setup checklist is empty</h4>
            <p className="text-xs text-olive-muted max-w-md mx-auto mt-1 mb-5 leading-relaxed">
              Add your setup items individually, or browse Pre-Built Rigs and Custom PC Studio to customize components.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setIsAdding(true)}
                className="px-4 py-2 rounded-xl bg-olive hover:bg-olive/90 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add Item Manually</span>
              </button>
            </div>
          </div>
        ) : (
          filteredItems.map((item) => {
            const catInfo = CATEGORY_LABELS[item.category] || {
              label: item.category,
              color: 'bg-cream-dark text-olive border-tan-dark',
            };
            const itemTotal = item.price * item.quantity;

            return (
              <div
                key={item.id}
                className={`group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl border transition-all ${
                  item.status === 'received'
                    ? 'bg-white border-tan-dark'
                    : item.status === 'ordered'
                    ? 'bg-white border-tan-dark'
                    : 'bg-white border-tan hover:border-tan-dark'
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
                        ? 'bg-olive border-olive text-white'
                        : item.status === 'ordered'
                        ? 'bg-tan border-tan-dark text-olive'
                        : 'border-tan-dark bg-cream-light hover:border-olive text-transparent'
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
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-cream-dark text-olive border border-tan-dark">
                          Must-have
                        </span>
                      )}
                      {item.priority === 'recommended' && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-cream-dark text-olive-light border border-tan-dark">
                          Recommended
                        </span>
                      )}

                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cream-dark text-olive-light">
                        {item.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-olive">
                        {item.name}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-xs px-1.5 py-0.2 rounded bg-cream-dark text-olive-light font-mono">
                          x{item.quantity}
                        </span>
                      )}
                    </div>

                    {item.notes && (
                      <p className="text-xs text-olive-light leading-relaxed">{item.notes}</p>
                    )}
                  </div>
                </div>

                {/* Right side */}
                <div className="flex items-center justify-between md:justify-end gap-4 mt-3 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-tan">
                  <div className="flex items-center gap-1.5">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        title="Open product link"
                        className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-cream-dark hover:bg-tan text-olive border border-tan-dark"
                      >
                        <span>Link</span>
                        <ExternalLink className="w-3 h-3 text-olive-muted" />
                      </a>
                    ) : null}

                    <a
                      href={createGoogleSearchUrl(item.name)}
                      target="_blank"
                      rel="noreferrer"
                      title="Search Google India"
                      className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg bg-cream-light hover:bg-cream-dark text-olive-light border border-tan"
                    >
                      <Search className="w-3 h-3 text-olive-muted" />
                      <span>Google</span>
                    </a>

                    <a
                      href={createAmazonSearchUrl(item.name)}
                      target="_blank"
                      rel="noreferrer"
                      title="Search Amazon.in"
                      className="hidden sm:flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg bg-cream-light hover:bg-cream-dark text-olive-light border border-tan"
                    >
                      <span>Amazon.in</span>
                    </a>
                  </div>

                  <div className="text-right min-w-[95px]">
                    {item.price > 0 ? (
                      <div>
                        <div
                          onClick={() => {
                            const newPriceStr = prompt(`Update price for "${item.name}" in ₹:`, item.price.toString());
                            if (newPriceStr !== null) {
                              const p = parseFloat(newPriceStr) || 0;
                              onUpdateItem(item.id, { price: p });
                            }
                          }}
                          className="text-sm font-semibold text-olive font-mono cursor-pointer hover:underline hover:text-olive"
                          title="Click to update price"
                        >
                          {formatINR(itemTotal)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-olive-muted font-mono">
                            {formatINR(item.price)} each
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          const newPriceStr = prompt(`Enter price for "${item.name}" in ₹:`, '');
                          if (newPriceStr !== null) {
                            const p = parseFloat(newPriceStr) || 0;
                            onUpdateItem(item.id, { price: p });
                          }
                        }}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-cream-dark hover:bg-tan text-olive-light font-medium border border-tan-dark transition"
                        title="Click to enter price"
                      >
                        + Enter Price
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="p-1.5 rounded-lg text-olive-muted hover:text-terra hover:bg-terra-faint transition"
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
