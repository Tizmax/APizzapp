import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PizzaService } from '../../../services/pizza.service';
import { CartService } from '../../../services/cart.service';
import { ModifiedPizza, Pizza, Sauce, PizzaSize } from '../../../shared/models/pizza.model';
import { Ingredient } from '../../../shared/models/ingredient.model';

@Component({
  selector: 'app-detail-produit',
  standalone: false,
  templateUrl: './detail-produit.component.html',
  styleUrl: './detail-produit.component.css'
})


export class DetailProduitComponent {

  halves : ModifiedPizza[] = [];
  selectedSize! : PizzaSize;

  ingredients : Ingredient[] = [];
  sizes : PizzaSize[] = [];
  sauces : Sauce[] = [];
 
  constructor(private cartService: CartService, private route: ActivatedRoute, private router: Router, private pizzaService: PizzaService) {}

  ngOnInit(): void {
    
    this.pizzaService.getAllSauces().subscribe(sauces => {
      this.sauces = sauces;
    });

    // Charger les tailles disponibles
    this.pizzaService.getAllSizes().subscribe(sizes => {
      this.sizes = sizes;
      // Sélectionner la taille 'M' par défaut si elle existe, sinon la première
      const medium = this.sizes.find(s => s.label === 'M');
      this.selectedSize = medium ? medium : this.sizes[0];
    });

    const id1 = this.route.snapshot.paramMap.get('id1');

    const id2 = this.route.snapshot.paramMap.get('id2');

    this.pizzaService.getPizzaById(id1).subscribe((data: Pizza) => {
      this.halves.push({
        "pizza" : data,
        "sauce" : undefined,
        "supplements": [],
        "deplements": []
      })
    });
    if (id2) {
      this.pizzaService.getPizzaById(id2).subscribe((data: Pizza) => {
        this.halves.push({
          "pizza" : data,
          "sauce" : undefined,
          "supplements": [],
          "deplements": []
        })
      })
    };
    
    console.log('Pizza choisie:', this.halves);

    this.pizzaService.getAllIngredients().subscribe(
      (data: Ingredient[]) => this.ingredients = data
    );
  }

  toggleIngredient(half:ModifiedPizza, ingredient: Ingredient): void {
    
    if (half.deplements.includes(ingredient)) {
      half.deplements = half.deplements.filter(i => i !== ingredient);
    } else {
      half.deplements.push(ingredient);
    }
  }

  addSupplement(half: ModifiedPizza, ingredient: Ingredient): void {
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

  onSelectSize(size: PizzaSize): void {
    this.selectedSize = size;
  }

  onSelectSauce(half: ModifiedPizza, sauce: Sauce): void {
    if (half.sauce && half.sauce.id === sauce.id) {
      half.sauce = undefined;
    } else {
      half.sauce = sauce;
    }
  }

  addToCart(): void {
    if (!this.selectedSize) return;
    this.cartService.addItem(this.halves[0], this.halves[1], this.selectedSize);
    this.router.navigate(['recap-commande'], { relativeTo: this.route.parent }); 
  }
}
