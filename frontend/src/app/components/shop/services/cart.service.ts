import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/carts';

  constructor(private http: HttpClient) {}

  getCartByUserEmail(email: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/${email}`);
  }

  addItemToCart(
    email: string,
    productId: string,
    quantity: number
  ): Observable<Cart> {
    const params = { productId, quantity: quantity.toString() };
    return this.http.post<Cart>(`${this.apiUrl}/${email}/items`, null, {
      params,
    });
  }

  removeItemFromCart(email: string, productId: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/${email}/items/${productId}`);
  }

  clearCart(email: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${email}`);
  }
}
