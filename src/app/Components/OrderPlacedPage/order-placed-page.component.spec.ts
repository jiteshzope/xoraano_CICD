import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPlacedPageComponent } from './order-placed-page.component';

describe('OrderPlacedPageComponent', () => {
  let component: OrderPlacedPageComponent;
  let fixture: ComponentFixture<OrderPlacedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPlacedPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPlacedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
