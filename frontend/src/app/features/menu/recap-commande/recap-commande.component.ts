import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { PizzaService } from '../../../services/pizza.service';
import { CartItem } from '../../../shared/models/cart-item.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recap-commande',
  standalone: false,
  templateUrl: './recap-commande.component.html',
  styleUrl: './recap-commande.component.css'
})
export class RecapCommandeComponent implements OnInit{
  orderForm!: FormGroup;
  cartItems: CartItem[] = [];
  // totalPrice: number = 0;

  constructor(private cartService: CartService, private pizzaService: PizzaService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadCartData(); // Charger les données initialement

    this.orderForm = this.fb.group({
      name: [''],
      time: [''],
      details: ['']
    });
  }

  loadCartData(): void {
    this.cartItems = this.cartService.getCartItems();
    // this.totalPrice = this.cartService.getCartTotalPrice();
  }

  cancelOrder(): void {
    this.cartService.clearCart();
    this.loadCartData(); 
    this.goToMenu();
  }

  validateOrder(): void {
    const order = {
      name: this.orderForm.value.name,
      time: this.orderForm.value.time,
      details: this.orderForm.value.details,
      cartItems: this.cartItems.map(item => ({
        pizzaName: item.pizza.name,
        quantity: item.quantity,
        supplements: item.addedSupplements.map(s => s.name),
        depplements: item.removedIngredients.map(d => d.name)
      }))
    };

    this.pizzaService.placeOrder(order).subscribe({
      next: () => {
        console.log('Commande envoyée avec succès !');
        this.cancelOrder();
      },
      error: (err) => {
        console.error('Erreur lors de la commande', err);
      }
    });
  }


  goToMenu(): void {
    this.router.navigate(['../'], { relativeTo: this.route});
  }

}
