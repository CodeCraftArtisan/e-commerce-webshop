import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service'; // Import the CategoryService
import { Category } from '../../types'; // Import Category type
import { Product } from '../../types';

@Component({
    selector: 'app-category-page-component',
    imports: [CommonModule, RouterModule],
    templateUrl: './category-page-component.component.html',
    styleUrls: ['./category-page-component.component.css']
})
export class CategoryPageComponentComponent implements OnInit {
  products: Product[] = [];
  categoryId: string = '';
  category: Category | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService // Inject CategoryService
  ) {}

  ngOnInit(): void {
    // Get the categoryId from the route
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('categoryId') || '';
      if (this.categoryId) {
        this.loadProductsByCategoryId();
        this.loadCategoryDetails();
      }
    });
  }

  loadProductsByCategoryId(): void {
    this.productService
      .getProductsByCategoryId(this.categoryId)
      .subscribe((products) => {
        this.products = products;
      });
  }

  loadCategoryDetails(): void {
    this.categoryService
      .getCategoryById(this.categoryId)
      .subscribe((category) => {
        this.category = category; // Store the category details
      });
  }
}
