import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  supplements: Ingredient[] = [];
  depplements: Ingredient[] = [];
  disabledIngredients: Set<number> = new Set<number>();

  constructor(private route: ActivatedRoute, private router: Router, private pizzaService: PizzaService) {}

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

  AddToCart(pizza: Pizza, quantity: number, addedSupplements: Ingredient[], removedIngredients: Ingredient[]): void {
    // Logique pour ajouter la pizza au panier
    console.log('Pizza ajoutée au panier:', pizza);
    console.log('Quantité:', quantity);
    console.log('Suppléments ajoutés:', addedSupplements);
    console.log('Ingrédients retirés:', removedIngredients);
  }

  
  validateItem(): void {
    this.router.navigate(['recap-commande'], { relativeTo: this.route.parent });
  }
}
