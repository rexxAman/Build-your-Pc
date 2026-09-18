import { PCPartType, PCComponent, PCPreset } from '@/types/setup';

export const COMPONENT_CATALOG: Record<PCPartType, PCComponent[]> = {
  cpu: [
    // AMD Ryzen Options
    {
      id: 'cpu-amd-7600',
      type: 'cpu',
      name: 'AMD Ryzen 5 7600 (AM5)',
      brand: 'AMD',
      price: 0,
      wattage: 65,
      specs: '6 Cores / 12 Threads, up to 5.1 GHz, 38MB Cache, AM5 platform',
      recommendedFor: 'Best value 1440p gaming & solid developer multitasking in India',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80',
    },
    {
      id: 'cpu-amd-7700x',
      type: 'cpu',
      name: 'AMD Ryzen 7 7700X (AM5)',
      brand: 'AMD',
      price: 0,
      wattage: 105,
      specs: '8 Cores / 16 Threads, up to 5.4 GHz, 40MB Cache',
      recommendedFor: 'Smooth video export, game dev in Unreal Engine & high FPS gaming',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80',
    },
    {
      id: 'cpu-amd-7800x3d',
      type: 'cpu',
      name: 'AMD Ryzen 7 7800X3D (3D V-Cache)',
      brand: 'AMD',
      price: 0,
      wattage: 120,
      specs: '8 Cores / 16 Threads, 104MB Cache with 3D V-Cache, top thermal efficiency',
      recommendedFor: 'The undisputed #1 gaming CPU in the world, ideal for Gamer + Dev rigs',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80',
    },
    {
      id: 'cpu-amd-7900x',
      type: 'cpu',
      name: 'AMD Ryzen 9 7900X (AM5)',
      brand: 'AMD',
      price: 0,
      wattage: 170,
      specs: '12 Cores / 24 Threads, up to 5.6 GHz, 76MB Cache',
      recommendedFor: 'Heavy Docker virtualization, large code compilation & 4K rendering',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80',
    },
    {
      id: 'cpu-amd-7950x',
      type: 'cpu',
      name: 'AMD Ryzen 9 7950X / 7950X3D',
      brand: 'AMD',
      price: 0,
      wattage: 170,
      specs: '16 Cores / 32 Threads, up to 5.7 GHz, 144MB Cache',
      recommendedFor: 'Flagship powerhouse for 3D animation, LLM training & high-FPS streaming',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80',
    },

    // Intel Options
    {
      id: 'cpu-intel-13500',
      type: 'cpu',
      name: 'Intel Core i5-13500 (LGA1700)',
      brand: 'Intel',
      price: 0,
      wattage: 125,
      specs: '14 Cores (6P + 8E) / 20 Threads, Intel UHD 770 Graphics',
      recommendedFor: 'High multi-thread value for Adobe Creative Cloud & developer stacks',
      image: 'https://images.unsplash.com/photo-1555617766-c94804975da3?w=300&q=80',
    },
    {
      id: 'cpu-intel-14600k',
      type: 'cpu',
      name: 'Intel Core i5-14600K Unlocked',
      brand: 'Intel',
      price: 0,
      wattage: 181,
      specs: '14 Cores (6P + 8E) / 20 Threads, up to 5.3 GHz',
      recommendedFor: 'Competitive esports high-refresh gaming + quick Premiere Pro rendering',
      image: 'https://images.unsplash.com/photo-1555617766-c94804975da3?w=300&q=80',
    },
    {
      id: 'cpu-intel-14700k',
      type: 'cpu',
      name: 'Intel Core i7-14700K Unlocked',
      brand: 'Intel',
      price: 0,
      wattage: 253,
      specs: '20 Cores (8P + 12E) / 28 Threads, up to 5.6 GHz, 33MB Smart Cache',
      recommendedFor: 'Designer + Gamer balance, Blender 3D cycles, CAD & 4K timelines',
      image: 'https://images.unsplash.com/photo-1555617766-c94804975da3?w=300&q=80',
    },
    {
      id: 'cpu-intel-14900k',
      type: 'cpu',
      name: 'Intel Core i9-14900K Flagship',
      brand: 'Intel',
      price: 0,
      wattage: 253,
      specs: '24 Cores (8P + 16E) / 32 Threads, up to 6.0 GHz Thermal Velocity Boost',
      recommendedFor: 'Extreme creator workstation, massive Unreal compiles & heavy multi-tasking',
      image: 'https://images.unsplash.com/photo-1555617766-c94804975da3?w=300&q=80',
    }
  ],

  gpu: [
    {
      id: 'gpu-igpu',
      type: 'gpu',
      name: 'Integrated Graphics (APU / iGPU - DP & HDMI)',
      brand: 'AMD / Intel',
      price: 0,
      wattage: 15,
      specs: 'Uses CPU display controller, dual 4K monitor support',
      recommendedFor: 'Pure coding, web browsing & zero-noise workstation without gaming card',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&q=80',
    },
    {
      id: 'gpu-rtx-4060',
      type: 'gpu',
      name: 'NVIDIA GeForce RTX 4060 8GB GDDR6',
      brand: 'NVIDIA',
      price: 0,
      wattage: 115,
      specs: '8GB GDDR6, DLSS 3 Frame Gen, AV1 Encoder, 3072 CUDA Cores',
      recommendedFor: '1080p Ultra / 1440p DLSS gaming, UI/UX prototyping & video playback',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&q=80',
    },
    {
      id: 'gpu-rtx-4060ti-16',
      type: 'gpu',
      name: 'NVIDIA GeForce RTX 4060 Ti 16GB VRAM Edition',
      brand: 'NVIDIA',
      price: 0,
      wattage: 165,
      specs: '16GB GDDR6 high VRAM buffer, DLSS 3, CUDA compute',
      recommendedFor: 'Best value for local AI LLMs (7B/13B models) & video editing needing extra VRAM',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&q=80',
    },
    {
      id: 'gpu-rx-7800xt',
      type: 'gpu',
      name: 'AMD Radeon RX 7800 XT 16GB GDDR6',
      brand: 'AMD',
      price: 0,
      wattage: 263,
      specs: '16GB GDDR6, 256-bit bus, AMD FSR 3, high native rasterization',
      recommendedFor: 'High VRAM value for 1440p maxed gaming & open-source Linux developer setups',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&q=80',
    },
    {
      id: 'gpu-rtx-4070-super',
      type: 'gpu',
      name: 'NVIDIA GeForce RTX 4070 Super 12GB GDDR6X',
      brand: 'NVIDIA',
      price: 0,
      wattage: 220,
      specs: '12GB GDDR6X, 7168 CUDA Cores, 28% faster than vanilla 4070',
      recommendedFor: 'The sweet spot in India for 1440p high-FPS gaming, 4K rendering & AI development',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&q=80',
    },
    {
      id: 'gpu-rtx-4070ti-super',
      type: 'gpu',
      name: 'NVIDIA GeForce RTX 4070 Ti Super 16GB GDDR6X',
      brand: 'NVIDIA',
      price: 0,
      wattage: 285,
      specs: '16GB GDDR6X, 256-bit memory bus, 8448 CUDA Cores, Dual AV1 Encoders',
      recommendedFor: 'Designer + Gamer heavy 4K workflows, Blender 3D render & intense gaming',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&q=80',
    },
    {
      id: 'gpu-rtx-4080-super',
      type: 'gpu',
      name: 'NVIDIA GeForce RTX 4080 Super 16GB GDDR6X',
      brand: 'NVIDIA',
      price: 0,
      wattage: 320,
      specs: '16GB GDDR6X ultra-fast memory, 10240 CUDA Cores, Ada Lovelace architecture',
      recommendedFor: 'Maxed 4K 144Hz AAA gaming, serious LLM fine-tuning & cinema-grade rendering',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&q=80',
    },
    {
      id: 'gpu-rtx-4090',
      type: 'gpu',
      name: 'NVIDIA GeForce RTX 4090 24GB GDDR6X',
      brand: 'NVIDIA',
      price: 0,
      wattage: 450,
      specs: '24GB GDDR6X, 16384 CUDA Cores, 384-bit bus, unmatched computing peak',
      recommendedFor: 'Ultimate titan for AI research, real-time 8K editing, and enthusiast gaming without compromise',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&q=80',
    }
  ],

  motherboard: [
    {
      id: 'mb-msi-b650m-a',
      type: 'motherboard',
      name: 'MSI PRO B650M-A WiFi (AMD AM5, DDR5)',
      brand: 'MSI',
      price: 0,
      wattage: 45,
      specs: 'Micro-ATX, WiFi 6E, 2.5G LAN, Dual M.2 PCIe 4.0, strong VRMs',
      recommendedFor: 'Best value AM5 motherboard for Ryzen 7600/7700X',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80',
    },
    {
      id: 'mb-asus-b760-plus',
      type: 'motherboard',
      name: 'ASUS TUF Gaming B760-PLUS WiFi (Intel DDR5)',
      brand: 'ASUS',
      price: 0,
      wattage: 50,
      specs: 'ATX, LGA1700, DDR5, 3x M.2 slots, PCIe 5.0 slot, WiFi 6',
      recommendedFor: 'Military-grade durability for Intel Core i5/i7 workstations',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80',
    },
    {
      id: 'mb-gigabyte-b650-aorus-elite',
      type: 'motherboard',
      name: 'Gigabyte B650 AORUS ELITE AX V2 (AMD AM5)',
      brand: 'Gigabyte',
      price: 0,
      wattage: 50,
      specs: 'Full ATX, PCIe 5.0 M.2 slot, 12+2+2 power stages, WiFi 6E, thermal guards',
      recommendedFor: 'Enthusiast AM5 board with high expandability and sound shielding',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80',
    },
    {
      id: 'mb-msi-z790-tomahawk',
      type: 'motherboard',
      name: 'MSI MAG Z790 TOMAHAWK MAX WiFi (Intel)',
      brand: 'MSI',
      price: 0,
      wattage: 55,
      specs: 'Z790 chipset, 16+1+1 phases, PCIe 5.0, 4x M.2 slots, WiFi 7 ready',
      recommendedFor: 'Top-tier overclocking and stability for i7-14700K & i9-14900K',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80',
    },
    {
      id: 'mb-asus-x670e-pro',
      type: 'motherboard',
      name: 'ASUS ROG STRIX X670E-F GAMING WiFi (AMD Flagship)',
      brand: 'ASUS ROG',
      price: 0,
      wattage: 60,
      specs: 'PCIe 5.0 x16 GPU & M.2, 16+2 teamed power stages, USB4 40Gbps, SupremeFX audio',
      recommendedFor: 'Flagship workstation for Ryzen 7950X / 7800X3D and dual GPU expansion',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80',
    }
  ],

  ram: [
    // --- DDR3 (Budget / Secondary / Clearance) ---
    {
      id: 'ram-ddr3-4gb',
      type: 'ram',
      name: 'Simmtronics / Consistent 4GB DDR3 1600MHz',
      brand: 'Consistent / Simmtronics',
      price: 0,
      wattage: 5,
      specs: 'DDR3 1600MHz, Non-ECC Desktop / Laptop module',
      recommendedFor: 'Ultra-budget / older system maintenance & basic home PC',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80',
    },
    {
      id: 'ram-ddr3-8gb',
      type: 'ram',
      name: 'Crucial / Hynix 8GB DDR3 1600MHz',
      brand: 'Crucial',
      price: 0,
      wattage: 6,
      specs: 'DDR3 1600MHz 8GB single stick, 1.5V / 1.35V low voltage',
      recommendedFor: 'Legacy system upgrade & office workstation',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80',
    },

    // --- DDR4 (Value Standard for Budget & Mid-Range) ---
    {
      id: 'ram-ddr4-8gb',
      type: 'ram',
      name: 'Crucial / G.Skill Ripjaws V 8GB DDR4 3200MHz CL16',
      brand: 'Crucial / G.Skill',
      price: 0,
      wattage: 8,
      specs: 'DDR4 3200MHz, Low Latency CL16, aluminum heatspreader',
      recommendedFor: 'Budget-to-midrange builds & single-channel entry gaming',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80',
    },
    {
      id: 'ram-ddr4-16gb',
      type: 'ram',
      name: 'Corsair Vengeance LPX 16GB (1x16GB / 2x8GB) DDR4 3200MHz',
      brand: 'Corsair',
      price: 0,
      wattage: 10,
      specs: 'DDR4 3200MHz, pure aluminum heatspreader for faster heat dissipation',
      recommendedFor: 'Reliable dual-channel memory for everyday programming & 1080p gaming',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80',
    },
    {
      id: 'ram-ddr4-32gb',
      type: 'ram',
      name: 'G.Skill Ripjaws V 32GB (2x16GB) DDR4 3600MHz CL18',
      brand: 'G.Skill',
      price: 0,
      wattage: 14,
      specs: 'Dual-channel 32GB DDR4 3600MHz, classic high-compatibility profile',
      recommendedFor: 'Maximum capacity for AM4 / LGA1200 / LGA1700 DDR4 platforms',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80',
    },

    // --- DDR5 (Modern High-Speed Standard & Enthusiast) ---
    {
      id: 'ram-ddr5-8gb',
      type: 'ram',
      name: 'Crucial 8GB DDR5 4800MHz / 5200MHz',
      brand: 'Crucial',
      price: 0,
      wattage: 10,
      specs: 'Entry DDR5 single module, on-die ECC, PMIC power efficiency',
      recommendedFor: 'Entry-level modern AM5 / Intel 13th & 14th Gen workstations',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80',
    },
    {
      id: 'ram-ddr5-16gb',
      type: 'ram',
      name: 'Kingston FURY Beast 16GB (1x16GB) DDR5 5600MHz',
      brand: 'Kingston',
      price: 0,
      wattage: 12,
      specs: 'DDR5 5600MHz, Intel XMP 3.0 & AMD EXPO ready, low-profile heatspreader',
      recommendedFor: 'Solid single-stick starter for DDR5 motherboards',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80',
    },
    {
      id: 'ram-corsair-32gb-6000',
      type: 'ram',
      name: 'Corsair Vengeance 32GB (2x16GB) DDR5 6000MHz CL30',
      brand: 'Corsair',
      price: 0,
      wattage: 15,
      specs: 'DDR5 6000MHz, Low Latency CL30-36-36, optimal AMD EXPO & Intel XMP',
      recommendedFor: 'The sweet spot in India for gaming, software dev, and fast compiling',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80',
    },
    {
      id: 'ram-gskill-ripjaws-64gb',
      type: 'ram',
      name: 'G.Skill Ripjaws S5 / Flare X5 64GB (2x32GB) DDR5 6000MHz CL32',
      brand: 'G.Skill',
      price: 0,
      wattage: 20,
      specs: '64GB Dual Kit, DDR5 6000MHz, high density for Docker & VM labs',
      recommendedFor: 'Designers editing 4K/6K footage, Docker microservices & VM labs',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80',
    },
    {
      id: 'ram-gskill-trident-z5-rgb-64gb',
      type: 'ram',
      name: 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5 6400MHz CL32',
      brand: 'G.Skill',
      price: 0,
      wattage: 22,
      specs: 'Ultra-fast 6400MHz, sleek aluminum heatspreader with diffused RGB',
      recommendedFor: 'High-frequency gamer + creator aesthetic rigs',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80',
    },
    {
      id: 'ram-corsair-dominator-96gb',
      type: 'ram',
      name: 'Corsair Dominator Titanium 96GB (2x48GB) DDR5 6000MHz',
      brand: 'Corsair',
      price: 0,
      wattage: 28,
      specs: 'Non-binary 96GB capacity, forged aluminum, DHX patented cooling',
      recommendedFor: 'Extreme 3D animation, large language model inference & heavy VFX',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80',
    },
    {
      id: 'ram-corsair-dominator-128gb',
      type: 'ram',
      name: 'Corsair Dominator Titanium 128GB (4x32GB) DDR5 6000MHz',
      brand: 'Corsair',
      price: 0,
      wattage: 35,
      specs: 'Quad-channel 128GB DDR5 6000MHz, top-tier binned ICs, titanium heatspreaders',
      recommendedFor: 'Heavy enterprise AI training, virtual studios & massive CAD simulation',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&q=80',
    }
  ],

  storage: [
    {
      id: 'ssd-wd-sn580-1tb',
      type: 'storage',
      name: 'WD Blue SN580 1TB NVMe PCIe Gen4 SSD',
      brand: 'Western Digital',
      price: 0,
      wattage: 6,
      specs: 'Up to 4150 MB/s read, nCache 4.0 technology, 5-year warranty',
      recommendedFor: 'Best value Gen4 boot and project drive in India',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&q=80',
    },
    {
      id: 'ssd-crucial-t500-1tb',
      type: 'storage',
      name: 'Crucial T500 1TB NVMe Gen4 (with DRAM Cache)',
      brand: 'Crucial',
      price: 0,
      wattage: 8,
      specs: 'Up to 7300 MB/s, dedicated LPDDR4 cache, TLC NAND',
      recommendedFor: 'High compile speed, fast database indexing & zero-stutter gaming',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&q=80',
    },
    {
      id: 'ssd-samsung-990-pro-2tb',
      type: 'storage',
      name: 'Samsung 990 PRO 2TB NVMe PCIe 4.0 SSD (with Heatsink)',
      brand: 'Samsung',
      price: 0,
      wattage: 9,
      specs: 'Up to 7450 MB/s read, 2GB LPDDR4 DRAM, nickel-coated thermal controller',
      recommendedFor: 'The benchmark of speed for heavy 4K footage editing & heavy game libraries',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&q=80',
    },
    {
      id: 'ssd-wd-black-sn850x-4tb',
      type: 'storage',
      name: 'WD_BLACK SN850X 4TB NVMe SSD',
      brand: 'Western Digital',
      price: 0,
      wattage: 10,
      specs: 'Massive 4TB single M.2 capacity, up to 7300 MB/s, Game Mode 2.0',
      recommendedFor: 'All-in-one extreme storage: entire project portfolios, games, and OS on one drive',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&q=80',
    }
  ],

  psu: [
    {
      id: 'psu-deepcool-750-gold',
      type: 'psu',
      name: 'Deepcool PM750D 750W 80+ Gold Power Supply',
      brand: 'Deepcool',
      price: 0,
      wattage: 0,
      specs: '80 Plus Gold certified, Japanese primary capacitor, flat black cables',
      recommendedFor: 'Solid 750W Gold power for builds up to RTX 4070 Super',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300&q=80',
    },
    {
      id: 'psu-corsair-rm750e',
      type: 'psu',
      name: 'Corsair RM750e 750W 80+ Gold Fully Modular (ATX 3.0)',
      brand: 'Corsair',
      price: 0,
      wattage: 0,
      specs: 'ATX 3.0 & PCIe 5.0 12VHPWR cable, Zero-RPM fan mode, 105°C capacitors',
      recommendedFor: 'Quiet operation & clean interior with detachable modular cables',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300&q=80',
    },
    {
      id: 'psu-corsair-rm850e',
      type: 'psu',
      name: 'Corsair RM850e 850W 80+ Gold Fully Modular (ATX 3.0)',
      brand: 'Corsair',
      price: 0,
      wattage: 0,
      specs: '850W continuous power, native 12VHPWR for RTX 4070Ti/4080 Super',
      recommendedFor: 'Optimal headroom for demanding GPUs and high-wattage CPUs',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300&q=80',
    },
    {
      id: 'psu-seasonic-1000-gold',
      type: 'psu',
      name: 'Seasonic Focus GX-1000 1000W 80+ Gold (ATX 3.0)',
      brand: 'Seasonic',
      price: 0,
      wattage: 0,
      specs: '1000W output, 100% Japanese capacitors, 10-year warranty, fluid dynamic fan',
      recommendedFor: 'End-game reliability for RTX 4090 and i9-14900K workstation builds',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300&q=80',
    }
  ],

  cooler: [
    {
      id: 'clr-deepcool-ak400',
      type: 'cooler',
      name: 'Deepcool AK400 / AG400 Single Tower Air Cooler',
      brand: 'Deepcool',
      price: 0,
      wattage: 4,
      specs: '4 direct-touch heat pipes, 120mm FDB PWM fan, 220W TDP support',
      recommendedFor: 'Zero maintenance, ultra-reliable cooling for Ryzen 7600 / Core i5',
      image: 'https://images.unsplash.com/photo-1587202372565-d41982b6b5d9?w=300&q=80',
    },
    {
      id: 'clr-deepcool-ak620',
      type: 'cooler',
      name: 'Deepcool AK620 Dual Tower Air Cooler (Zero Zero Dark)',
      brand: 'Deepcool',
      price: 0,
      wattage: 6,
      specs: 'Dual-tower heatsink, 6 copper pipes, 260W TDP capacity, clean matte black',
      recommendedFor: 'Legendary quiet air cooling that rivals liquid AIOs with zero pump failure risk',
      image: 'https://images.unsplash.com/photo-1587202372565-d41982b6b5d9?w=300&q=80',
    },
    {
      id: 'clr-deepcool-lt720-360mm',
      type: 'cooler',
      name: 'Deepcool LT720 / LE720 360mm Liquid AIO Cooler',
      brand: 'Deepcool',
      price: 0,
      wattage: 15,
      specs: '360mm aluminum radiator, multi-dimensional infinity mirror block, Anti-Leak tech',
      recommendedFor: 'Essential for cooling Intel i7/i9 and Ryzen 7950X under sustained rendering',
      image: 'https://images.unsplash.com/photo-1587202372565-d41982b6b5d9?w=300&q=80',
    },
    {
      id: 'clr-nzxt-kraken-elite-360',
      type: 'cooler',
      name: 'NZXT Kraken Elite 360 RGB (Custom LCD Display)',
      brand: 'NZXT',
      price: 0,
      wattage: 18,
      specs: '2.36" wide-angle LCD screen (real-time CPU/GPU temp or GIF), 7th Gen Asetek pump',
      recommendedFor: 'The ultimate showcase aesthetic cooler for high-end studio desks',
      image: 'https://images.unsplash.com/photo-1587202372565-d41982b6b5d9?w=300&q=80',
    }
  ],

  case: [
    {
      id: 'cs-lian-li-205m',
      type: 'case',
      name: 'Lian Li Lancool 205M Mesh (Micro-ATX)',
      brand: 'Lian Li',
      price: 0,
      wattage: 0,
      specs: 'Compact desk footprint, mesh front, tempered glass side, 2x 140mm fans',
      recommendedFor: 'Minimalist clean desk rig without taking over your entire workspace',
      image: 'https://images.unsplash.com/photo-1587202372195-e669270b3cb9?w=300&q=80',
    },
    {
      id: 'cs-montech-air-903',
      type: 'case',
      name: 'Montech Air 903 Base / Max (High Airflow ATX)',
      brand: 'Montech',
      price: 0,
      wattage: 0,
      specs: 'Ultra-fine mesh front, 3x 140mm fans included, Type-C 3.2 port, fits 4090',
      recommendedFor: 'Unbeatable value and airflow in Indian market with modern front USB-C',
      image: 'https://images.unsplash.com/photo-1587202372195-e669270b3cb9?w=300&q=80',
    },
    {
      id: 'cs-fractal-north',
      type: 'case',
      name: 'Fractal Design North (Charcoal Black with Real Walnut Wood)',
      brand: 'Fractal Design',
      price: 0,
      wattage: 0,
      specs: 'Genuine FSC-certified walnut wood front, brass accents, Scandinavian furniture design',
      recommendedFor: 'The premier aesthetic centerpiece for designers, architects & warm studio setups',
      image: 'https://images.unsplash.com/photo-1587202372195-e669270b3cb9?w=300&q=80',
    },
    {
      id: 'cs-lian-li-o11-vision',
      type: 'case',
      name: 'Lian Li O11 Vision (Triple Seamless Glass Aquarium)',
      brand: 'Lian Li',
      price: 0,
      wattage: 0,
      specs: 'Three sides of uninterrupted tempered glass, dual-chamber cable management',
      recommendedFor: 'Breathtaking 270-degree view of your custom PC hardware on the desk',
      image: 'https://images.unsplash.com/photo-1587202372195-e669270b3cb9?w=300&q=80',
    }
  ]
};

