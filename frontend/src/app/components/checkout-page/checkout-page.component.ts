import { Component, OnInit } from '@angular/core';
import { Address, Cart } from '../types';
import { CartService } from '../shop/services/cart.service';
import { AuthService } from '../shop/services/auth.service';
import { AddressService } from '../shop/services/address.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'checkout-page',
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent implements OnInit {
  cart: Cart | null = null;
  userEmail: string | null = null;
  isCartLoading: boolean = false;
  isAddressLoading: boolean = false;
  address: Address | null = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private addressService: AddressService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();

    if (!this.userEmail) {
      console.warn('User is not logged in. Redirecting to home...');
      return;
    }

    this.loadCart();
    this.loadAddress();
  }

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

  loadAddress(): void {
    if (!this.userEmail) return;

    this.addressService.getAddressByUserEmail(this.userEmail).subscribe({
      next: (addressData) => {
        console.log('address: ' + addressData);
        this.address = addressData;
        this.isAddressLoading = true;
      },
      error: (error) => {
        console.error('Error fetching address:', error);
        console.error('Failed to load the cart. Please try again.');
        this.isAddressLoading = false;
      },
    });
  }

  onPlaceOrder(): void {
    if (!this.userEmail) return;
  
    console.log("Clearing cart...");
    
    this.cartService.clearCart(this.userEmail).subscribe({
      next: () => {
        console.log("Cart cleared successfully");
        this.router.navigate(['/checkout-success']);
      },
      error: (err) => {
        console.error("Failed to clear cart:", err);
      }
    });
  }
}
