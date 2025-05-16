import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pizza } from '../shared/models/pizza.model';

export interface Order {
  id: number;
  pizzas: Pizza[];
  name: string;
  price: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private apiUrl = 'http://localhost:8080/listerOrder'; // URL de l'API Spring Boot

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }
}