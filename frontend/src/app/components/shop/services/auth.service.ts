import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_ENDPOINTS } from '../../constants/api_endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private apiUrlAuth = API_ENDPOINTS.auth.authenticate;
  private apiUrlRegister = API_ENDPOINTS.auth.register;

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
    console.log("get user email")
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        return payload.sub || null;
      } catch (e) {
        console.error('Error decoding token:', e);
        return null;
      }
    }
    return null;
  }
}
