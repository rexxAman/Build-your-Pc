'use client';

import React, { useState } from 'react';
import { Category, ItemPriority, SetupItem } from '@/types/setup';
import { createGoogleSearchUrl } from '@/lib/searchUtils';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  ExternalLink, 
  Search, 
  Info,
  CheckCircle2
} from 'lucide-react';

interface SetupWizardProps {
  onFinishWizard: (items: Omit<SetupItem, 'id' | 'createdAt'>[]) => void;
  onClose: () => void;
}

interface StepQuestion {
  stepNumber: number;
  category: Category;
  title: string;
  subtitle: string;
  advice: string;
  searchExample: string;
  options: Array<{
    name: string;
    description: string;
    estimatedPrice: number;
    priority: ItemPriority;
  }>;
}

const WIZARD_STEPS: StepQuestion[] = [
  {
    stepNumber: 1,
    category: 'desk',
    title: 'Step 1: Choose Your Desk Foundation',
    subtitle: 'The cornerstone of your workspace. Consider height adjustability and tabletop size.',
    advice: 'Dual-motor desks support heavier multi-monitor arms and stay stable at standing heights.',
    searchExample: 'best electric dual motor standing desk 60x30 walnut bamboo',
    options: [
      {
        name: 'Electric Standing Desk (Dual Motor, 60x30")',
        description: 'Sit-to-stand motorized adjustment with memory presets and high weight capacity.',
        estimatedPrice: 550,
        priority: 'must-have',
      },
      {
        name: 'Compact Electric Standing Desk (48x24")',
        description: 'Ideal for smaller apartments or cozy bedrooms without sacrificing ergonomics.',
        estimatedPrice: 280,
        priority: 'must-have',
      },
      {
        name: 'Fixed Sturdy Hardwood Minimalist Desk (55" or 60")',
        description: 'Solid surface, zero motor electronics, clean minimal look on heavy steel legs.',
        estimatedPrice: 220,
        priority: 'must-have',
      },
    ],
  },
  {
    stepNumber: 2,
    category: 'chair',
    title: 'Step 2: Ergonomic Seating',
    subtitle: 'Protect your posture, back, and focus during long creative or coding sessions.',
    advice: 'Look for breathable mesh backrests and 3D/4D adjustable armrests to relieve shoulder strain.',
    searchExample: 'ergonomic mesh office chair dynamic lumbar support',
    options: [
      {
        name: 'Ergonomic Breathable Mesh Chair (Dynamic Lumbar)',
        description: 'Full-mesh back and seat with self-adjusting lumbar support and 3D armrests.',
        estimatedPrice: 380,
        priority: 'must-have',
      },
      {
        name: 'High-Value Ergonomic Office Chair',
        description: 'Dependable lower back cushion, tilt recline, and adjustable headrest under $200.',
        estimatedPrice: 180,
        priority: 'must-have',
      },
      {
        name: 'Premium Ergonomic Workstation Chair (Aeron / Embody Tier)',
        description: 'Gold-standard 12-year warranty posture engineering for 10+ hour daily work.',
        estimatedPrice: 950,
        priority: 'recommended',
      },
    ],
  },
  {
    stepNumber: 3,
    category: 'monitor',
    title: 'Step 3: Display & Visual Canvas',
    subtitle: 'Determine your screen real estate: single ultrawide vs dual color-accurate monitors.',
    advice: 'Monitors with 90W+ USB-C Power Delivery and built-in KVM eliminate heavy docking bricks.',
    searchExample: 'ultrawide 34 inch curved monitor 90w usb c kvm ips',
    options: [
      {
        name: '34" Ultrawide Curved USB-C Hub Monitor (1440p)',
        description: 'Seamless wide timeline and side-by-side code editor with built-in laptop charging.',
        estimatedPrice: 650,
        priority: 'must-have',
      },
      {
        name: '27" 4K UHD Color-Calibrated Display (IPS)',
        description: 'Razor sharp text clarity for reading docs, UI design, and photo/video creation.',
        estimatedPrice: 420,
        priority: 'must-have',
      },
      {
        name: 'Dual 27" 1440p QHD Productivity Displays',
        description: 'Two separate monitors for dedicated Slack/browser on one and code on the other.',
        estimatedPrice: 500,
        priority: 'must-have',
      },
    ],
  },
  {
    stepNumber: 4,
    category: 'peripherals',
    title: 'Step 4: Input Devices (Keyboard & Mouse)',
    subtitle: 'Tactile feel and precision for continuous typing without wrist fatigue.',
    advice: 'Wireless multi-device pairing lets you switch between work laptop and home PC in 1 click.',
    searchExample: 'ergonomic mouse wireless mechanical keyboard hot swap mac windows',
    options: [
      {
        name: 'Logitech MX Master 3S + Mechanical Wireless Keyboard',
        description: 'The industry-standard productivity combo: MagSpeed wheel + tactile quiet typing.',
        estimatedPrice: 220,
        priority: 'must-have',
      },
      {
        name: 'Split Ergonomic Keyboard + Vertical Ergonomic Mouse',
        description: 'Natural forearm alignment preventing repetitive strain injury (RSI).',
        estimatedPrice: 180,
        priority: 'recommended',
      },
      {
        name: 'Minimalist Silent Wireless Keyboard & Mouse Set',
        description: 'Low profile, lightweight, rechargeable, and whisper-quiet operation.',
        estimatedPrice: 65,
        priority: 'must-have',
      },
    ],
  },
  {
    stepNumber: 5,
    category: 'lighting',
    title: 'Step 5: Eye Comfort & Desk Lighting',
    subtitle: 'Reduce eye fatigue from screen glare and illuminate your workspace evenly.',
    advice: 'Screenbar light bars hang on top of your monitor, taking up 0 square inches of desk surface.',
    searchExample: 'monitor light bar screenbar auto dimming asymmetrical light',
    options: [
      {
        name: 'Asymmetrical Monitor ScreenBar Light (Auto-Dimming)',
        description: 'Zero glare on the screen glass, warm to cool color temperature adjustment.',
        estimatedPrice: 85,
        priority: 'recommended',
      },
      {
        name: 'Smart Ambient Bias Backlight Strip (Warm White)',
        description: 'Even glow behind displays that minimizes eye strain during evening focus sessions.',
        estimatedPrice: 35,
        priority: 'optional',
      },
      {
        name: 'Architect Metal Clamp Desk Lamp',
        description: 'Flexible swing arm lighting with diffuse broad coverage across the work surface.',
        estimatedPrice: 40,
        priority: 'optional',
      },
    ],
  },
  {
    stepNumber: 6,
    category: 'accessories',
    title: 'Step 6: Cable Management & Ergonomic Mounts',
    subtitle: 'The secret to clean aesthetics: zero dangling wires and floating displays.',
    advice: 'A gas-spring monitor arm clears the bulky monitor stand, unlocking 30% more usable desk depth.',
    searchExample: 'under desk cable management raceway gas spring monitor mount',
    options: [
      {
        name: 'Gas-Spring Counterbalance Monitor Arm',
        description: 'Effortless tilt, swivel, and height adjustment, clearing clutter beneath the screen.',
        estimatedPrice: 55,
        priority: 'recommended',
      },
      {
        name: 'Under-Desk Steel Cable Tray + Power Strip Organizer Kit',
        description: 'Keeps surge protectors, chargers, and wires neatly hidden beneath the desktop.',
        estimatedPrice: 35,
        priority: 'must-have',
      },
      {
        name: 'Premium Wool Felt & Leather Desk Pad (90x40cm)',
        description: 'Covers the work area, dampens typing acoustics, and protects desk finish.',
        estimatedPrice: 28,
        priority: 'recommended',
      },
    ],
  },
];

