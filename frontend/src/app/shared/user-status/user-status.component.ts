import { Component }    from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService }  from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-status',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf, AsyncPipe],
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent {
  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
