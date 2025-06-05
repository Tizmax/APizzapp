export interface Ingredient {
    id: number;
    name: string;
    availableAsSupplement: boolean;
    supplementPrice: number;
    imageUrl?: string;
  }