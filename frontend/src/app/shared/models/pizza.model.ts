import { Ingredient } from './ingredient.model'; // si tu as ce modèle

export interface Pizza {
  id: number;
  name: string;
  description?: string;
  basePrice: number;
  imageUrl?: string;
  baseIngredients: Ingredient[];
}
