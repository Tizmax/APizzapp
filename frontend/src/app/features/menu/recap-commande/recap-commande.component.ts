import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/models/cart-item.model';
import { Pizza } from '../../../shared/models/pizza.model';
import { Ingredient } from '../../../shared/models/ingredient.model';

@Component({
  selector: 'app-recap-commande',
  standalone: false,
  templateUrl: './recap-commande.component.html',
  styleUrl: './recap-commande.component.css'
})
export class RecapCommandeComponent {
  
  cartItems: CartItem[] = [];
  // totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    // this.loadCartData(); // Charger les données initialement
  }

  loadCartData(): void {
    this.cartItems = this.cartService.getCartItems();
    // this.totalPrice = this.cartService.getCartTotalPrice();
  }

}
