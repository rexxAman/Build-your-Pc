'use client';

import React from 'react';
import { SetupItem } from '@/types/setup';
import { CATEGORY_LABELS } from '@/lib/searchUtils';
import { DollarSign, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface BudgetSummaryCardProps {
  items: SetupItem[];
}

export const BudgetSummaryCard: React.FC<BudgetSummaryCardProps> = ({ items }) => {
  const totalCost = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const purchasedCost = items
    .filter((item) => item.status === 'received' || item.status === 'ordered')
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const pendingCost = totalCost - purchasedCost;

  // Category breakdowns
  const categoryTotals = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.price * item.quantity;
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      {/* Total Aggregation Card */}
      <div className="lg:col-span-2 p-5 rounded-2xl bg-gradient-to-br from-[#111827] to-[#0f172a] border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Total Setup Investment</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-slate-400 font-medium">({items.length} items planned)</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <div>
                <div className="text-[10px] text-emerald-300/70">Committed / Paid</div>
                <div className="font-semibold">${purchasedCost.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Clock className="w-4 h-4" />
              <div>
                <div className="text-[10px] text-amber-300/70">Remaining Wishlist</div>
                <div className="font-semibold">${pendingCost.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category breakdown mini progress bars */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Spend Distribution by Category</span>
            <span>{sortedCategories.length} active categories</span>
          </div>
          {sortedCategories.length === 0 ? (
            <div className="text-xs text-slate-500 italic py-2">No items added yet. Add your first item below or choose from presets.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1">
              {sortedCategories.map(([catKey, amount]) => {
                const info = CATEGORY_LABELS[catKey] || { label: catKey, color: 'text-slate-400' };
                const pct = totalCost > 0 ? Math.round((amount / totalCost) * 100) : 0;
                return (
                  <div key={catKey} className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="truncate text-slate-300 font-medium">{info.label}</span>
                      <span className="font-mono text-slate-400 text-[10px]">{pct}%</span>
                    </div>
                    <div className="text-xs font-semibold text-white">${amount.toLocaleString()}</div>
                    <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick Setup Stats & Advice */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-[#111827] to-[#0d1322] border border-slate-800 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" /> Setup Budget Health
            </span>
          </div>
          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Must-Have Priority Total:</span>
              <span className="font-semibold text-slate-200">
                ${items.filter(i => i.priority === 'must-have').reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Optional / Nice-to-Have:</span>
              <span className="font-semibold text-slate-200">
                ${items.filter(i => i.priority === 'optional').reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-400">Average Item Cost:</span>
              <span className="font-semibold text-slate-200">
                ${items.length > 0 ? (totalCost / items.length).toFixed(0) : '0'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-indigo-300/80 bg-indigo-500/5 p-2.5 rounded-xl border border-indigo-500/10">
          <AlertCircle className="w-4 h-4 shrink-0 text-indigo-400" />
          <span>Need hardware ideas? Open the <b>PC Builder Studio</b> tab or the <b>Inspiration</b> tab anytime.</span>
        </div>
      </div>
    </div>
  );
};
