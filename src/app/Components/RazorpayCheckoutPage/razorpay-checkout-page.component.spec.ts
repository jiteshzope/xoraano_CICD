import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RazorpayCheckoutPageComponent } from './razorpay-checkout-page.component';

describe('RazorpayCheckoutPageComponent', () => {
  let component: RazorpayCheckoutPageComponent;
  let fixture: ComponentFixture<RazorpayCheckoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RazorpayCheckoutPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RazorpayCheckoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
