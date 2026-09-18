'use client';

import React from 'react';
import { SetupItem } from '@/types/setup';
import { CATEGORY_LABELS, formatINR } from '@/lib/searchUtils';
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
      <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-white border border-tan shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-tan pb-5">
          <div>
            <span className="text-xs uppercase font-medium tracking-wider text-olive-light">Total Setup Budget (INR)</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-semibold text-olive tracking-tight font-mono">
                {formatINR(totalCost)}
              </span>
              <span className="text-xs text-olive-muted font-medium">({items.length} items)</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cream-dark border border-tan-dark text-olive">
              <CheckCircle2 className="w-4 h-4 text-olive-light" />
              <div>
                <div className="text-[10px] text-olive-light">Committed / Ordered</div>
                <div className="font-semibold font-mono text-olive">{formatINR(purchasedCost)}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cream-light border border-tan text-olive-light">
              <Clock className="w-4 h-4 text-olive-muted" />
              <div>
                <div className="text-[10px] text-olive-muted">Remaining Planned</div>
                <div className="font-semibold font-mono text-olive">{formatINR(pendingCost)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category breakdown mini progress bars */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-olive-light mb-2.5">
            <span>Spend Distribution by Category</span>
            <span className="text-olive-muted">{sortedCategories.length} active categories</span>
          </div>
          {sortedCategories.length === 0 ? (
            <div className="text-xs text-olive-muted italic py-2">
              Checklist is currently empty. Add custom items below or customize parts in PC Studio.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1">
              {sortedCategories.map(([catKey, amount]) => {
                const info = CATEGORY_LABELS[catKey] || { label: catKey, color: 'text-olive-light' };
                const pct = totalCost > 0 ? Math.round((amount / totalCost) * 100) : 0;
                return (
                  <div key={catKey} className="p-2.5 rounded-xl bg-cream-light border border-tan">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="truncate text-olive-light font-medium">{info.label}</span>
                      <span className="font-mono text-olive-muted text-[10px]">{pct}%</span>
                    </div>
                    <div className="text-xs font-semibold text-olive font-mono">{formatINR(amount)}</div>
                    <div className="w-full bg-cream-deep h-1 rounded-full mt-2 overflow-hidden">
                      <div className="bg-olive h-full rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Cozy Setup Health Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-tan shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3 border-b border-tan pb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-olive-light">
              Workspace Overview
            </span>
            <span className="text-[10px] font-mono text-olive-muted">INDIAN STANDARDS</span>
          </div>
          <div className="space-y-2.5 text-xs text-olive-light">
            <div className="flex justify-between items-center py-1 border-b border-tan">
              <span className="text-olive-light">Must-Have Essentials:</span>
              <span className="font-semibold font-mono text-olive">
                {formatINR(items.filter(i => i.priority === 'must-have').reduce((s, i) => s + i.price * i.quantity, 0))}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-tan">
              <span className="text-olive-light">Optional / Dream Gear:</span>
              <span className="font-semibold font-mono text-olive">
                {formatINR(items.filter(i => i.priority === 'optional').reduce((s, i) => s + i.price * i.quantity, 0))}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-olive-light">Average Gear Price:</span>
              <span className="font-semibold font-mono text-olive">
                {formatINR(items.length > 0 ? totalCost / items.length : 0)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-tan flex items-center gap-2 text-xs text-olive-light bg-cream-light p-2.5 rounded-xl border border-tan">
          <AlertCircle className="w-4 h-4 shrink-0 text-olive-muted" />
          <span>Need ideas? Switch to <b>Pre-Built Rigs</b> or <b>Custom PC Studio</b>.</span>
        </div>
      </div>
    </div>
  );
};
