import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { API_ENDPOINTS } from '../../constants/api_endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private apiUrlAuth = API_ENDPOINTS.auth.authenticate;
  private apiUrlRegister = API_ENDPOINTS.auth.register;

  // Define BehaviorSubject to track user authentication status
  private authSubject = new BehaviorSubject<boolean>(
    this.isUserAuthenticated()
  );
  public authStatus$ = this.authSubject.asObservable(); // Expose this observable to other components

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
            this.authSubject.next(true);
            return response.token;
          } else {
            throw new Error('No token received');
          }
        })
      );
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  removeToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('authToken');
      this.authSubject.next(false);
    }
  }

  saveToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('authToken', token);
      this.authSubject.next(true);
    }
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= payload.exp * 1000; // If current time is greater than expiry, return true
    } catch (e) {
      console.error('Error decoding token:', e);
      return true; // If decoding fails, treat as expired
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
    console.log('get user email');
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