export const SetupWizard: React.FC<SetupWizardProps> = ({ onFinishWizard, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selections, setSelections] = useState<Record<number, {
    name: string;
    category: Category;
    price: number;
    priority: ItemPriority;
    url?: string;
    notes?: string;
  } | null>>({});

  const currentStep = WIZARD_STEPS[currentStepIndex];
  const isLastStep = currentStepIndex === WIZARD_STEPS.length - 1;

  const handleSelectOption = (opt: typeof currentStep.options[0]) => {
    setSelections((prev) => ({
      ...prev,
      [currentStepIndex]: {
        name: opt.name,
        category: currentStep.category,
        price: opt.estimatedPrice,
        priority: opt.priority,
        notes: opt.description,
        url: '',
      },
    }));
  };

  const handleUpdateCurrentSelection = (updates: Partial<{ name: string; price: number; url: string; notes: string }>) => {
    setSelections((prev) => {
      const existing = prev[currentStepIndex] || {
        name: currentStep.options[0].name,
        category: currentStep.category,
        price: currentStep.options[0].estimatedPrice,
        priority: currentStep.options[0].priority,
        notes: currentStep.options[0].description,
        url: '',
      };
      return {
        ...prev,
        [currentStepIndex]: { ...existing, ...updates },
      };
    });
  };

  const handleNext = () => {
    if (isLastStep) {
      const itemsToAdd: Omit<SetupItem, 'id' | 'createdAt'>[] = Object.values(selections)
        .filter(Boolean)
        .map((sel) => ({
          name: sel!.name,
          category: sel!.category,
          price: sel!.price,
          quantity: 1,
          priority: sel!.priority,
          status: 'wishlist',
          url: sel!.url || '',
          notes: sel!.notes || undefined,
        }));

      onFinishWizard(itemsToAdd);
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  };

  const currentSelected = selections[currentStepIndex];
  const totalPlannedSoFar = Object.values(selections)
    .filter(Boolean)
    .reduce((sum, item) => sum + (item?.price || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl rounded-3xl bg-[#0f172a] border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Wizard Top Bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Interactive Setup Guide (Step 1 to Final)</h3>
              <p className="text-xs text-slate-400">Step-by-step guidance to assemble your ideal productive workspace</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[11px] text-slate-400">Guide Total Budget</span>
              <div className="text-sm font-bold font-mono text-emerald-400">
                ${totalPlannedSoFar.toLocaleString()}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Step Progress Indicators */}
        <div className="px-6 py-3 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between gap-1 overflow-x-auto">
          {WIZARD_STEPS.map((step, idx) => {
            const isCompleted = Boolean(selections[idx]);
            const isCurrent = idx === currentStepIndex;

            return (
              <button
                key={step.stepNumber}
                onClick={() => setCurrentStepIndex(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition shrink-0 ${
                  isCurrent
                    ? 'bg-indigo-600 text-white font-semibold'
                    : isCompleted
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <span>{step.stepNumber}. {step.category}</span>
                {isCompleted && !isCurrent && <Check className="w-3 h-3" />}
              </button>
            );
          })}
        </div>

        {/* Main Step Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
              <span>{currentStep.title}</span>
            </div>
            <p className="text-sm text-slate-300">{currentStep.subtitle}</p>
            
            <div className="mt-3 p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 flex items-start gap-2">
              <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span><b>Ergonomic Advice:</b> {currentStep.advice}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-2.5">
              <span>Choose an option or enter your custom item below:</span>
              <a
                href={createGoogleSearchUrl(currentStep.searchExample)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-indigo-300 hover:text-indigo-200 text-xs font-medium"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Google Search Recommendations</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentStep.options.map((opt, optIdx) => {
                const isChosen = currentSelected?.name === opt.name;

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(opt)}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                      isChosen
                        ? 'bg-indigo-600/15 border-indigo-500 shadow-lg shadow-indigo-600/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {opt.priority}
                        </span>
                        {isChosen && (
                          <span className="p-0.5 rounded-full bg-indigo-600 text-white">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-white mb-1.5">{opt.name}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{opt.description}</p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-baseline justify-between">
                      <span className="text-[10px] text-slate-500">Est. Price:</span>
                      <span className="text-sm font-mono font-bold text-white">${opt.estimatedPrice}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {currentSelected && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Selected Item (Customize name, price, or paste URL):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] text-slate-400 mb-1">Item / Product Name</label>
                  <input
                    type="text"
                    value={currentSelected.name}
                    onChange={(e) => handleUpdateCurrentSelection({ name: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={currentSelected.price}
                    onChange={(e) => handleUpdateCurrentSelection({ price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[10px] text-slate-400 mb-1">Product Link / URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://amazon.com/... or store link"
                    value={currentSelected.url || ''}
                    onChange={(e) => handleUpdateCurrentSelection({ url: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Navigation */}
        <div className="px-6 py-4 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStepIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition ${
              currentStepIndex === 0
                ? 'opacity-30 cursor-not-allowed text-slate-500'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelections((prev) => ({ ...prev, [currentStepIndex]: null }));
                if (isLastStep) {
                  handleNext();
                } else {
                  setCurrentStepIndex((prev) => prev + 1);
                }
              }}
              className="px-3 py-2 text-xs text-slate-400 hover:text-slate-200"
            >
              Skip Step
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition active:scale-95"
            >
              <span>{isLastStep ? 'Finish & Add to Checklist' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
