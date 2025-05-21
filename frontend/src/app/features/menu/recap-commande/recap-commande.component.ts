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
      scheduledTime: this.orderForm.value.scheduledTime,
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
