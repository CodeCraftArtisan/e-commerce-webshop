import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '../../types';
import { ProductService } from '../services/product.service';
import { ReviewService } from '../services/review.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'shop-featured-products',
    imports: [CommonModule, RouterModule, TranslateModule],
    templateUrl: './shop-featured-products.component.html',
    styleUrl: './shop-featured-products.component.css'
})
export class ShopFeaturedProductsComponent implements OnInit {
  featuredProducts: Product[] = [];
  paginatedFeaturedProducts: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number = 1;
  pages: number[] = [];

  constructor(private productService: ProductService, private reviewServide: ReviewService) {}

  /**
   * Angular lifecycle hook that gets called after the component is initialized.
   * It triggers the loading of featured products.
   */
  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  test(){
    this.reviewServide.test
  }

  /**
   * Fetches all products from the ProductService.
   * Maps product data to include placeholder images for products without images.
   * Calculates total pages and initializes pagination.
   */
  loadFeaturedProducts(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.featuredProducts = products.map((product) => ({
        ...product,
        imageUrls:
          product.imageUrls.length > 0
            ? product.imageUrls
            : ['https://via.placeholder.com/100?text=No+Image'],
      }));

      // Calculate total pages based on the number of products and the page size
      this.totalPages = Math.ceil(this.featuredProducts.length / this.pageSize);
      // Generate an array of page numbers for navigation
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      // Update the products displayed on the current page
      this.updatePaginatedFeaturedProducts();
    });
  }

  /**
   * Updates the products displayed on the current page
   * by slicing the array of all products based on the current page and page size.
   */
  updatePaginatedFeaturedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedFeaturedProducts = this.featuredProducts.slice(
      startIndex,
      endIndex
    );
  }

  /**
   * Changes the current page to the specified page number.
   * Ensures the page number is within valid range.
   * Updates the displayed products after changing the page.
   *
   * @param page The page number to navigate to.
   */
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePaginatedFeaturedProducts();
  }

  /**
   * Handles the "Buy Now" button click event.
   * Logs the product ID to the console for debugging or further implementation.
   *
   * @param productId The ID of the product being purchased.
   */
  onBuyNow(productId: string): void {
    console.log(`Buy Now clicked for product ID: ${productId}`);
    // Logic for adding to cart or navigating to product details can be added here
  }
}
