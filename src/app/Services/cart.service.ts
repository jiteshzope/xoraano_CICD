import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {

  cartItems: CartItem[] = [];

  // for emmiting the count
  cartSubject: Subject<string> = new Subject();

  constructor() {

  }

  ngOnInit() {

    this.cartItems = this.getCartItems();

    this.cartSubject.next(this.cartItems.length.toString());

  }

  getCartItems(): CartItem[] {

    let items = JSON.parse(localStorage.getItem('cartItems') || "[]");

    //console.log("getCartItems : items ", items);

    let cartItems: CartItem[] = [];
    items.forEach((item: { productName: string; image: string; quantity: string; amount: string; code: string; }) => {

      let cartItem = new CartItem(item.productName, item.image, item.quantity, item.amount, item.code);
      cartItems.push(cartItem);

    });

    return cartItems;

  }

  addToCart(cartitem: CartItem) {

    let cartItems = this.getCartItems();
    //console.log("cart items : ", cartItems);
    let cartItemsNew: CartItem[] = [];

    cartItems.forEach(item => {
      cartItemsNew.push(item);
    });

    if (cartItems.length > 0) {
      let isNewItem: boolean = true;
      cartItems.forEach(item => {

        if (item.getProductName() === cartitem.getProductName()) {
          isNewItem = false;
          let totalAmt = +item.getAmount() + +cartitem.getAmount();
          let totalQty = +item.getQuantity() + +cartitem.getQuantity();

          //console.log("totalAmt : ", totalAmt, "totalQty : ", totalQty);

          let newCartItem = new CartItem(cartitem.getProductName(), cartitem.getImage(), totalQty.toString(), totalAmt.toString(), cartitem.getCode());
          newCartItem.setAmount(totalAmt.toString());
          newCartItem.setQuantity(totalQty.toString());

          //console.log("newCartItem : ", newCartItem);

          let index = cartItemsNew.indexOf(item);

          //console.log("index : ", index);

          cartItemsNew.splice(index, 1);

          //console.log("pushing an item with quantity increased , newCartItem : ", newCartItem);

          cartItemsNew.push(newCartItem);

        }

      });

      if (isNewItem === true) {
        //console.log("pushing new item to cart :", cartitem);
        cartItemsNew.push(cartitem);
      }

    } else {
      //console.log("pushing first ever item to the cart : ", cartitem);
      cartItemsNew.push(cartitem);
    }

    //console.log("cart service adding to local storage :", cartItemsNew)
    localStorage.setItem('cartItems', JSON.stringify(cartItemsNew));


    this.cartSubject.next(cartItemsNew.length.toString());

  }

  getItemsCount() {
    let items = JSON.parse(localStorage.getItem('cartItems') || "[]");
    return items.length.toString();
  }

  getTotalAmount(): string {

    this.cartItems = this.getCartItems();

    let totalAmt = 0;

    this.cartItems.forEach(item => {

      totalAmt += +item.getAmount();

    })

    return totalAmt.toString();

  }

  clearCart() {
    localStorage.removeItem("cartItems");
    this.cartItems = [];
    this.cartSubject.next('0');
    //console.log("cart cleared")
  }

  increment(item: CartItem) {

    let cartItems = this.getCartItems();

    let newCartItems: CartItem[] = [];

    cartItems.forEach(item1 => {
      newCartItems.push(item1);
    });

    cartItems.forEach(cartItem => {

      if (cartItem.getProductName() === item.getProductName()) {

        let unitPrice = +item.getAmount()/+item.getQuantity();

        let totalAmt = +item.getAmount() + unitPrice;
        let totalQty = +item.getQuantity() + 1;

        //console.log("totalAmt : ", totalAmt, "totalQty : ", totalQty);

        let newCartItem = new CartItem(item.getProductName(), item.getImage(), totalQty.toString(), totalAmt.toString(), item.getCode());

        let index = newCartItems.indexOf(cartItem);
        newCartItems.splice(index, 1);
        newCartItems.push(newCartItem);

      }

    });

    //console.log("cart service adding to local storage :", newCartItems)
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));

  }

  decrement(item: CartItem) {

    let cartItems = this.getCartItems();

    let newCartItems: CartItem[] = [];

    cartItems.forEach(item1 => {
      newCartItems.push(item1);
    });

    cartItems.forEach(cartItem => {

      if (cartItem.getProductName() === item.getProductName()) {

        let unitPrice = +item.getAmount()/+item.getQuantity();

        let totalAmt = +item.getAmount() - unitPrice;
        let totalQty = +item.getQuantity() - 1;

        //console.log("totalAmt : ", totalAmt, "totalQty : ", totalQty);

        let newCartItem = new CartItem(item.getProductName(), item.getImage(), totalQty.toString(), totalAmt.toString(), item.getCode());

        let index = newCartItems.indexOf(cartItem);
        newCartItems.splice(index, 1);

        if(+item.getQuantity() != 1){
          newCartItems.push(newCartItem);
        }
        

      }

    });

    //console.log("cart service adding to local storage :", newCartItems)
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));

  }

}
