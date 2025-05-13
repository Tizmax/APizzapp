import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL de base pour les appels vers l'API d'authentification
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  /**
   * Inscrit un nouvel utilisateur en envoyant email et mot de passe au backend.
   * @param email L'adresse e-mail de l'utilisateur.
   * @param password Le mot de passe en clair (qui sera hashé côté serveur).
   * @returns Observable<any>
   */
  register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, userData);
  }
  
  /**
   * Authentifie un utilisateur en envoyant email et mot de passe au backend.
   * @param email L'adresse e-mail de l'utilisateur.
   * @param password Le mot de passe en clair.
   * @returns Observable<any>
   */
  login(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    // On envoie une requête POST sans body, avec les paramètres dans l'URL
    return this.http.post<any>(`${this.baseUrl}/login`, null, { params });
  }
}

