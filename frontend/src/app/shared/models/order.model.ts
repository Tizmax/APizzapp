
import { ModifiedPizza } from '../../shared/models/pizza.model';
import { User } from '../../shared/models/user.model';


export interface OrderItem {
  id: string;
  orderId: number;
  half1: ModifiedPizza;
  half2: ModifiedPizza;
  quantity: number;
}

export interface Order {
  id: number;
  scheduledTime: string;
  firstNameGuest: string;
  lastNameGuest: string;
  status: string;
  totalAmount: number;
  user: User | null;
  orderItems: OrderItem[];
}