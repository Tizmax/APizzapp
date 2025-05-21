import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PizzaService } from '../../../../services/pizza.service';
import { Ingredient } from '../../../../shared/models/ingredient.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'],
  standalone: false
})
export class IngredientsComponent implements OnInit {
  ingredients: Ingredient[] = [];
  originalIngredients: Ingredient[] = [];

  constructor(
    private pizzaService: PizzaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadIngredients();
  }

  loadIngredients(): void {
    this.pizzaService.getAllIngredients().subscribe(
      (data) => {
        this.ingredients = data.sort((a, b) => {
          if (a.availableAsSupplement === b.availableAsSupplement) return 0;
          return a.availableAsSupplement ? 1 : -1;
        });
        this.originalIngredients = JSON.parse(JSON.stringify(this.ingredients));
      }
    );
  }

  toggleAvailability(ingredient: Ingredient): void {
    ingredient.availableAsSupplement = !ingredient.availableAsSupplement;
  }

  cancel(): void {
    this.router.navigate(['/dashboards/operator']);
  }

  save(): void {
    this.pizzaService.updateIngredients(this.ingredients).subscribe({
      next: () => {
        this.router.navigate(['/dashboards/operator']);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour des ingrédients:', error);
      }
    });
  }
} 