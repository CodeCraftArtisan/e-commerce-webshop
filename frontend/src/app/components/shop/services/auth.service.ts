import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root', // No need to add it to providers manually
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrlAuth = 'https://e-commerce-webshop-render.onrender.com/api/v1/auth/authenticate';
  private apiUrlRegister = 'https://e-commerce-webshop-render.onrender.com/api/v1/auth/register';

  register(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    street: string,
    streetNumber: number,
    postalCode: number,
    city: string,
    country: string
  ): Observable<any> {
    return this.http.post<any>(this.apiUrlRegister, {
      firstname,
      lastname,
      email,
      password,
      street,
      streetNumber,
      postalCode,
      city,
      country,
    });
  }

  login(email: string, password: string): Observable<string> {
    return this.http
      .post<{ token: string }>(this.apiUrlAuth, { email, password })
      .pipe(
        map((response) => {
          if (response && response.token) {
            localStorage.setItem('authToken', response.token);
            return response.token;
          } else {
            throw new Error('No token received');
          }
        })
      );
  }

  getToken(): string | null {
    // Check if we are in the browser environment (ensure `window` is available)
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  removeToken(): void {
    // Check if we are in the browser environment (ensure `window` is available)
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('authToken');
    }
  }

  saveToken(token: string): void {
    // Check if we are in the browser environment (ensure `window` is available)
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('authToken', token);
    }
  }

  isUserAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() < payload.exp * 1000;
    } catch (e) {
      console.error('Error decoding token:', e);
      return false;
    }
  }

  getUserEmail(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        return payload.email || null;
      } catch (e) {
        console.error('Error decoding token:', e);
        return null;
      }
    }
    return null;
  }
}
