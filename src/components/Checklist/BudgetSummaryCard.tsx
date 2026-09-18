'use client';

import React from 'react';
import { SetupItem } from '@/types/setup';
import { CATEGORY_LABELS } from '@/lib/searchUtils';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

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
      <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
          <div>
            <span className="text-xs uppercase font-medium tracking-wider text-zinc-400">Total Setup Budget</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-semibold text-zinc-100 tracking-tight font-mono">
                ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-zinc-500 font-medium">({items.length} items)</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-800/80 border border-zinc-700/80 text-zinc-200">
              <CheckCircle2 className="w-4 h-4 text-zinc-300" />
              <div>
                <div className="text-[10px] text-zinc-400">Committed / Ordered</div>
                <div className="font-semibold font-mono text-zinc-100">${purchasedCost.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-800/50 border border-zinc-800 text-zinc-300">
              <Clock className="w-4 h-4 text-zinc-400" />
              <div>
                <div className="text-[10px] text-zinc-500">Remaining Planned</div>
                <div className="font-semibold font-mono text-zinc-200">${pendingCost.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category breakdown mini progress bars */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2.5">
            <span>Spend Distribution by Category</span>
            <span className="text-zinc-500">{sortedCategories.length} active categories</span>
          </div>
          {sortedCategories.length === 0 ? (
            <div className="text-xs text-zinc-500 italic py-2">
              Checklist is currently empty. Use the <b>Setup Guide</b> or add custom items below.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1">
              {sortedCategories.map(([catKey, amount]) => {
                const info = CATEGORY_LABELS[catKey] || { label: catKey, color: 'text-zinc-400' };
                const pct = totalCost > 0 ? Math.round((amount / totalCost) * 100) : 0;
                return (
                  <div key={catKey} className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-850">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="truncate text-zinc-300 font-medium">{info.label}</span>
                      <span className="font-mono text-zinc-400 text-[10px]">{pct}%</span>
                    </div>
                    <div className="text-xs font-semibold text-zinc-100 font-mono">${amount.toLocaleString()}</div>
                    <div className="w-full bg-zinc-800 h-1 rounded-full mt-2 overflow-hidden">
                      <div className="bg-zinc-200 h-full rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Cozy Setup Health Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Workspace Overview
            </span>
            <span className="text-[10px] font-mono text-zinc-500">COZY NOIR</span>
          </div>
          <div className="space-y-2.5 text-xs text-zinc-300">
            <div className="flex justify-between items-center py-1 border-b border-zinc-850">
              <span className="text-zinc-400">Must-Have Essentials:</span>
              <span className="font-semibold font-mono text-zinc-200">
                ${items.filter(i => i.priority === 'must-have').reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-zinc-850">
              <span className="text-zinc-400">Optional / Dream Gear:</span>
              <span className="font-semibold font-mono text-zinc-200">
                ${items.filter(i => i.priority === 'optional').reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-zinc-400">Average Gear Price:</span>
              <span className="font-semibold font-mono text-zinc-200">
                ${items.length > 0 ? (totalCost / items.length).toFixed(0) : '0'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center gap-2 text-xs text-zinc-400 bg-zinc-950 p-2.5 rounded-xl border border-zinc-850">
          <AlertCircle className="w-4 h-4 shrink-0 text-zinc-300" />
          <span>Need ideas? Click <b>Setup Guide</b> or switch to <b>PC Studio</b>.</span>
        </div>
      </div>
    </div>
  );
};
