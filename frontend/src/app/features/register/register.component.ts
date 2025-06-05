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
        next: () => {
        this.message = 'Inscription réussie !';
        this.router.navigateByUrl('/landing');
      },
        error: () => this.message = "Erreur lors de la création du compte : l'adresse mail est déjà utilisée.",
      });
  }
}