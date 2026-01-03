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

  halves : any[] = [];
  ingredients : Ingredient[] = [];
 
  constructor(private cartService: CartService, private route: ActivatedRoute, private router: Router, private pizzaService: PizzaService) {}

  ngOnInit(): void {

    const id1 = this.route.snapshot.paramMap.get('id1');
    const id2 = this.route.snapshot.paramMap.get('id2');

    this.pizzaService.getPizzaById(id1).subscribe((data) => {
      this.halves.push({
        "pizza" : data,
        "supplements": [],
        "disabledIngredients": new Set<number>()
      })
    });
    this.pizzaService.getPizzaById(id2).subscribe((data) => {
      if (id2) {
        this.halves.push({
          "pizza" : data,
          "supplements": [],
          "disabledIngredients": new Set<number>()
        })
      }
    });
    
    
    console.log('Pizza choisie:', this.halves);

    this.pizzaService.getAllIngredients().subscribe(
      (data) => this.ingredients = data
    );
  }

  toggleIngredient(half:any, index: number): void {
    if (half.disabledIngredients.has(index)) {
      half.disabledIngredients.delete(index);
    } else {
      half.disabledIngredients.add(index);
    }
  }

  addSupplement(half: any, ingredient: Ingredient): void {
    // Logique pour ajouter un supplément
    console.log('Supplément ajouté:', ingredient);
    half.supplements.push(ingredient);
    console.log('Liste des suppléments:', half.supplements);
  }

  removeSupplement(half: any, index: number): void {
    // Logique pour retirer un supplément
    console.log('Supplément retiré : n°', index);
    half.supplements.splice(index, 1);
    console.log('Liste des suppléments:', half.supplements);
  }

  addToCart(): void {
    const pizza : any = this.halves[0];
    const depplements: Ingredient[] = pizza.pizza.baseIngredients.filter((ingredient: Ingredient) => pizza.disabledIngredients.has(ingredient.id));
    console.log('Ingrédients suppr après retrait:', depplements);
    this.cartService.addItem(
      pizza.pizza,
      1,
      pizza.supplements,
      depplements
    );
    this.router.navigate(['recap-commande'], { relativeTo: this.route.parent });
    
  }
}
