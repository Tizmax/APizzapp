import { Pizza } from './pizza.model';

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