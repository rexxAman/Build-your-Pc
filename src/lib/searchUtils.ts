export function createGoogleSearchUrl(query: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

export function createAmazonSearchUrl(query: string): string {
  return `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
}

export function createRedditSearchUrl(query: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(query + ' site:reddit.com/r/buildapc OR site:reddit.com/r/battlestations')}`;
}

export function createPCPartPickerSearchUrl(query: string): string {
  return `https://pcpartpicker.com/search/?q=${encodeURIComponent(query)}`;
}

export const CATEGORY_LABELS: Record<string, { label: string; iconName: string; color: string }> = {
  desk: { label: 'Desk & Workspace', iconName: 'Layers', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  chair: { label: 'Ergonomic Seating', iconName: 'Armchair', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  monitor: { label: 'Monitors & Mounts', iconName: 'Monitor', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
  pc: { label: 'PC Hardware & Rig', iconName: 'Cpu', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  audio: { label: 'Audio & Acoustics', iconName: 'Headphones', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  lighting: { label: 'Lighting & Lightbars', iconName: 'Sun', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  peripherals: { label: 'Keyboard & Mouse', iconName: 'Keyboard', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  accessories: { label: 'Accessories & Cables', iconName: 'Sparkles', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
};
