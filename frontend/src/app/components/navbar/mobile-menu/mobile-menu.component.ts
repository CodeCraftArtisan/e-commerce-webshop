import { Component } from '@angular/core';
import { CategoriesMenuComponent } from '../categories-menu/categories-menu.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  imports: [RouterModule, CategoriesMenuComponent],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.css',
})
export class MobileMenuComponent {}
