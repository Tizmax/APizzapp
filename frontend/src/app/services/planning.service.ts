import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../shared/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private apiUrl = 'http://localhost:8080/listerOrder'; // URL du backend

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer toutes les commandes
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }
}
