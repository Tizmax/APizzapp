// src/app/shared/user-status/user-status.component.ts
import { Component }    from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService }  from '../../services/auth.service';
import { CartService }  from '../../services/cart.service';
import { Router, RouterModule } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-status',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf, AsyncPipe],
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent {
  constructor(
    public auth: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  // Getter qui renvoie à chaque appel le nombre d’articles dans le panier
  get count(): number {
    return this.cartService.getCartItemCount();
  }

  isOnLandingPage(): boolean {
    return this.router.url === '/';
  }

  logout() {
    this.auth.logout();
  }
}
