import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireObject, AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';
import { OrderRequestT } from '../Interface_models/OrderRequestT';
import { OrderRequest } from '../models/OrderRequest';


@Injectable({
  providedIn: 'root'
})
export class OrdersService implements OnInit {

  orderRequestRef: AngularFireObject<any> | null = null;
  orderRequestsRef: AngularFireList<any> | null = null;

  items: Observable<OrderRequestT[]> | undefined = undefined;

  //myOrders = new BehaviorSubject<OrderRequestT[] | null>(null);

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {

  }

  ngOnInit() {
  }

  saveOrder(orderRequest: OrderRequest): Promise<void> {

    this.orderRequestRef = this.db.object('OrderRequests/' + orderRequest.timestamp);

    return this.orderRequestRef.set(orderRequest);

  }

  updateOrder(timestampId : string, data : any) : Promise<void>{

    this.orderRequestRef = this.db.object('OrderRequests/' + timestampId);

    return this.orderRequestRef.update(data);

  }

  getMyOrders(): Observable<OrderRequestT[]> | null {

    return this.auth.user.pipe(
      switchMap(user => {

        let phone = !!(user?.phoneNumber) ? (user?.phoneNumber) : null;
        this.orderRequestsRef = this.db.list('/OrderRequests', ref => ref.orderByChild('phone').equalTo(phone));
        this.items = this.orderRequestsRef.valueChanges();

        return this.items;

      })

    );

  }
  
  getOrder(timestampId : string) : Observable<OrderRequestT> {

    let item: Observable<OrderRequestT> ;

    this.orderRequestRef = this.db.object('OrderRequests/' + timestampId);
    item = this.orderRequestRef.valueChanges();

    return item;

  }

  saveTempOrder(orderRequest: OrderRequest): Promise<void> {

    this.orderRequestRef = this.db.object('OrderRequestsTemp/' + orderRequest.getTimestamp());

    return this.orderRequestRef.set(orderRequest);

  }

  getTempOrder(timestampId : string) : Observable<OrderRequest> {

    let item: Observable<OrderRequest> ;

    this.orderRequestRef = this.db.object('OrderRequestsTemp/' + timestampId);
    item = this.orderRequestRef.valueChanges();

    return item;

  }
  

}
