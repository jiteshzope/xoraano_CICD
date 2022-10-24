import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProductT } from '../Interface_models/ProductT';
import { Product } from '../models/Product';

import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnInit{

  //productsRefForCategoryId: AngularFireList<any> ;
  allPincodeProductsRef: AngularFireList<any> ;

  items: Observable<any[]> | null = null;

  allPincodeProducts = new BehaviorSubject<Product[] | null>(null);

  constructor(private db: AngularFireDatabase, private commonService: CommonService) {

    //this.productsRefForCategoryId = this.db.list('/Products', ref => ref.orderByChild('categoryId').equalTo(commonService.getCurrentCategoryId()));

    this.allPincodeProductsRef = this.db.list('/Products', ref => ref.orderByChild('pincode').equalTo(commonService.getCurrentPincode()));

  }

  ngOnInit() {

    this.commonService.currentPincode.pipe(
      switchMap(pincode => {
        this.allPincodeProductsRef = this.db.list('/Products', ref => ref.orderByChild('pincode').equalTo(pincode));
        this.items = this.allPincodeProductsRef.snapshotChanges();
        
        return this.items;
      }),
      map((changes) => {
        return changes.map((c) => {
          let data: ProductT = c.payload.val();
          let product = new Product();
          product.setProductId(c.payload.key);
          product.setProductName(data.productName);
          product.setProductPrice(data.productPrice);
          product.setImages(data.images);
          product.setIsAvailable(data.isAvailable);
          product.setProductDeliveryTime(data.productDeliveryTime);
          product.setCategoryId(data.categoryId);
          product.setCategoryName_pincode(data.categoryName_pincode);
          product.setProductDeliveryTime(data.productDeliveryTime);

          return product;
          
        })
      })
    ).subscribe((products : Product[]) =>{

      this.allPincodeProducts.next(products);
      
    });
    
  }

  /*
  getProductsForSelectedCategory(): Observable<Product[]> | null {

    return this.commonService.currentCategoryId.pipe(
      switchMap(id => {
        this.productsRefForCategoryId = this.db.list('/Products', ref => ref.orderByChild('categoryId').equalTo(id));
        this.items = this.productsRefForCategoryId.snapshotChanges();
        
        return this.items;
      }),
      map((changes) => {
        return changes.map((c) => {
          
          let data: ProductT = c.payload.val();
          let product = new Product();
          product.setProductId(c.payload.key);
          product.setProductName(data.productName);
          product.setProductPrice(data.productPrice);
          product.setImages(data.images);
          product.setIsAvailable(data.isAvailable);
          product.setProductDeliveryTime(data.productDeliveryTime);
          product.setCategoryId(data.categoryId);
          product.setCategoryName_pincode(data.categoryName_pincode);
          product.setProductDeliveryTime(data.productDeliveryTime);

          return product;
          
        })
      })
    ); 

  }
  */

  
  getAllPincodeProducts(): Observable<Product[]> {

    this.allPincodeProductsRef = this.db.list('/Products', ref => ref.orderByChild('pincode').equalTo(this.commonService.getCurrentPincode()));

    this.items = this.allPincodeProductsRef.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => {
          
          let data: ProductT = c.payload.val();
          let product = new Product();
          let id = c.payload.key;
          product.setProductId(id?id:'');
          product.setProductName(data.productName);
          product.setProductPrice(data.productPrice);
          product.setImages(data.images);
          product.setIsAvailable(data.isAvailable);
          product.setProductDeliveryTime(data.productDeliveryTime);
          product.setCategoryId(data.categoryId);
          product.setCategoryName_pincode(data.categoryName_pincode);
          product.setProductDeliveryTime(data.productDeliveryTime);
          product.setCode(data.code);

          return product;
          
        })
      })
    );

    return this.items;

  }

}
