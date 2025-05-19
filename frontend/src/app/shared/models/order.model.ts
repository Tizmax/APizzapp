
import { Pizza } from '../../shared/models/pizza.model';
import { Ingredient } from '../../shared/models/ingredient.model';

export interface CartItem {
  tempId: string; // ID unique pour cet item DANS le panier (utile pour le supprimer/modifier)
  pizza: Pizza;
  quantity: number;
  addedSupplements: Ingredient[];
  removedIngredients: Ingredient[];
  // calculatedItemPrice: number; // Prix unitaire de la pizza avec ses suppléments
}

export interface OrderItem {
  id: number;
  orderId: number;
  name: string;
  basePrice: number;
  imageUrl?: string;
}

export interface Order {
  id: number;
  orderDate: Date;
  status: string;
  totalAmount: number;
  userId: number;
  items: OrderItem[];
}