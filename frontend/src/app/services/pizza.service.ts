import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pizza } from '../shared/models/pizza.model'; 

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiUrl = 'http://backend:8080/listerPizza';

  constructor(private http: HttpClient) { }

  getAllPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.apiUrl);
  }
}
