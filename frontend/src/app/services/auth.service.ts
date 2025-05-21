import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from  '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  private _currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this._currentUser.asObservable();

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('currentUser');
      if (saved) {
        this._currentUser.next(JSON.parse(saved));
      }
    }
  }

  public get currentUserValue(): User | null {
    return this._currentUser.value;
  }

  register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/register`,
      userData
    );
  }

  login(email: string, password: string): Observable<User> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http
      .post<User>(`${this.baseUrl}/login`, null, { params })
      .pipe(
        tap((user: any) => {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          this._currentUser.next(user);
        })
      );
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('currentUser');
    }
    this._currentUser.next(null);

    if (typeof window !== 'undefined' && window.location) {
      window.location.reload();
    }
  }

  get isLoggedIn(): boolean {
    return !!this._currentUser.value;
  }
} 