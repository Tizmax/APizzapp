import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  loginForm: FormGroup;
  email = '';
  password = '';
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }
  goToMenu() {
    this.router.navigateByUrl('/menu', { skipLocationChange: false });
  }

  onLogin(): void {
    const { email, password } = this.loginForm.value;
    this.error = null; 
    this.authService.login(email!, password!).subscribe({
      next: (user: { role: string; }) => {
        console.log('Logged in user payload:', user);
        const role = user.role.replace('ROLE_', '');  
        this.router.navigate(['/dashboards', role.toLowerCase()]);  
      },
      error: () => {
        this.error = 'Email ou mot de passe incorrect';
      }
    });
  }

  showPassword = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}