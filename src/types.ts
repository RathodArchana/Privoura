export interface PlatformLink {
  platform: string;
  url: string;
  price: number;
  rating: number;
  sustainabilityScore: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  sustainabilityScore: number;
  image: string;
  description: string;
  tags: string[];
  links: PlatformLink[];
  climateContext: string[]; // e.g., ["rainy", "cold", "sunny"]
  outfitPicks?: string[]; // Array of product IDs to complete the look
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LocalProfile {
  interactions: {
    productId: string;
    timestamp: number;
    type: 'view' | 'click' | 'cart';
  }[];
  preferences: string[]; // tags the user likes
  cart: {
    productId: string;
    quantity: number;
  }[];
  lastViewed: string[]; // Array of product IDs
}
