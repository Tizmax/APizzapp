import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pizza } from '../shared/models/pizza.model'; 
import { Ingredient } from '../shared/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(`${this.apiUrl}/listerPizza`);
  }

  getPizzaById(id: string | null): Observable<Pizza> {
    return this.http.get<Pizza>(`${this.apiUrl}/getPizzaById/${id}`);
  }

  
  getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.apiUrl}/getAllIngredients`);
  }

  placeOrder(order: any) {
    return this.http.post(`${this.apiUrl}/placeOrder`, order); // '/api' peut être le préfixe de ton proxy
  }

  deleteOrder(id: number) {
    return this.http.get(`${this.apiUrl}/deleteOrder/${id}`);
  }
}
