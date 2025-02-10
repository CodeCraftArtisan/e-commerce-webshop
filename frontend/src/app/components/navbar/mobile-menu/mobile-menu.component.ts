import { Component } from '@angular/core';
import { CategoriesMenuComponent } from '../categories-menu/categories-menu.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-mobile-menu',
  imports: [RouterModule, CategoriesMenuComponent, TranslateModule],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.css',
})
export class MobileMenuComponent {}
