
import { Pizza } from '../../shared/models/pizza.model';
import { Ingredient } from '../../shared/models/ingredient.model';
import { User } from '../../shared/models/user.model';

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
  pizza: Pizza;
  supplements: Ingredient[];
  deplements: Ingredient[];
}

export interface Order {
  id: number;
  scheduledTime: string;
  status: string;
  totalAmount: number;
  user: User;
  orderItems: OrderItem[];
}