import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/CartItem';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input('item') item: Product | undefined;

  product: Product;

  cartItem: CartItem;

  constructor(private cartService: CartService, private toastr: ToastrService) {
    this.product = this.item ? this.item : new Product();
    this.cartItem = new CartItem(this.product.getProductName(), this.product.getImages()[0], '0', '0', this.product.getCode());

  }

  ngOnInit() {
    this.product = this.item ? this.item : new Product();
    this.cartItem = new CartItem(this.product.getProductName(), this.product.getImages()[0], '0', '0', this.product.getCode());
  }

  incrementQty() {
    if (+this.cartItem.getQuantity() < 20) {
      this.cartItem.setQuantity((+this.cartItem.getQuantity() + 1).toString())
      let amount = +this.product.getProductPrice() * +this.cartItem.getQuantity();
      this.cartItem.setAmount(amount.toString());
    } else {
      //console.log("quantity is 20 already, cannot be incremented");
    }

  }

  decrementQty() {
    if (+this.cartItem.getQuantity() != 0) {
      this.cartItem.setQuantity((+this.cartItem.getQuantity() - 1).toString());
      let amount = +this.product.getProductPrice() * +this.cartItem.getQuantity();
      this.cartItem.setAmount(amount.toString());
    } else {
      //console.log("quantity is zero already, cannot be decremented");
    }

  }

  addToCart() {

    //console.log("adding to cart , cart item is", this.cartItem);
    if(this.product.getIsAvailable()==='yes'){
      if(+this.cartItem.getQuantity() > 0){
      this.cartService.addToCart(this.cartItem);
      this.toastr.success(' ', this.cartItem.getQuantity() + ' ' + this.cartItem.getProductName() + ' has been added to cart', { timeOut: 3000 });
      this.cartItem = new CartItem(this.product.getProductName(), this.product.getImages()[0], '0', '0', this.product.getCode());
      }else{
        this.toastr.error('',"Please increase the quantity");
      }

    }else{
      this.toastr.error('','This item is out of stock!');
    }
  }

  getAmount() {
    if (+this.cartItem.getQuantity() === 0) {
      return this.product.getProductPrice();
    } else {
      return this.cartItem.getAmount();
    }

  }

  getSplits(text: string): string[] {

    let string1: string;
    let string2: string;

    if (text.length <= 20) {
      string1 = text.slice(0, text.length);
      ////console.log("string1 : " + string1);
      return [string1];
    }


    if (text.length > 20) {
      string1 = text.slice(0, 20);
      string2 = text.slice(20, text.length);
      ////console.log("string1 : ", string1, ' & string2 : ', string2)
      return [string1, string2];
    }

    return [text];

    /*
    let split = text.split('');
    
    split.forEach((c,i) =>{

      if(i ===20 || i===40){
        split.splice(i+1,0,'<br>');
      }

    });

    let joined = split.join().replace(/,/g, "");

    //console.log("joined : ",joined)

    return joined;
    */
    

  }

}
