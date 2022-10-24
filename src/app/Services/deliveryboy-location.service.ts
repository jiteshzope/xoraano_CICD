import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { Observable, BehaviorSubject } from 'rxjs';
import { MyLocation } from '../models/MyLocation';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class DeliveryboyLocationService implements OnInit {

  itemRef: AngularFireObject<any> | null = null;
  item: Observable<any> | null = null;

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {

  }

  ngOnInit() {

  }

  getDeliveryBoyLocation(deliveryboyPhone: string): Observable<MyLocation> {

    this.itemRef = this.db.object('deliveryPersons/' + deliveryboyPhone+'/my_location');
    this.item = this.itemRef.valueChanges();

    return this.item;

  }

}
