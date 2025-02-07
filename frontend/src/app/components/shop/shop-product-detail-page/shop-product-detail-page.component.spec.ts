import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopProductDetailPageComponent } from './shop-product-detail-page.component';

describe('ShopProductDetailPageComponent', () => {
  let component: ShopProductDetailPageComponent;
  let fixture: ComponentFixture<ShopProductDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopProductDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopProductDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
