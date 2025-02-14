import { Component } from '@angular/core';
import { CategoriesMenuComponent } from '../categories-menu/categories-menu.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../shop/services/category.service';
import { Category } from '../../types'; // Ensure you have this file with the correct type definition.

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [
    RouterModule,
    CategoriesMenuComponent,
    TranslateModule,
    CommonModule,
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css'],
})
export class MobileMenuComponent {
  categories: Category[] = [];
  constructor(private categoryService: CategoryService) {}
  sidebarOpen = false;

  ngOnInit(): void {
    // Fetch all categories when the component initializes
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
