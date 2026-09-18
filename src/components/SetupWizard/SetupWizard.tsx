'use client';

import React, { useState } from 'react';
import { Category, ItemPriority, SetupItem } from '@/types/setup';
import { createGoogleSearchUrl, formatINR } from '@/lib/searchUtils';
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
    subtitle: 'The cornerstone of your workspace. Consider height adjustability and tabletop size in Indian homes.',
    advice: 'Dual-motor desks (like Jin Office or FlowDesk) handle heavier dual monitor arms and stay steady.',
    searchExample: 'electric standing desk dual motor 5x2.5 ft buy online india',
    options: [
      {
        name: 'Electric Standing Desk (Dual Motor, 5x2.5 ft / 60x30")',
        description: 'Sit-to-stand motorized adjustment with digital memory presets and solid engineered wood top.',
        estimatedPrice: 0,
        priority: 'must-have',
      },
      {
        name: 'Compact Motorized Standing Desk (4x2 ft)',
        description: 'Ideal for compact Indian bedrooms and home offices without sacrificing ergonomics.',
        estimatedPrice: 0,
        priority: 'must-have',
      },
      {
        name: 'Fixed Sturdy Solid Wood / Sheesham Desk (5x2.5 ft)',
        description: 'Heavy solid wooden surface, zero motor electronics, clean minimal look with steel legs.',
        estimatedPrice: 0,
        priority: 'must-have',
      },
    ],
  },
  {
    stepNumber: 2,
    category: 'chair',
    title: 'Step 2: Ergonomic Seating',
    subtitle: 'Protect your back, posture, and focus during long Indian summer days and coding marathons.',
    advice: 'Full breathable mesh is essential for Indian climate to keep you cool and sweat-free.',
    searchExample: 'featherlite helix or green soul monster ergonomic chair india',
    options: [
      {
        name: 'Ergonomic Breathable Mesh Chair (Green Soul / Featherlite Helix)',
        description: 'Full-mesh back and seat with self-adjusting lumbar support and 3D armrests.',
        estimatedPrice: 0,
        priority: 'must-have',
      },
      {
        name: 'High-Value Ergonomic Office Chair (Savya Home / Green Soul Seoul)',
        description: 'Dependable lower back cushion, tilt recline, and adjustable headrest under ₹9,000.',
        estimatedPrice: 0,
        priority: 'must-have',
      },
      {
        name: 'Premium Workstation Chair (Steelcase Gesture / Herman Miller Aeron)',
        description: 'Gold-standard posture engineering with multi-year warranty for 10+ hour workdays.',
        estimatedPrice: 0,
        priority: 'recommended',
      },
    ],
  },
  {
    stepNumber: 3,
    category: 'monitor',
    title: 'Step 3: Display & Screen Canvas',
    subtitle: 'Determine your visual real estate: single ultrawide vs dual sharp productivity monitors.',
    advice: 'Monitors with 65W–90W USB-C Power Delivery charge your MacBook or ThinkPad via one single cable.',
    searchExample: 'ultrawide 34 inch curved usb c monitor price in india',
    options: [
      {
        name: '34" Ultrawide Curved Monitor (LG / Dell / Acer QHD)',
        description: 'Side-by-side code editor and browser with built-in laptop charging and smooth refresh rate.',
        estimatedPrice: 0,
        priority: 'must-have',
      },
      {
        name: '27" 4K UHD Color-Calibrated Display (ASUS ProArt / BenQ IPS)',
        description: 'Razor sharp text rendering for reading docs, UI design, and photo/video editing.',
        estimatedPrice: 0,
        priority: 'must-have',
      },
      {
        name: '27" 1440p QHD Productivity Display (LG / Acer IPS 100Hz+)',
        description: 'The sweet spot in India for high resolution without scaling issues or high cost.',
        estimatedPrice: 0,
        priority: 'must-have',
      },
    ],
  },
  {
    stepNumber: 4,
    category: 'peripherals',
    title: 'Step 4: Input Devices (Keyboard & Mouse)',
    subtitle: 'Tactile feel and wrist precision for continuous daily productivity.',
    advice: 'Wireless multi-device pairing lets you switch between work laptop and personal PC in 1 click.',
    searchExample: 'logitech mx master 3s or keychron wireless mechanical keyboard india',
    options: [
      {
        name: 'Logitech MX Master 3S + Keychron Wireless Mechanical Keyboard',
        description: 'The industry-standard productivity combo: MagSpeed wheel + tactile quiet typing.',
        estimatedPrice: 0,
        priority: 'must-have',
      },
      {
        name: 'Logitech MK295 Silent Wireless Keyboard & Mouse Set',
        description: 'Reliable, spill-resistant, 2-year battery life, and whisper-quiet operation.',
        estimatedPrice: 0,
        priority: 'must-have',
      },
      {
        name: 'RK Royal Kludge RK84 Wireless Hot-Swap Mechanical Keyboard',
        description: 'Compact 75% layout, hot-swappable switches, Bluetooth + 2.4GHz + Type-C wired.',
        estimatedPrice: 0,
        priority: 'recommended',
      },
    ],
  },
  {
    stepNumber: 5,
    category: 'lighting',
    title: 'Step 5: Eye Comfort & Desk Lighting',
    subtitle: 'Reduce eye strain from screen glare and illuminate your workspace evenly.',
    advice: 'A monitor screenbar light hangs on top of your display, taking 0 square inches of desk surface.',
    searchExample: 'baseus screenbar monitor light bar price in india',
    options: [
      {
        name: 'Asymmetrical Monitor ScreenBar Light (Baseus / BenQ)',
        description: 'Zero glare on the screen glass, warm to cool color temperature adjustment.',
        estimatedPrice: 0,
        priority: 'recommended',
      },
      {
        name: 'Smart Ambient Bias Backlight Strip (Wipro / Philips Hue)',
        description: 'Even glow behind displays that minimizes eye fatigue during late-night focus sessions.',
        estimatedPrice: 0,
        priority: 'optional',
      },
      {
        name: 'Architect Metal Clamp Desk Lamp with Warm LED',
        description: 'Flexible swing arm lighting with diffuse broad coverage across your desk surface.',
        estimatedPrice: 0,
        priority: 'optional',
      },
    ],
  },
  {
    stepNumber: 6,
    category: 'accessories',
    title: 'Step 6: Cable Management & Ergonomic Mounts',
    subtitle: 'The secret to clean Indian desk setups: zero dangling wires and floating monitors.',
    advice: 'A gas-spring monitor arm clears the bulky monitor stand, unlocking 30% more usable desk depth.',
    searchExample: 'gas spring monitor arm under desk cable tray organizer india',
    options: [
      {
        name: 'Gas-Spring Counterbalance Single Monitor Arm (AmazonBasics / Rife)',
        description: 'Effortless tilt, swivel, and height adjustment, clearing clutter beneath the screen.',
        estimatedPrice: 0,
        priority: 'recommended',
      },
      {
        name: 'Under-Desk Steel Cable Tray + Spike Guard Wire Sleeve Kit',
        description: 'Keeps surge protectors, laptop bricks, and wire spaghetti neatly hidden under the table.',
        estimatedPrice: 0,
        priority: 'must-have',
      },
      {
        name: 'Large Felt & Vegan Leather Desk Pad (90x40cm)',
        description: 'Covers the work area, dampens typing acoustics, and protects desk finish.',
        estimatedPrice: 0,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Wizard Top Bar */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-zinc-800 text-zinc-200 border border-zinc-700">
              <Sparkles className="w-4 h-4 text-zinc-200" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-100">Step-by-Step Setup Guide (India)</h3>
              <p className="text-xs text-zinc-400">Step 1 to final: build your custom workspace in INR (₹)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
                {totalPlannedSoFar > 0 ? 'Planned Total' : 'Pricing Mode'}
              </span>
              <div className="text-sm font-bold font-mono text-zinc-100">
                {totalPlannedSoFar > 0 ? formatINR(totalPlannedSoFar) : 'Custom INR (₹)'}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="px-6 py-3 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between gap-1 overflow-x-auto">
          {WIZARD_STEPS.map((step, idx) => {
            const isCompleted = Boolean(selections[idx]);
            const isCurrent = idx === currentStepIndex;

            return (
              <button
                key={step.stepNumber}
                onClick={() => setCurrentStepIndex(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition shrink-0 ${
                  isCurrent
                    ? 'bg-zinc-100 text-zinc-950 font-semibold'
                    : isCompleted
                    ? 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span>{step.stepNumber}. {step.category}</span>
                {isCompleted && !isCurrent && <Check className="w-3 h-3 text-zinc-400" />}
              </button>
            );
          })}
        </div>

        {/* Main Step Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-zinc-900">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              <span>{currentStep.title}</span>
            </div>
            <p className="text-sm text-zinc-200">{currentStep.subtitle}</p>
            
            <div className="mt-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2">
              <Info className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
              <span><b>Advice:</b> {currentStep.advice}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-medium text-zinc-400 mb-2.5">
              <span>Select an option or enter your custom item below:</span>
              <a
                href={createGoogleSearchUrl(currentStep.searchExample)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-zinc-300 hover:text-white text-xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Indian Deals</span>
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
                        ? 'bg-zinc-950 border-zinc-400 shadow-md shadow-white/5'
                        : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-950'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                          {opt.priority}
                        </span>
                        {isChosen && (
                          <span className="p-0.5 rounded-full bg-zinc-100 text-zinc-950">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-zinc-100 mb-1.5">{opt.name}</h4>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">{opt.description}</p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-zinc-800 flex items-baseline justify-between">
                      <span className="text-[10px] text-zinc-500">Live Price:</span>
                      <span className="text-xs text-zinc-400">Custom input below</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {currentSelected && (
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-zinc-200" />
                Customize Selected Item:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] text-zinc-400 mb-1">Item / Product Name</label>
                  <input
                    type="text"
                    value={currentSelected.name}
                    onChange={(e) => handleUpdateCurrentSelection({ name: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-zinc-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-400 mb-1">Price (₹ INR)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter price (₹)"
                    value={currentSelected.price > 0 ? currentSelected.price : ''}
                    onChange={(e) => handleUpdateCurrentSelection({ price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 font-mono focus:outline-none focus:border-zinc-500"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[10px] text-zinc-400 mb-1">Product Link / URL (Amazon.in / Store link)</label>
                  <input
                    type="url"
                    placeholder="https://amazon.in/... or store link"
                    value={currentSelected.url || ''}
                    onChange={(e) => handleUpdateCurrentSelection({ url: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Navigation */}
        <div className="px-6 py-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStepIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition ${
              currentStepIndex === 0
                ? 'opacity-30 cursor-not-allowed text-zinc-500'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
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
              className="px-3 py-2 text-xs text-zinc-400 hover:text-zinc-200"
            >
              Skip
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold shadow-md transition active:scale-95"
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
