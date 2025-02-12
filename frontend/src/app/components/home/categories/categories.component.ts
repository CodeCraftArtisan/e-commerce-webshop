import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../types';
import { CategoryService } from '../../shop/services/category.service'; // Importation du service
import { Category } from '../../types'; // Assurez-vous d'importer le type Category

// Import Swiper styles
import 'swiper/swiper-bundle.css';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../shop/services/auth.service';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  // Array to hold all featured products
  featuredProducts: Product[] = [];

  categories: Category[] = [];

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService // Injection du service CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories; // Assignation des catégories
    });
  }

  isUserAuth(): boolean {
    return this.authService.isUserAuthenticated();
  }
}
