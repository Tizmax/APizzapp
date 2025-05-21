import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { PizzaService } from '../../../services/pizza.service';
import { CartItem } from '../../../shared/models/order.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

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

  constructor(private cartService: CartService, private pizzaService: PizzaService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private authService: AuthService) {}

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
    this.router.navigate(['/dashboards']);
  }

  validateOrder(): void {
    const cartItems = this.cartItems.map(item => {
      return {
        pizzaId: item.pizza.id, // Assure-toi que tu as l'ID
        quantity: item.quantity,
        supplements: item.addedSupplements.map(s => s.id),
        depplements: item.removedIngredients.map(d => d.id)
      };
    });

    // const totalAmount = this.cartItems.reduce((total, item) => {
    //   const supplementsPrice = item.addedSupplements.reduce((sum, s) => sum + s.price, 0);
    //   return total + (item.pizza.basePrice + supplementsPrice) * item.quantity;
    // }, 0);
    let userId;
    if (this.authService.isLoggedIn) {
      // Si l'utilisateur est connecté, on peut récupérer son ID
      userId = this.authService.currentUserValue?.id;
    } else {
      // Sinon, on peut gérer le cas où l'utilisateur n'est pas connecté
      userId = 1;
      console.warn('Utilisateur non connecté. ID utilisateur non ajouté aux articles du panier.');
    }

    const order = {
      orderDate: new Date().toISOString(), // ou this.orderForm.value.time
      status: 'PENDING',
      totalAmount: 0,
      userId: userId,
      orderItems: cartItems
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
