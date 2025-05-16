import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';
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

  constructor(private cartService: CartService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {}

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
    console.log('Commande validée');   
    this.cancelOrder();

  }

  goToMenu(): void {
    this.router.navigate(['../'], { relativeTo: this.route});
  }

}
