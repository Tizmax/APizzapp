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
export class LandingComponent implements OnInit {
  pizzas = [
    { name: 'AI_Pizza', imgUrl: 'images/pizzas/ai_pizza.webp' },
    { name: 'Reine', imgUrl: 'images/pizzas/reine.png' },
    { name: 'Pepperoni', imgUrl: 'images/pizzas/pepperoni.png' },
    { name: 'Cheese', imgUrl: 'images/pizzas/cheese.png' },
    { name: 'Poivron', imgUrl: 'images/pizzas/poivron.png' },
    { name: 'Olive', imgUrl: 'images/pizzas/olive.png' },
  ];

  duplicatedPizzas: Array<any> = [];
  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }
  goToMenu() {
    this.router.navigateByUrl('/menu', { skipLocationChange: false });
  }

  ngOnInit(): void {
    const duplications = 10;
    for (let i = 0; i < duplications; i++) {
      this.duplicatedPizzas = this.duplicatedPizzas.concat(this.pizzas);
    }
  }

  onLogin(): void {
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: (user) => {
        if (user.role === 'ADMIN') this.router.navigate(['/admin']);
        else if (user.role === 'OPERATOR') this.router.navigate(['/operator']);
        else this.router.navigate(['/guest']);
      },
      error: () => this.error = 'Email invalide ou mot de passe incorrect'
    });
  }
}
