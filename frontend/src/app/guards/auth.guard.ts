import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.auth.isLoggedIn;
    const user = this.auth.currentUserValue;
    const userRole = user?.role.replace('ROLE_', '') ?? '';

    // 1) Si on est sur la page de login et déjà connecté, on force le dashboard
    if (route.routeConfig?.path === '' && isLoggedIn) {
      this.router.navigate(['/dashboards']);
      return false;
    }

    // 2) Si la route demande des rôles, c'est une page protégée
    const allowedRoles: string[] = route.data['roles'] ?? [];
    if (allowedRoles.length > 0) {
      // 2.a) pas connecté → retour à la landing
      if (!isLoggedIn) {
        this.router.navigate(['/landing']);
        return false;
      }
      // 2.b) rôle autorisé → on laisse passer
      if (allowedRoles.includes(userRole)) {
        return true;
      }
      // 2.c) rôle non autorisé → redirection vers son dashboard
      this.router.navigate([`/dashboards/${userRole.toLowerCase()}`]);
      return false;
    }

    // 3) Routes “publiques” (sans roles) :
    return true;
  }
}
