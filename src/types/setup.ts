export type Category = 
  | 'desk'
  | 'chair'
  | 'monitor'
  | 'pc'
  | 'audio'
  | 'lighting'
  | 'peripherals'
  | 'accessories';

export type ItemStatus = 'wishlist' | 'ordered' | 'received';
export type ItemPriority = 'must-have' | 'recommended' | 'optional';

export interface SetupItem {
  id: string;
  name: string;
  category: Category;
  url: string;
  price: number;
  quantity: number;
  priority: ItemPriority;
  status: ItemStatus;
  notes?: string;
  createdAt: string;
}

export type PCPartType = 
  | 'cpu'
  | 'gpu'
  | 'motherboard'
  | 'ram'
  | 'storage'
  | 'psu'
  | 'cooler'
  | 'case';

export interface PCComponent {
  id: string;
  name: string;
  type: PCPartType;
  price: number;
  url?: string;
  wattage?: number;
  specs?: string;
  recommendedFor?: string;
  brand?: string;
  image?: string;
}

export interface PCBuild {
  name: string;
  parts: Record<PCPartType, PCComponent | null>;
}

export type UseCase = 
  | 'developer'
  | 'gamer'
  | 'designer'
  | 'gamer_developer'
  | 'designer_gamer'
  | 'ai_ml_creator';

export type BudgetTier = '1_2_lakh' | '2_3_lakh' | '3_4_lakh';

export interface PCPreset {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  targetBudget?: number;
  budgetTier: BudgetTier;
  useCases: UseCase[];
  image: string; // High quality showcase image
  processorType: 'intel' | 'amd';
  parts: Record<PCPartType, PCComponent>;
  highlights: string[];
}

export interface SetupPreset {
  id: string;
  title: string;
  description: string;
  categoryTag: string;
  accentColor: string;
  items: Array<{
    name: string;
    category: Category;
    estimatedPrice?: number;
    priority: ItemPriority;
    notes?: string;
    searchQuery?: string;
  }>;
}
