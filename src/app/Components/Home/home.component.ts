import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { elementAt, take } from 'rxjs/operators';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CategoriesService } from 'src/app/Services/categories.service';
import { CommonService } from 'src/app/Services/common.service';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  products : Product[] =[];

  categories : Category[] = [];

  categoriesSubscription : Subscription | undefined;

  productsSubscription : Subscription | undefined;

  pincodeSunscription : Subscription | undefined;

  isLoading : boolean = false;

  categoriesLoaded : boolean = false;

  constructor(private viewportScroller : ViewportScroller ,  private categoryService: CategoriesService , private productsService : ProductsService,private commonService : CommonService) {

  }

  onClickScroll(elementId : string){

    this.viewportScroller.scrollToAnchor(elementId);

  }

  ngOnDestroy() {
    this.categoriesSubscription?.unsubscribe();
    this.productsSubscription?.unsubscribe();
    this.pincodeSunscription?.unsubscribe();
  }

  ngOnInit() {

    //this.toastr.success('onInit!', 'Component initialized success!', { timeOut: 3000 });
    this.initSubscriptions();

    // subscribing to a subject , so no need to put loading
    this.pincodeSunscription = this.commonService.currentPincode.subscribe(pincode =>{
      //console.log("on init pinocde : ",pincode);
      this.initSubscriptions();
    });

  }

  initSubscriptions(){
    this.isLoading = true;
    this.categoryService.getCategories().pipe(take(1)).subscribe(data =>{
      
      this.categoriesLoaded=true;

      this.categories = data;
      //console.log(this.categories);

      this.productsService.getAllPincodeProducts().pipe(take(1)).subscribe(data =>{
        this.isLoading=false;
        this.products = data;
        //console.log(this.products);
      });

    });


    this.categoriesSubscription = this.categoryService.getCategories().subscribe(data =>{

      this.categoriesLoaded=true;
      
      this.categories = data;
      //console.log(this.categories);
    });

    this.productsSubscription = this.productsService.getAllPincodeProducts().subscribe(data =>{
      this.products = data;
      //console.log(this.products);
    });

  }

  getProductsForCategoryId(id : string) : Product[] {

    return this.products.filter(product => product.getCategoryId() === id )

  }

  getProductsCountForCategoryId(id : string) : string {

    return this.products.filter(product => product.getCategoryId() === id ).length.toString();

  }

  getCategoryId(category : Category):string {

    let id = category.getCategoryId();

    return id ? id : '';

  }

}
