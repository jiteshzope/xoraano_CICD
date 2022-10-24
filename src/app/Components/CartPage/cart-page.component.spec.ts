import { DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { AppModule } from "src/app/app.module";
import { CartItem } from "src/app/models/CartItem";
import { CartService } from "src/app/Services/cart.service";
import { CartPageComponent } from "./cart-page.component"

class CartServiceStub{

  // cartItems = [
  //   new CartItem('Chicken curry','dummy-img-url','3','600','2'),
  //   new CartItem('Chicken Biryani','dummy-img-url','2','300','3')
  // ]

  constructor(){

  }

  cartItems : CartItem[] = [];

  getCartItems(){
    return this.cartItems;
  }

  getTotalAmount(){
    return this.cartItems.reduce((totalAmt, item)=>{
      return totalAmt + (+item.getAmount());
    },0)
  }

  clearCart(){
    this.cartItems = [];
  }

  decrement(item1 : CartItem){
    let unitPrice = +item1.getAmount()/ +item1.getQuantity();

    let totalAmt = +item1.getAmount() - unitPrice;
    let totalQty = +item1.getQuantity() - 1;

    item1.amount = totalAmt+'';
    item1.quantity = totalQty+''

    let index = this.cartItems.findIndex(item => item.productName === item1.productName);

    this.cartItems.splice(index,1,item1)

  }

  increment(item1 : CartItem){
    let unitPrice = +item1.getAmount()/ +item1.getQuantity();

    let totalAmt = +item1.getAmount() + unitPrice;
    let totalQty = +item1.getQuantity() + 1;

    item1.amount = totalAmt+'';
    item1.quantity = totalQty+''

    let index = this.cartItems.findIndex(item => item.productName === item1.productName);

    this.cartItems.splice(index,1,item1)
  }

}

describe("CartPageComponent",()=>{

  let fixture : ComponentFixture<CartPageComponent>
  let component : CartPageComponent;
  let el : DebugElement;

  let cartService : any;

  beforeEach(waitForAsync(()=>{
    const cartServiceStub = new CartServiceStub();

    TestBed.configureTestingModule({
      imports : [AppModule],
      providers : [
        {provide : CartService, useValue : cartServiceStub}
      ]
    }).compileComponents().then(()=>{
      fixture = TestBed.createComponent(CartPageComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      cartService = TestBed.inject(CartService);
    });

  }))


  fit('should create the component',()=>{
    expect(component).toBeTruthy();
  })


  fit('should add the cart items in the dom and display correct menu names and total amount',()=>{

    cartService.cartItems = [
      new CartItem('Chicken curry','dummy-img-url','3','500','2'),
      new CartItem('Chicken Biryani','dummy-img-url','2','300','3')
    ]
    component.fetchCartItems();
    fixture.detectChanges();
    const rows  = el.queryAll(By.css('tr'));
    const firstRowItemMenuName = rows[1].query(By.css('td:nth-child(2)')).nativeElement.textContent;
    //flush();
    const totalAmount = el.query(By.css('tfoot th:last-child')).nativeElement.textContent;
    expect(rows.length).toEqual(4);
    expect(firstRowItemMenuName).toContain('Chicken curry')
    expect(totalAmount).toContain('800');
    

  });

  fit('should display empty cart text when zero items',()=>{
    cartService.cartItems = [];
    component.fetchCartItems();
    fixture.detectChanges();
    const textEl = el.query(By.css('p'));
    expect(textEl.nativeElement.textContent.trim()).toBe('Your cart is Empty !!')
  });

  fit("should increment the count of first item and total order amount on the increment button click on the item",()=>{
    cartService.cartItems = [
      new CartItem('Chicken curry','dummy-img-url','3','600','232'),
      new CartItem('Chicken Biryani','dummy-img-url','2','300','323')
    ]
    component.fetchCartItems();
    fixture.detectChanges();

    const incrementBtns = el.queryAll(By.css('.incrementBtn'));
    incrementBtns[0].triggerEventHandler('click',{button : 0});
    fixture.detectChanges();

    let rows  = el.queryAll(By.css('tr'));
    let firstRowItemMenuQty = rows[1].query(By.css('.Itemqty')).nativeElement.textContent;
    let totalAmount = el.query(By.css('tfoot th:last-child')).nativeElement.textContent;

    expect(firstRowItemMenuQty).toContain('4')
    expect(totalAmount).toContain('1,100');

    incrementBtns[0].triggerEventHandler('click',{button : 0});
    fixture.detectChanges();
    totalAmount = el.query(By.css('tfoot th:last-child')).nativeElement.textContent;
    expect(totalAmount).toContain('1,300');
  })


})