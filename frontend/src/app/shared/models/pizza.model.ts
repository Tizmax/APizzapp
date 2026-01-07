import { Ingredient } from './ingredient.model'; 

export interface PizzaSize {
    id: number;
    label: string;
}

export interface Sauce {
    id: number;
    name: string;
    imageUrl?: string;
}

export interface Pizza {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  baseIngredients: Ingredient[];
}

export interface ModifiedPizza {
  pizza: Pizza;
  sauce?: Sauce;
  supplements: Ingredient[];
  deplements: Ingredient[];
}
