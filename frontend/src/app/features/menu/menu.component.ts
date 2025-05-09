import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../../services/pizza.service';
import { Pizza } from '../../shared/models/pizza.model';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  pizzas: Pizza[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private pizzaService: PizzaService) { }

  ngOnInit(): void {
    this.pizzaService.getAllPizzas().subscribe(response => {console.log(response); this.pizzas = response});
  }
}
