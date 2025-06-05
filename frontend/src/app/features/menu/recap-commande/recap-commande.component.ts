import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { PizzaService } from '../../../services/pizza.service';
import { CartItem } from '../../../shared/models/order.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  timeSlots: string[] = []; // Pour les créneaux horaires

  constructor(private cartService: CartService, private pizzaService: PizzaService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, public authService: AuthService) {}

  ngOnInit(): void {
    this.loadCartData(); // Charger les données initialement
    this.generateTimeSlots(17, 0, 21, 0, 15); // Génère créneaux de 17h00 à 21h00 par tranche de 15 min


    this.orderForm = this.fb.group({
      surname: [this.authService.currentUserValue?.firstName || '', Validators.required], // Pré-remplissage si utilisateur connecté, sinon vide
      name: [this.authService.currentUserValue?.lastName || '', Validators.required], // Pré-remplissage si utilisateur connecté, sinon vide
      scheduledTime: ['', Validators.required], // Champ pour le créneau horaire
    });
  }

  generateTimeSlots(startHour: number, startMinute: number, endHour: number, endMinute: number, intervalMinutes: number): void {
    let currentTime = new Date();
    currentTime.setHours(startHour, startMinute, 0, 0); // Heure de début

    const endTime = new Date();
    endTime.setHours(endHour, endMinute, 0, 0); // Heure de fin

    while (currentTime <= endTime) {
      const hours = currentTime.getHours().toString().padStart(2, '0');
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      this.timeSlots.push(`${hours}:${minutes}`);
      currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
    }
  }
  get formControls() { return this.orderForm.controls; }

  loadCartData(): void {
    this.cartItems = this.cartService.getCartItems();
    // this.totalPrice = this.cartService.getCartTotalPrice();
  }

  incQuantity(item: CartItem): void {
    this.cartService.updateItemQuantity(item.tempId, item.quantity + 1);
    console.log('Item quantity increased:', item.pizza.name, item.quantity);
    this.loadCartData(); // Charger les données initialement
    
  }
  decQuantity(item: CartItem): void {
    this.cartService.updateItemQuantity(item.tempId, item.quantity - 1);
    console.log('Item quantity decreased:', item.pizza.name, item.quantity);
    this.loadCartData(); // Charger les données initialement
  }

  cancelOrder(): void {
    this.cartService.clearCart();
    this.loadCartData(); 
    this.router.navigate(['/dashboards']);
  }

  validateOrder(): void {
    const cartItems = this.cartItems.map(item => {
      return {
        pizzaId: item.pizza.id,
        quantity: item.quantity,
        supplements: item.addedSupplements.map(s => s.id),
        depplements: item.removedIngredients.map(d => d.id)
      };
    });

    const user = this.authService.currentUserValue;
    let userId;
    let userRole = '';
    if (user) {
      userRole = userRole ;
      if (this.authService.isLoggedIn && userRole === 'USER') {
        // Si l'utilisateur est connecté et a le role USER, on peut récupérer son ID
        userId = user.id;
      }
    } else {
      // Sinon, on peut gérer le cas où l'utilisateur n'est pas connecté
      userId = null;
      console.warn('Utilisateur non connecté. ID utilisateur non ajouté aux articles du panier.');
    }

    const order = {
      scheduledTime: this.orderForm.value.scheduledTime,
      status: 'PENDING',
      totalAmount: 0,
      userId: userId,
      firstNameGuest: this.orderForm.value.surname,
      lastNameGuest: this.orderForm.value.name,
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

  get userRole(): string {
    const user = this.authService.currentUserValue;
    return user ? user.role.replace('ROLE_', '') : '';
  }

  get isAdminOrOperator(): boolean {
    return this.userRole === 'ADMIN' || this.userRole === 'OPERATOR';
  }

  // Calculer le prix unitaire (basePrice + suppléments éventuels)
  getUnitPrice(item: CartItem): number {
    let unit = item.pizza.price;
    // Si vous avez des suppléments avec des prix :
    item.addedSupplements.forEach(sup => {
      if (sup.supplementPrice) {
        unit += sup.supplementPrice;
      }
    });
    return unit;
  }

  getLinePrice(item: CartItem): number {
    return this.getUnitPrice(item) * item.quantity;
  }

}
