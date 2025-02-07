import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCustomersTestimonialsComponent } from './shop-customers-testimonials.component';

describe('ShopCustomersTestimonialsComponent', () => {
  let component: ShopCustomersTestimonialsComponent;
  let fixture: ComponentFixture<ShopCustomersTestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCustomersTestimonialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCustomersTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
