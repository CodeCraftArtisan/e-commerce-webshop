import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ShopFeaturedProductsComponent } from '../shop-featured-products/shop-featured-products.component';
import { ShopCustomersTestimonialsComponent } from '../shop-customers-testimonials/shop-customers-testimonials.component';

@Component({
    selector: 'shop-main-page',
    imports: [
        CommonModule,
        ShopCustomersTestimonialsComponent,
        ShopFeaturedProductsComponent,
    ],
    templateUrl: './shop-main-page.component.html',
    styleUrl: './shop-main-page.component.css'
})
export class ShopMainPageComponent {}
