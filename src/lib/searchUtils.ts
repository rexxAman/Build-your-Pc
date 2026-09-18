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
  desk: { label: 'Desk & Workspace', iconName: 'Layers', color: 'bg-zinc-800/80 text-zinc-200 border-zinc-700' },
  chair: { label: 'Ergonomic Seating', iconName: 'Armchair', color: 'bg-zinc-800/80 text-zinc-200 border-zinc-700' },
  monitor: { label: 'Monitors & Mounts', iconName: 'Monitor', color: 'bg-zinc-800/80 text-zinc-200 border-zinc-700' },
  pc: { label: 'PC Hardware & Rig', iconName: 'Cpu', color: 'bg-zinc-800/80 text-zinc-200 border-zinc-700' },
  audio: { label: 'Audio & Acoustics', iconName: 'Headphones', color: 'bg-zinc-800/80 text-zinc-200 border-zinc-700' },
  lighting: { label: 'Lighting & Lightbars', iconName: 'Sun', color: 'bg-zinc-800/80 text-zinc-200 border-zinc-700' },
  peripherals: { label: 'Keyboard & Mouse', iconName: 'Keyboard', color: 'bg-zinc-800/80 text-zinc-200 border-zinc-700' },
  accessories: { label: 'Accessories & Cables', iconName: 'Sparkles', color: 'bg-zinc-800/80 text-zinc-200 border-zinc-700' },
};
