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
  isHalfHalfMode: boolean = false;
  selectedPizzas: Pizza[] = [];


  constructor(private pizzaService: PizzaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pizzaService.getAllPizzas().subscribe(response => {console.log(response); this.pizzas = response});
  }

  isPizzaAvailable(pizza: Pizza): boolean {
    return pizza.baseIngredients.every(ingredient => ingredient.availableAsSupplement);
  }

  toggleHalfHalfMode(): void {
    this.isHalfHalfMode = !this.isHalfHalfMode;
    this.selectedPizzas = [];
  }

  isSelected(pizza: Pizza): boolean {
    return this.selectedPizzas.some(p => p.id === pizza.id);
  }

  onPizzaSelected(pizza: Pizza): void {
    if (this.isPizzaAvailable(pizza)) {
      if (this.isHalfHalfMode) {
        const index = this.selectedPizzas.findIndex(p => p.id === pizza.id);
        if (index > -1) {
          this.selectedPizzas.splice(index, 1);
        } else {
          if (this.selectedPizzas.length < 2) {
            this.selectedPizzas.push(pizza);
          }
        }
        
        if (this.selectedPizzas.length === 2) {
          this.router.navigate(['detail-produit', this.selectedPizzas[0].id, this.selectedPizzas[1].id], { relativeTo: this.route });
        }
      } else {
        this.router.navigate(['detail-produit', pizza.id], { relativeTo: this.route });
      }
    }
  }
}
