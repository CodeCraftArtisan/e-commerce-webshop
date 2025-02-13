import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutSuccessPageComponent } from './checkout-success-page.component';

describe('CheckoutSuccessPageComponent', () => {
  let component: CheckoutSuccessPageComponent;
  let fixture: ComponentFixture<CheckoutSuccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutSuccessPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutSuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
