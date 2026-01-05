import { Ingredient } from './ingredient.model'; 

export interface Pizza {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  baseIngredients: Ingredient[];
}

export interface ModifiedPizza {
  pizza: Pizza;
  supplements: Ingredient[];
  deplements: Ingredient[];
}
