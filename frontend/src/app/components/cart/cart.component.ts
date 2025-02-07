import { Component, OnInit } from '@angular/core';
import { CartService } from '../shop/services/cart.service';
import { Cart, CartItems } from '../../components/types';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shop/services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  total: number = 0;
  userEmail: string | null = null;
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
      next: (cart) => {
        this.cart = cart;
        this.calculateTotal();
      },
      error: (err) => {
        console.error('Error loading cart:', err);
        this.cart = null; // Reset cart on failure
      },
    });
  }

  // Update quantity of an item
  updateQuantity(item: CartItems, newQuantity: number): void {
    if (!this.userEmail || newQuantity <= 0) return;

    this.cartService
      .addItemToCart(this.userEmail, item.productId, newQuantity)
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
