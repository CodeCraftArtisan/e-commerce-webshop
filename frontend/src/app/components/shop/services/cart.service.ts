import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../../types';
import { API_ENDPOINTS } from '../../constants/api_endpoints';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  // Get a cart by user email
  getCartByUserEmail(email: string): Observable<Cart> {
    return this.http.get<Cart>(API_ENDPOINTS.carts.getByUserEmail(email));
  }

  // Add an item to the cart
  addItemToCart(
    email: string,
    productId: string,
    quantity: number
  ): Observable<Cart> {
    const body = { productId, quantity };
    return this.http.post<Cart>(API_ENDPOINTS.carts.addItem(email), body);
  }

  // Remove an item from the cart
  removeItemFromCart(email: string, productId: string): Observable<Cart> {
    return this.http.delete<Cart>(
      API_ENDPOINTS.carts.removeItem(email, productId)
    );
  }

  // Clear the entire cart for a user
  clearCart(email: string): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.carts.clearCart(email));
  }
}
