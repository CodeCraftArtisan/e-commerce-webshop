import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ReviewService } from '../services/review.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { Product } from '../../types';
import { CommonModule } from '@angular/common';
import { RatingComponent } from '../../rating/rating.component';
import { QuantitySelectorComponent } from '../quantity-selector/quantity-selector.component';

@Component({
  selector: 'app-shop-product-detail-page',
  standalone: true,
  imports: [CommonModule, RatingComponent, QuantitySelectorComponent],
  templateUrl: './shop-product-detail-page.component.html',
  styleUrls: ['./shop-product-detail-page.component.css'],
})
export class ShopProductDetailPageComponent implements OnInit {
  productId: string | null = null;
  product: Product | undefined;
  currentImageIndex: number = 0;
  initialQuantity = 1; // Default quantity to 1
  userEmail: string | null = null;
  isAuthenticated: boolean = false;
  isLoading: boolean = false; // New state to track loading for addToCart

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private reviewService: ReviewService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch the logged-in user's email directly
    const email = this.authService.getUserEmail();
    if (this.authService.isUserAuthenticated()) {
      console.log("shop prod detail page init ")
      console.log("User email: " + this.authService.getUserEmail())
      this.userEmail = email;
      this.isAuthenticated = true;
    } else {
      console.warn('User is not authenticated or details are unavailable.');
      this.isAuthenticated = false;
    }

    // Fetch product ID from the route
    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      // Retrieve product data using the ProductService
      this.productService.getProductById(this.productId).subscribe({
        next: (data) => {
          this.product = data;

          // Handle missing image URLs by providing a default image
          if (
            this.product &&
            (!this.product.imageUrls || this.product.imageUrls.length === 0)
          ) {
            this.product.imageUrls = [
              `https://via.placeholder.com/600x400?text=${encodeURIComponent(
                this.product.name || 'No Image'
              )}`,
            ];
          }
        },
        error: (err: any) => {
          console.error('Error fetching product:', err);
        },
      });
    }
  }

  /**
   * Navigate to the previous image in the product's image carousel.
   */
  prevImage(): void {
    if (this.product?.imageUrls?.length) {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.product.imageUrls.length) %
        this.product.imageUrls.length;
    }
  }

  /**
   * Add the current product to the cart.
   */
  addToCart(): void {
    if (!this.product || !this.product.id) {
      alert('Product details are missing.');
      return;
    }

    if (!this.isAuthenticated) {
      alert('You must be logged in to add items to the cart.');
      return;
    }

    const quantity = this.initialQuantity;

    if (quantity <= 0) {
      alert('Quantity must be greater than 0.');
      return;
    }

    this.isLoading = true; // Set loading state
    this.cartService
      .addItemToCart(this.userEmail!, this.product.id, quantity)
      .subscribe({
        next: (updatedCart) => {
          this.isLoading = false; // Reset loading state
          console.log('Product added to cart:', updatedCart);
          alert('Product successfully added to the cart!');
        },
        error: (err: any) => {
          this.isLoading = false; // Reset loading state
          console.error('Error adding product to cart:', err);
          alert(
            'Failed to add the product to the cart. Please try again later.'
          );
        },
      });
  }

  /**
   * Navigate to the next image in the product's image carousel.
   */
  nextImage(): void {
    if (this.product?.imageUrls?.length) {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.product.imageUrls.length;
    }
  }

  /**
   * Handle rating change and save it using ReviewService.
   * @param newRating
   */
  onRatingChange(newRating: number): void {
    if (this.product && this.isAuthenticated) {
      const review = {
        productId: this.product.id,
        userEmail: this.userEmail!,
        rating: newRating,
      };

      this.reviewService.createReview(review).subscribe({
        next: (response) => {
          console.log('Review submitted successfully:', response);
        },
        error: (err: any) => {
          console.error('Error submitting review:', err);
        },
      });
    } else {
      alert('You must be logged in to submit a review.');
    }
  }

  /**
   * Handle quantity change from the QuantitySelectorComponent.
   * @param newQuantity
   */
  onQuantityChange(newQuantity: number): void {
    if (newQuantity > 0) {
      this.initialQuantity = newQuantity; // Update the initial quantity with the selected value
    } else {
      console.warn('Invalid quantity selected:', newQuantity);
    }
  }

  isUserAuth(): boolean {
    return this.authService.isUserAuthenticated();
  }
}
