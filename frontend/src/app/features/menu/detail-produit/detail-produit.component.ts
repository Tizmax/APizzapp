import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PizzaService } from '../../../services/pizza.service';
import { Pizza } from '../../../shared/models/pizza.model';
import { Ingredient } from '../../../shared/models/ingredient.model';

@Component({
  selector: 'app-detail-produit',
  standalone: false,
  templateUrl: './detail-produit.component.html',
  styleUrl: './detail-produit.component.css'
})
export class DetailProduitComponent {
  pizza: Pizza | null = null;
  ingredients: Ingredient[] = [];

  constructor(private route: ActivatedRoute, private pizzaService: PizzaService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.pizzaService.getPizzaById(id).subscribe(
      (data) => this.pizza = data
    );

    
    this.pizzaService.getAllIngredients().subscribe(
      (data) => this.ingredients = data
    );
  }
}
