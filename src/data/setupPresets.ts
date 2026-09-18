import { SetupPreset } from '@/types/setup';

export const SETUP_PRESETS: SetupPreset[] = [
  {
    id: 'setup-minimalist-coder',
    title: 'Minimalist Clean Developer Desk',
    description: 'Designed for deep focus and zero distraction with motorized height adjustment, an eye-care monitor lightbar, and ergonomic chair.',
    categoryTag: 'Focus & Productivity',
    accentColor: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
    items: [
      {
        name: 'Standing Desk (e.g. Uplift V2 or Fully Jarvis 60x30")',
        category: 'desk',
        estimatedPrice: 650,
        priority: 'must-have',
        notes: 'Dual motor, solid bamboo or walnut laminate top',
        searchQuery: 'best standing desk dual motor 60x30 wire management'
      },
      {
        name: 'Ergonomic Mesh Chair (e.g. Herman Miller Aeron or ErgoChair Pro)',
        category: 'chair',
        estimatedPrice: 450,
        priority: 'must-have',
        notes: 'Lumbar support, breathable mesh, adjustable 4D armrests',
        searchQuery: 'ergonomic mesh chair lumbar support home office'
      },
      {
        name: '34" Ultrawide USB-C Display (e.g. Dell UltraSharp U3423WE)',
        category: 'monitor',
        estimatedPrice: 799,
        priority: 'must-have',
        notes: 'Built-in KVM switch, 90W USB-C power delivery, curved IPS',
        searchQuery: '34 inch ultrawide usb c 90w power delivery kvm ips monitor'
      },
      {
        name: 'Single Monitor Heavy-Duty Gas Spring Arm',
        category: 'accessories',
        estimatedPrice: 65,
        priority: 'recommended',
        notes: 'Clears desk space, enables effortless height and angle adjustments',
        searchQuery: 'heavy duty monitor arm desk mount ultrawide'
      },
      {
        name: 'ScreenBar Monitor Light (e.g. BenQ ScreenBar Halo or Baseus)',
        category: 'lighting',
        estimatedPrice: 95,
        priority: 'recommended',
        notes: 'Zero screen glare, auto-dimming sensor, wireless dial',
        searchQuery: 'benq screenbar halo monitor light bar auto dimming'
      },
      {
        name: 'Mechanical Keyboard (e.g. Keychron Q1 Pro or NuPhy Air75)',
        category: 'peripherals',
        estimatedPrice: 140,
        priority: 'must-have',
        notes: 'Wireless Bluetooth + 2.4G, Mac/Windows switch, hot-swappable switches',
        searchQuery: 'wireless mechanical keyboard hot swappable mac windows keychron nuphy'
      },
      {
        name: 'Ergonomic Productivity Mouse (Logitech MX Master 3S)',
        category: 'peripherals',
        estimatedPrice: 99,
        priority: 'must-have',
        notes: 'Quiet clicks, MagSpeed scroll wheel, multi-device flow',
        searchQuery: 'logitech mx master 3s wireless mouse'
      },
      {
        name: 'Under-desk Cable Management Tray + Cable Sleeve Kit',
        category: 'accessories',
        estimatedPrice: 35,
        priority: 'recommended',
        notes: 'Keeps power strips and adapters off the ground for clean floating look',
        searchQuery: 'under desk cable management tray wire organizer'
      }
    ]
  },
  {
    id: 'setup-creative-studio',
    title: 'Creative Designer & Video Editing Studio',
    description: 'Calibrated color-accurate dual displays, studio active monitors, audio interface, and warm ambient desk lighting.',
    categoryTag: 'Design & Media',
    accentColor: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30',
    items: [
      {
        name: 'Solid Hardwood Desktop with Heavy Duty Sit-Stand Frame',
        category: 'desk',
        estimatedPrice: 750,
        priority: 'must-have',
        notes: 'Real Walnut or Oak top 72x30" for dual monitors and audio speakers',
        searchQuery: 'solid wood standing desk walnut 72 inch'
      },
      {
        name: '27" 4K Color-Accurate Monitor (e.g. ASUS ProArt PA279CV)',
        category: 'monitor',
        estimatedPrice: 429,
        priority: 'must-have',
        notes: '100% sRGB, Calman verified, factory pre-calibrated Delta E < 2',
        searchQuery: 'asus proart 27 inch 4k monitor color calibrated'
      },
      {
        name: 'Studio Active Monitors (e.g. Yamaha HS5 or PreSonus Eris 4.5)',
        category: 'audio',
        estimatedPrice: 220,
        priority: 'must-have',
        notes: 'Flat frequency response for accurate audio monitoring',
        searchQuery: 'studio monitor speakers desktop flat frequency'
      },
      {
        name: 'USB-C Audio Interface (e.g. Focusrite Scarlett 2i2 4th Gen)',
        category: 'audio',
        estimatedPrice: 179,
        priority: 'must-have',
        notes: 'Crystal clear XLR mic preamp and dedicated headphone amp',
        searchQuery: 'focusrite scarlett 2i2 4th gen usb audio interface'
      },
      {
        name: 'Broadcast Dynamic Microphone + Boom Arm (e.g. Shure MV7+)',
        category: 'audio',
        estimatedPrice: 289,
        priority: 'recommended',
        notes: 'Voice isolation, XLR/USB hybrid connectivity',
        searchQuery: 'shure mv7 broadcast microphone boom arm kit'
      },
      {
        name: 'Desk Shelf / Monitor Riser with Wool Felt Pad',
        category: 'accessories',
        estimatedPrice: 110,
        priority: 'recommended',
        notes: 'Adds dual-tier desk storage for notebook, audio interface, and docks',
        searchQuery: 'wooden desk shelf monitor riser groovemade style'
      },
      {
        name: 'Smart Ambient Backlight Strip (Warm White 2700K-6500K)',
        category: 'lighting',
        estimatedPrice: 45,
        priority: 'optional',
        notes: 'Diffused bias lighting behind desk and monitors to reduce eye fatigue',
        searchQuery: 'smart led bias lighting strip warm white tunable'
      }
    ]
  },
  {
    id: 'setup-ergonomic-budget',
    title: 'High-Value Ergonomic Home Office',
    description: 'Every dollar maximized: top ergonomic comfort, reliable 100Hz+ display, and clean organization under $900 total.',
    categoryTag: 'Best Value / Budget',
    accentColor: 'from-amber-500/20 to-orange-500/10 border-amber-500/30',
    items: [
      {
        name: 'Dual Motor Height Adjustable Desk (48x24" or 55x28")',
        category: 'desk',
        estimatedPrice: 249,
        priority: 'must-have',
        notes: 'Preset memory keypad, anti-collision sensor',
        searchQuery: 'electric standing desk dual motor memory preset budget'
      },
      {
        name: 'Ergonomic Office Chair with Dynamic Lumbar (SIHOO Doro C300/M57)',
        category: 'chair',
        estimatedPrice: 199,
        priority: 'must-have',
        notes: 'Full breathable mesh, adaptive lumbar support, 3D armrests',
        searchQuery: 'sihoo ergonomic office chair full mesh dynamic lumbar'
      },
      {
        name: '27" 1440p QHD IPS Monitor (100Hz - 144Hz)',
        category: 'monitor',
        estimatedPrice: 189,
        priority: 'must-have',
        notes: 'Sharp resolution for spreadsheet and code clarity without eye strain',
        searchQuery: '27 inch 1440p qhd ips monitor 100hz 144hz'
      },
      {
        name: 'Full Desk Felt & Leather Desk Pad (90x40cm)',
        category: 'accessories',
        estimatedPrice: 25,
        priority: 'recommended',
        notes: 'Covers entire desk surface, dampens keyboard typing sound',
        searchQuery: 'large felt desk pad mat 90x40'
      },
      {
        name: 'USB-C 7-in-1 Multiport Docking Hub',
        category: 'accessories',
        estimatedPrice: 35,
        priority: 'must-have',
        notes: 'HDMI 4K, 100W PD passthrough, USB 3.0 ports',
        searchQuery: 'usb c hub multiport adapter 100w pd hdmi 4k'
      },
      {
        name: 'Quiet Wireless Keyboard and Mouse Combo',
        category: 'peripherals',
        estimatedPrice: 45,
        priority: 'must-have',
        notes: 'Reliable low-profile keys with silent tactile clicks',
        searchQuery: 'wireless silent keyboard mouse combo'
      }
    ]
  }
];
