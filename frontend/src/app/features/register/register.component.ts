import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.http.post('/api/auth/register', this.registerForm.value).subscribe({
        next: () => {
          this.message = 'Compte créé avec succès !';
          this.router.navigate(['/']); // redirection vers la page de connexion
        },
        error: err => {
          this.message = 'Erreur lors de la création du compte.';
          console.error(err);
        }
      });
    }
  }
}
