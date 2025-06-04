import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderItem } from '../shared/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private apiUrl = '/api/listerOrder'; // URL du backend

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer toutes les commandes
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  updateOrderStatus(orderId: number, status: string): Observable<Order> {
  return this.http.post<Order>(
    `${this.apiUrl}/orders/status`,
    { id: orderId.toString(), status: status }
  );
}
}
