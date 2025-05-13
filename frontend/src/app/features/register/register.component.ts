import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  pizzas = [
    { name: 'AI_Pizza', imgUrl: 'images/pizzas/ai_pizza.webp' },
    { name: 'Reine', imgUrl: 'images/pizzas/reine.png' },
    { name: 'Pepperoni', imgUrl: 'images/pizzas/pepperoni.png' },
    { name: 'Cheese', imgUrl: 'images/pizzas/cheese.png' },
    { name: 'Poivron', imgUrl: 'images/pizzas/poivron.png' },
    { name: 'Olive', imgUrl: 'images/pizzas/olive.png' },
  ];

  duplicatedPizzas: Array<any> = [];
  ngOnInit(): void {
    const duplications = 10;
    for (let i = 0; i < duplications; i++) {
      this.duplicatedPizzas = this.duplicatedPizzas.concat(this.pizzas);
    }
  }

  // Formulaire d'inscription
  registerForm: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    
  }

  onRegister() {
      const userData = this.registerForm.value;
      this.authService.register(userData).subscribe({
        next: () => this.message = "Inscription réussie !",
        error: (err: any) => this.message = "Erreur : " + err.error
      });
  }
}
