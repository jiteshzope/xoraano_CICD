import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/CartItem';
import { CartService } from 'src/app/Services/cart.service';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartItems : CartItem[] = [];

  cartItemsCount : number = 0;

  faArrowCircleRight = faArrowCircleRight;
  faArrowCircleLeft = faArrowCircleLeft;

  constructor(private cartService: CartService) { 

  }

  ngOnInit() {
    this.fetchCartItems();
  }

  fetchCartItems(){
    this.cartItems = this.cartService.getCartItems();

    this.cartItemsCount = this.cartItems.length;

    //console.log("cart items :", this.cartItems);
    //console.log("cart items count : ",this.cartItemsCount);
  }

  getTotalAmount() {

    return this.cartService.getTotalAmount();

  }

  clearCart(){
    this.cartService.clearCart();
    this.cartItems = [];
    this.cartItemsCount = 0;
  }

  increment(item : CartItem){

    this.cartService.increment(item);
    this.fetchCartItems();

  }

  decrement(item : CartItem){

    this.cartService.decrement(item);
    this.fetchCartItems();

  }

}
