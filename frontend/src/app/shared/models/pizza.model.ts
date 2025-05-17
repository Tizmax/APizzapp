import { Ingredient } from './ingredient.model'; 

export interface Pizza {
  id: number;
  name: string;
  description?: string;
  basePrice: number;
  imageUrl?: string;
  baseIngredients: Ingredient[];
}
