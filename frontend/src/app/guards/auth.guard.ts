import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
  if (!this.auth.isLoggedIn) {
    this.router.navigate(['/landing']);
    return false;
  }

  const user = this.auth.currentUserValue!;
  const userRole = user.role.replace('ROLE_', '');
  const allowedRoles: string[] = route.data['roles'] ?? [];
  if (allowedRoles.includes(userRole)) {
    return true;
  }

  switch (userRole) {
    case 'OPERATOR': this.router.navigate(['/operator']); break;
    case 'ADMIN':    this.router.navigate(['/admin']);    break;
    default:         this.router.navigate(['/user']);     break;
  }
  return false;
}
}