// Curated 1 Lakh to 4 Lakh PC Presets with Use Cases and Photos
export const PC_PRESETS: PCPreset[] = [
  // ==========================================
  // TIER 1: ₹1,00,000 to ₹2,00,000 (1 - 2 Lakh)
  // ==========================================
  {
    id: 'preset-dev-gamer-1-5l',
    title: 'Developer + Gamer Hybrid (Ryzen 7600 + RTX 4070 Super)',
    subtitle: 'AMD Ryzen 5 7600, RTX 4070 Super 12GB, 32GB DDR5 6000MHz, 1TB Gen4 SSD, High Airflow Case',
    badge: 'Gamer + Developer',
    targetBudget: 0,
    budgetTier: '1_2_lakh',
    useCases: ['gamer_developer', 'developer', 'gamer'],
    processorType: 'amd',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80',
    highlights: [
      '1440p Maxed Ray Tracing gaming with DLSS 3 Frame Generation',
      'Rock-solid AM5 expandable platform with DDR5 6000MHz CL30',
      'Zero-throttle thermal performance under dual programming containers & games',
    ],
    parts: {
      cpu: COMPONENT_CATALOG.cpu[0], // AMD Ryzen 5 7600
      gpu: COMPONENT_CATALOG.gpu[4], // RTX 4070 Super 12GB
      motherboard: COMPONENT_CATALOG.motherboard[0], // MSI PRO B650M-A
      ram: COMPONENT_CATALOG.ram[0], // Corsair 32GB DDR5
      storage: COMPONENT_CATALOG.storage[0], // WD SN580 1TB
      psu: COMPONENT_CATALOG.psu[0], // Deepcool 750W Gold
      cooler: COMPONENT_CATALOG.cooler[0], // Deepcool AK400
      case: COMPONENT_CATALOG.case[1], // Montech Air 903
    }
  },
  {
    id: 'preset-designer-creator-1-6l',
    title: 'Designer & Video Creator Studio (Intel i5-14600K + RTX 4060 Ti 16GB)',
    subtitle: 'Intel Core i5-14600K (14 Cores), RTX 4060 Ti 16GB VRAM, 64GB DDR5 RAM, 1TB DRAM SSD',
    badge: 'Design + Video Editor',
    targetBudget: 0,
    budgetTier: '1_2_lakh',
    useCases: ['designer', 'ai_ml_creator'],
    processorType: 'intel',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80',
    highlights: [
      '16GB dedicated VRAM buffer for heavy Adobe After Effects & 4K Premiere timelines',
      'Massive 64GB DDR5 RAM for Figma, Illustrator, and Photoshop multi-tasking',
      'Intel QuickSync hardware video decoding engine',
    ],
    parts: {
      cpu: COMPONENT_CATALOG.cpu[6], // Intel i5-14600K
      gpu: COMPONENT_CATALOG.gpu[2], // RTX 4060 Ti 16GB VRAM
      motherboard: COMPONENT_CATALOG.motherboard[1], // ASUS TUF B760-PLUS
      ram: COMPONENT_CATALOG.ram[1], // G.Skill 64GB DDR5
      storage: COMPONENT_CATALOG.storage[1], // Crucial T500 1TB DRAM
      psu: COMPONENT_CATALOG.psu[1], // Corsair RM750e
      cooler: COMPONENT_CATALOG.cooler[1], // Deepcool AK620
      case: COMPONENT_CATALOG.case[0], // Lian Li 205M Mesh
    }
  },
  {
    id: 'preset-pure-gamer-1-8l',
    title: 'Pure Competitive Esports & 1440p High-FPS Rig',
    subtitle: 'AMD Ryzen 7 7800X3D (3D V-Cache), RTX 4070 Super 12GB, 32GB Low Latency RAM, Gen4 SSD',
    badge: 'Pure Gamer',
    targetBudget: 0,
    budgetTier: '1_2_lakh',
    useCases: ['gamer'],
    processorType: 'amd',
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=600&q=80',
    highlights: [
      'World-champion gaming CPU (Ryzen 7 7800X3D) with massive 3D V-Cache',
      'High 1% low frame rates in Valorant, CS2, Cyberpunk 2077 & GTA V',
      'Quiet dual-tower AK620 dark acoustic cooler',
    ],
    parts: {
      cpu: COMPONENT_CATALOG.cpu[2], // Ryzen 7 7800X3D
      gpu: COMPONENT_CATALOG.gpu[4], // RTX 4070 Super
      motherboard: COMPONENT_CATALOG.motherboard[2], // Gigabyte B650 AORUS Elite
      ram: COMPONENT_CATALOG.ram[0], // Corsair 32GB 6000 CL30
      storage: COMPONENT_CATALOG.storage[1], // Crucial T500 1TB
      psu: COMPONENT_CATALOG.psu[1], // Corsair RM750e
      cooler: COMPONENT_CATALOG.cooler[1], // Deepcool AK620
      case: COMPONENT_CATALOG.case[1], // Montech Air 903
    }
  },

  // ==========================================
  // TIER 2: ₹2,00,000 to ₹3,00,000 (2 - 3 Lakh)
  // ==========================================
  {
    id: 'preset-designer-gamer-2-4l',
    title: 'Designer + Gamer Elite Studio (i7-14700K + RTX 4070 Ti Super 16GB)',
    subtitle: 'Intel Core i7-14700K (20 Cores), RTX 4070 Ti Super 16GB, 64GB DDR5, 360mm AIO Cooler, 2TB SSD',
    badge: 'Design + Gamer',
    targetBudget: 0,
    budgetTier: '2_3_lakh',
    useCases: ['designer_gamer', 'designer', 'gamer'],
    processorType: 'intel',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80',
    highlights: [
      '20 Cores for effortless 3D rendering in Blender / Maya and 4K 120Hz gaming',
      '16GB GDDR6X 256-bit VRAM for massive textures, shaders, and AI generative art',
      '360mm Liquid AIO keeping CPU icy under prolonged video export',
    ],
    parts: {
      cpu: COMPONENT_CATALOG.cpu[7], // Intel i7-14700K
      gpu: COMPONENT_CATALOG.gpu[5], // RTX 4070 Ti Super 16GB
      motherboard: COMPONENT_CATALOG.motherboard[3], // MSI Z790 Tomahawk
      ram: COMPONENT_CATALOG.ram[1], // 64GB DDR5
      storage: COMPONENT_CATALOG.storage[2], // Samsung 990 Pro 2TB
      psu: COMPONENT_CATALOG.psu[2], // Corsair RM850e
      cooler: COMPONENT_CATALOG.cooler[2], // Deepcool 360mm AIO
      case: COMPONENT_CATALOG.case[1], // Montech Air 903
    }
  },
  {
    id: 'preset-scandinavian-wood-2-6l',
    title: 'Minimalist Scandinavian Studio (Fractal North Wood + 7800X3D + 4070 Ti Super)',
    subtitle: 'Fractal North Real Walnut Wood, AMD Ryzen 7 7800X3D, RTX 4070 Ti Super 16GB, 64GB DDR5, Samsung 2TB SSD',
    badge: 'Architect & Minimalist',
    targetBudget: 0,
    budgetTier: '2_3_lakh',
    useCases: ['designer_gamer', 'gamer_developer', 'developer'],
    processorType: 'amd',
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=600&q=80',
    highlights: [
      'Genuine FSC-certified walnut wood front panel that blends into luxury furniture',
      'Ultra-silent acoustic tuning with zero pump whine',
      'Peak energy efficiency with AMD 7800X3D and RTX 4070 Ti Super 16GB',
    ],
    parts: {
      cpu: COMPONENT_CATALOG.cpu[2], // Ryzen 7 7800X3D
      gpu: COMPONENT_CATALOG.gpu[5], // RTX 4070 Ti Super 16GB
      motherboard: COMPONENT_CATALOG.motherboard[2], // Gigabyte B650 Aorus Elite
      ram: COMPONENT_CATALOG.ram[1], // 64GB DDR5
      storage: COMPONENT_CATALOG.storage[2], // Samsung 990 Pro 2TB
      psu: COMPONENT_CATALOG.psu[2], // Corsair RM850e
      cooler: COMPONENT_CATALOG.cooler[1], // Deepcool AK620 Black
      case: COMPONENT_CATALOG.case[2], // Fractal Design North
    }
  },
  {
    id: 'preset-dev-ai-workstation-2-8l',
    title: 'Local AI / Machine Learning & Heavy Dev Rig (Ryzen 7900X + RTX 4080 Super)',
    subtitle: 'AMD Ryzen 9 7900X (12 Cores / 24 Threads), RTX 4080 Super 16GB, 64GB RAM, 850W Gold PSU',
    badge: 'AI / ML + Developer',
    targetBudget: 0,
    budgetTier: '2_3_lakh',
    useCases: ['ai_ml_creator', 'gamer_developer', 'developer'],
    processorType: 'amd',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&q=80',
    highlights: [
      '16GB fast GDDR6X on 4080 Super for local LLM inference (Llama-3, Mistral, ComfyUI)',
      '12 Cores / 24 Threads for concurrent Docker containers, Linux virtual machines & compilation',
      'PCIe 5.0 motherboard ready for upcoming ultra-fast storage drives',
    ],
    parts: {
      cpu: COMPONENT_CATALOG.cpu[3], // Ryzen 9 7900X
      gpu: COMPONENT_CATALOG.gpu[6], // RTX 4080 Super 16GB
      motherboard: COMPONENT_CATALOG.motherboard[2], // Gigabyte B650 Aorus Elite
      ram: COMPONENT_CATALOG.ram[1], // 64GB DDR5
      storage: COMPONENT_CATALOG.storage[2], // Samsung 990 Pro 2TB
      psu: COMPONENT_CATALOG.psu[2], // Corsair RM850e
      cooler: COMPONENT_CATALOG.cooler[2], // Deepcool 360mm AIO
      case: COMPONENT_CATALOG.case[1], // Montech Air 903
    }
  },

  // ==========================================
  // TIER 3: ₹3,00,000 to ₹4,00,000 (3 - 4 Lakh)
  // ==========================================
  {
    id: 'preset-enthusiast-gamer-dev-3-4l',
    title: 'The Ultimate Gamer + Developer Apex Rig (7800X3D + RTX 4090 24GB)',
    subtitle: 'AMD Ryzen 7 7800X3D, NVIDIA RTX 4090 24GB, 64GB DDR5 6000MHz, 2TB Samsung 990 Pro, 1000W Seasonic PSU',
    badge: 'Apex Gamer + Dev',
    targetBudget: 0,
    budgetTier: '3_4_lakh',
    useCases: ['gamer_developer', 'gamer'],
    processorType: 'amd',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
    highlights: [
      'World-record gaming performance with 7800X3D + the legendary RTX 4090 24GB',
      'Max out Cyberpunk 2077 Full Path Tracing at 4K resolution 100+ FPS',
      'Seasonic 1000W Japanese-capacitor power supply with 10-year Indian warranty',
    ],
    parts: {
      cpu: COMPONENT_CATALOG.cpu[2], // Ryzen 7 7800X3D
      gpu: COMPONENT_CATALOG.gpu[7], // RTX 4090 24GB
      motherboard: COMPONENT_CATALOG.motherboard[4], // ASUS ROG X670E
      ram: COMPONENT_CATALOG.ram[1], // 64GB DDR5
      storage: COMPONENT_CATALOG.storage[2], // Samsung 990 Pro 2TB
      psu: COMPONENT_CATALOG.psu[3], // Seasonic 1000W Gold
      cooler: COMPONENT_CATALOG.cooler[2], // Deepcool 360mm AIO
      case: COMPONENT_CATALOG.case[3], // Lian Li O11 Vision
    }
  },
  {
    id: 'preset-flagship-designer-intel-3-8l',
    title: 'Cinema 3D & VFX Studio Powerhouse (i9-14900K + RTX 4090 24GB + 96GB RAM)',
    subtitle: 'Intel Core i9-14900K (24 Cores up to 6.0GHz), RTX 4090 24GB, 96GB High-Speed DDR5, 4TB Gen4 NVMe, NZXT LCD Cooler',
    badge: '3D Studio & VFX',
    targetBudget: 0,
    budgetTier: '3_4_lakh',
    useCases: ['designer', 'designer_gamer', 'ai_ml_creator'],
    processorType: 'intel',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
    highlights: [
      '24-Core Intel i9 with 6.0 GHz boost for instant 3D rendering and compilation',
      'Massive 96GB high-speed DDR5 RAM for uncompressed 8K RED/RAW video footage',
      'NZXT Kraken Elite 360 LCD display displaying real-time hardware thermals and custom graphics',
      'Massive 4TB lightning NVMe drive storing entire studio production assets',
    ],
    parts: {
      cpu: COMPONENT_CATALOG.cpu[8], // Intel i9-14900K
      gpu: COMPONENT_CATALOG.gpu[7], // RTX 4090 24GB
      motherboard: COMPONENT_CATALOG.motherboard[3], // MSI Z790 Tomahawk
      ram: COMPONENT_CATALOG.ram[3], // Corsair 96GB DDR5
      storage: COMPONENT_CATALOG.storage[3], // WD Black 4TB NVMe
      psu: COMPONENT_CATALOG.psu[3], // Seasonic 1000W Gold
      cooler: COMPONENT_CATALOG.cooler[3], // NZXT Kraken Elite LCD
      case: COMPONENT_CATALOG.case[3], // Lian Li O11 Vision
    }
  },
  {
    id: 'preset-amd-flagship-workstation-3-6l',
    title: 'Extreme Dual-Workload Creator Rig (Ryzen 7950X + RTX 4090 24GB)',
    subtitle: 'AMD Ryzen 9 7950X (16 Cores / 32 Threads), RTX 4090 24GB, 64GB DDR5, Fractal North Walnut Wood, 1000W PSU',
    badge: 'Extreme Creator + Dev',
    targetBudget: 0,
    budgetTier: '3_4_lakh',
    useCases: ['gamer_developer', 'designer_gamer', 'ai_ml_creator'],
    processorType: 'amd',
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=600&q=80',
    highlights: [
      '16 Cores / 32 Threads peak multi-threading on AM5 workstation architecture',
      'RTX 4090 24GB for full GPU acceleration across Unreal Engine 5, Octane & PyTorch',
      'Housed in real walnut wood Fractal North for luxury Scandinavian desk aesthetics',
    ],
    parts: {
      cpu: COMPONENT_CATALOG.cpu[4], // Ryzen 9 7950X
      gpu: COMPONENT_CATALOG.gpu[7], // RTX 4090 24GB
      motherboard: COMPONENT_CATALOG.motherboard[4], // ASUS ROG X670E
      ram: COMPONENT_CATALOG.ram[1], // 64GB DDR5
      storage: COMPONENT_CATALOG.storage[2], // Samsung 990 Pro 2TB
      psu: COMPONENT_CATALOG.psu[3], // Seasonic 1000W Gold
      cooler: COMPONENT_CATALOG.cooler[2], // Deepcool 360mm AIO
      case: COMPONENT_CATALOG.case[2], // Fractal North Wood
    }
  }
];
