import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryService } from '../../shop/services/category.service';
import { Category } from '../../types'; // Ensure you have this file with the correct type definition.

@Component({
  selector: 'app-categories-menu',
  imports: [CommonModule],
  templateUrl: './categories-menu.component.html',
  styleUrl: './categories-menu.component.css',
})
export class CategoriesMenuComponent {
  categories: Category[] = []; // Hold the fetched categories here
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    // Fetch all categories when the component initializes
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
