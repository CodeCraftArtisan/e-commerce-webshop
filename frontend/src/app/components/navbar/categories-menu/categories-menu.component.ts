import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryService } from '../../shop/services/category.service';
import { Category } from '../../types'; // Ensure you have this file with the correct type definition.
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-categories-menu',
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './categories-menu.component.html',
  styleUrl: './categories-menu.component.css',
})
export class CategoriesMenuComponent {
  categories: Category[] = [];
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    // Fetch all categories when the component initializes
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
