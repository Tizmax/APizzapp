import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pizza, PizzaSize, Sauce } from '../shared/models/pizza.model'; 
import { Ingredient } from '../shared/models/ingredient.model';
import { Order } from '../shared/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiUrl = '/api';

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

  getAllSizes(): Observable<PizzaSize[]> {
    return this.http.get<PizzaSize[]>(`${this.apiUrl}/getAllSizes`);
  }

  getAllSauces(): Observable<Sauce[]> {
    return this.http.get<Sauce[]>(`${this.apiUrl}/getAllSauces`);
  }

  placeOrder(order: Order) {
    const dto = {
      scheduledTime: order.scheduledTime,
      firstNameGuest: order.firstNameGuest,
      lastNameGuest: order.lastNameGuest,
      userId: order.user ? order.user.id : null,
      orderItems: order.orderItems.map(item => ({
        quantity: item.quantity,
        sizeId: item.size.id,
        half1: {
          pizzaId: item.half1.pizza.id,
          sauceId: item.half1.sauce ? item.half1.sauce.id : null,
          supplementsId: item.half1.supplements.map(i => i.id),
          deplementsId: item.half1.deplements.map(i => i.id)
        },
        half2: item.half2 ? {
          pizzaId: item.half2.pizza.id,
          sauceId: item.half2.sauce ? item.half2.sauce.id : null,
          supplementsId: item.half2.supplements.map(i => i.id),
          deplementsId: item.half2.deplements.map(i => i.id)
        } : null
      })),
    };
    console.log('Placing order with DTO:', dto);

    return this.http.post(`${this.apiUrl}/placeOrder`, dto);
  }

  deleteOrder(id: number) {
    return this.http.get(`${this.apiUrl}/deleteOrder/${id}`);
  }

  updateIngredients(ingredients: Ingredient[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/updateIngredients`, ingredients);
  }
}
