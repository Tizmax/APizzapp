import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { PizzaService } from '../../../services/pizza.service';
import { OrderItem } from '../../../shared/models/order.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ModifiedPizza } from '../../../shared/models/pizza.model';

@Component({
  selector: 'app-recap-commande',
  standalone: false,
  templateUrl: './recap-commande.component.html',
  styleUrl: './recap-commande.component.css'
})
export class RecapCommandeComponent implements OnInit{
  orderForm!: FormGroup;
  cartItems: OrderItem[] = [];
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

  incQuantity(item: OrderItem): void {
    this.cartService.updateItemQuantity(item.id, item.quantity + 1);
    this.loadCartData(); // Charger les données initialement
    
  }
  decQuantity(item: OrderItem): void {
    this.cartService.updateItemQuantity(item.id, item.quantity - 1);
    this.loadCartData(); // Charger les données initialement
  }

  cancelOrder(): void {
    this.cartService.clearCart();
    this.loadCartData(); 
    this.router.navigate(['/dashboards']);
  }

  validateOrder(): void {

    const user = this.authService.currentUserValue;

    const order = {
      id : -1,
      scheduledTime: this.orderForm.value.scheduledTime,
      firstNameGuest: this.orderForm.value.surname,
      lastNameGuest: this.orderForm.value.name,
      status: 'PENDING',
      totalAmount: 0,
      user: user,
      orderItems: this.cartItems
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

  getHalfPrice(half : ModifiedPizza): number {
    let price = half.pizza.price;

    half.supplements.forEach(sup => {
      if (sup.supplementPrice) {
        price += sup.supplementPrice;
      }
    });
    return price;

  }

  // Calculer le prix unitaire (basePrice + suppléments éventuels)
  getUnitPrice(item: OrderItem): number {
    let unit;
    if (item.half2) {
      unit = Math.max(this.getHalfPrice(item.half1), this.getHalfPrice(item.half2));
    } else {
      unit = this.getHalfPrice(item.half1);
    }
    return unit;
  }

  getLinePrice(item: OrderItem): number {
    return this.getUnitPrice(item) * item.quantity;
  }

}
