import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPageComponentComponent } from './category-page-component.component';

describe('CategoryPageComponentComponent', () => {
  let component: CategoryPageComponentComponent;
  let fixture: ComponentFixture<CategoryPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryPageComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
