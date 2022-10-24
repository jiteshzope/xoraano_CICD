import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CategoryT } from '../Interface_models/CategoryT';
import { Category } from '../models/Category';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements OnInit{

  itemsRef: AngularFireList<any> ;
  items: Observable<any[]> | null = null;

  pincodeCategories = new BehaviorSubject<Category[] | null>(null);

  constructor(private db: AngularFireDatabase, private commonService: CommonService) {

    this.itemsRef = this.db.list('/Categories', ref => ref.orderByChild('pincode').equalTo(commonService.getCurrentPincode()));

  }

  ngOnInit() {

    this.commonService.currentPincode.pipe(
      switchMap(pincode => {
        this.itemsRef = this.db.list('/Categories', ref => ref.orderByChild('pincode').equalTo(pincode));
        this.items = this.itemsRef.snapshotChanges();
        
        return this.items;
      }),
      map((changes) => {
        return changes.map((c) => {
          //return ({ categoryId: c.payload.key, ...c.payload.val() })) 
          let data: CategoryT = c.payload.val();
          let category = new Category();
          category.setCategoryId(c.payload.key);
          category.setCode(data.code);
          category.setImage(data.image);
          category.setIsAvailable(data.isAvailable);
          category.setName(data.name);
          category.setPincode(data.pincode);

          return category;
          
        })
      })
    ).subscribe((categories : Category[]) =>{
      this.pincodeCategories.next(categories)
    });
    
  }

  
  getCategories(): Observable<Category[]>  {

    this.itemsRef = this.db.list('/Categories', ref => ref.orderByChild('pincode').equalTo(this.commonService.getCurrentPincode()));

    this.items =  this.itemsRef.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => {
          //return ({ categoryId: c.payload.key, ...c.payload.val() })) 
          let data: CategoryT = c.payload.val();
          let category = new Category();
          let id = c.payload.key;
          category.setCategoryId(id?id:'');
          category.setCode(data.code);
          category.setImage(data.image);
          category.setIsAvailable(data.isAvailable);
          category.setName(data.name);
          category.setPincode(data.pincode);

          return category;
          
        })
      })
    );

    return this.items;

  }
  

}
