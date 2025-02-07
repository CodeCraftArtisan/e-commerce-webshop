import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFeaturedProductsComponent } from './shop-featured-products.component';

describe('ShopFeaturedProductsComponent', () => {
  let component: ShopFeaturedProductsComponent;
  let fixture: ComponentFixture<ShopFeaturedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopFeaturedProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopFeaturedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
