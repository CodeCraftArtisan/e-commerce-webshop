import { Component, OnInit } from '@angular/core';
import { CartService } from '../shop/services/cart.service';
import { Cart, CartItems } from '../../components/types';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shop/services/auth.service';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  total: number = 0;
  userEmail: string | null = null;
  isCartLoading: boolean = false;
  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();

    if (!this.userEmail) {
      console.warn('User is not logged in. Redirecting to home...');
      return;
    }

    this.loadCart();
  }

  // Fetch the user's cart
  loadCart(): void {
    if (!this.userEmail) return;

    this.cartService.getCartByUserEmail(this.userEmail).subscribe({
      next: (cartData) => {
        this.cart = cartData;
        this.isCartLoading = false;
      },
      error: (error) => {
        console.error('Error fetching cart:', error);
        console.error('Failed to load the cart. Please try again.');
        this.isCartLoading = false;
      },
    });
  }

  increaseQuantity(item: CartItems){
    if (!this.userEmail) return;

    this.cartService
      .modifyCartItem(this.userEmail, item.productId, item.quantity + 1)
      .subscribe({
        next: () => {
          this.loadCart();
        },
        error: (err) => {
          console.error('Error updating quantity:', err);
        },
      });
  }

  decreaseQuantity(item: CartItems){
    if (!this.userEmail) return;

    this.cartService
      .modifyCartItem(this.userEmail, item.productId, item.quantity - 1)
      .subscribe({
        next: () => {
          this.loadCart();
        },
        error: (err) => {
          console.error('Error updating quantity:', err);
        },
      });
  }

  // Remove an item from the cart
  removeItem(item: CartItems): void {
    if (!this.userEmail) return;

    this.cartService
      .removeItemFromCart(this.userEmail, item.productId)
      .subscribe({
        next: () => {
          this.loadCart();
        },
        error: (err) => {
          console.error('Error removing item:', err);
        },
      });
  }

  // Calculate total price
  calculateTotal(): void {
    this.total =
      this.cart?.items?.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ) || 0;
  }
}
