import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../../../services/pizza.service';
import { Pizza } from '../../../shared/models/pizza.model';
import { Router, ActivatedRoute } from '@angular/router';

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


  constructor(private pizzaService: PizzaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pizzaService.getAllPizzas().subscribe(response => {console.log(response); this.pizzas = response});
  }

  isPizzaAvailable(pizza: Pizza): boolean {
    return pizza.baseIngredients.every(ingredient => ingredient.availableAsSupplement);
  }

  onPizzaSelected(pizza: Pizza): void {
    if (this.isPizzaAvailable(pizza)) {
      this.router.navigate(['detail-produit', pizza.id], { relativeTo: this.route });
    }
  }
}
