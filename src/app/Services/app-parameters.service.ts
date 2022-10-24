import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AppParameters } from '../models/AppParameters';

@Injectable({
  providedIn: 'root'
})
export class AppParametersService implements OnInit{

  constructor(private db: AngularFireDatabase) {

  }

  ngOnInit() {

  }

  getAppParams() : Observable<AppParameters> {
    
    let itemRef: AngularFireObject<any>;
    let item: Observable<AppParameters>;

    itemRef = this.db.object('AppParameters');
    item = itemRef.valueChanges();

    return item;
  }



}
