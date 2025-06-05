import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PizzaService } from '../../../services/pizza.service';
import { CartService } from '../../../services/cart.service';
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
  supplements: Ingredient[] = [];
  disabledIngredients: Set<number> = new Set<number>();

  constructor(private cartService: CartService, private route: ActivatedRoute, private router: Router, private pizzaService: PizzaService) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    this.pizzaService.getPizzaById(id).subscribe(
      (data) => {this.pizza = data; console.log('Détails de la pizza:', this.pizza)
      }
    );

    this.pizzaService.getAllIngredients().subscribe(
      (data) => this.ingredients = data
    );
  }

  toggleIngredient(index: number): void {
    if (this.disabledIngredients.has(index)) {
      this.disabledIngredients.delete(index);
    } else {
      this.disabledIngredients.add(index);
    }
  }

  addSupplement(ingredient: Ingredient): void {
    // Logique pour ajouter un supplément
    console.log('Supplément ajouté:', ingredient);
    this.supplements.push(ingredient);
    console.log('Liste des suppléments:', this.supplements);
  }

  removeSupplement(index: number): void {
    // Logique pour retirer un supplément
    console.log('Supplément retiré : n°', index);
    this.supplements.splice(index, 1);
    console.log('Liste des suppléments:', this.supplements);
  }

  addToCart(): void {
  if (this.pizza) {

    const depplements: Ingredient[] = this.pizza.baseIngredients.filter((ingredient) => this.disabledIngredients.has(ingredient.id));
    console.log('Ingrédients suppr après retrait:', depplements);
    this.cartService.addItem(
      this.pizza,
      1,
      this.supplements,
      depplements
    );
    this.router.navigate(['recap-commande'], { relativeTo: this.route.parent });
  }
}
}
