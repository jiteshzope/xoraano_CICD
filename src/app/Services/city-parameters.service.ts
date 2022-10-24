import { Injectable, OnInit } from '@angular/core';
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { CityParametersT } from '../Interface_models/CityParametersT';

@Injectable({
  providedIn: 'root'
})
export class CityParametersService implements OnInit {

  cityParameters = new BehaviorSubject<CityParametersT | null>(null);

  constructor(private db: AngularFireDatabase) {

  }

  ngOnInit() {

    let itemRef: AngularFireObject<any>;
    let item: Observable<CityParametersT>;

    itemRef = this.db.object('AppParameters/CityParameters');
    item = itemRef.valueChanges();

    item.subscribe((cityparams: CityParametersT) => {

      this.cityParameters.next(cityparams);
      //console.log("cityparams : ",cityparams);

    });
  }

  getCityParams() : Observable<CityParametersT> {
    let itemRef: AngularFireObject<any>;
    let item: Observable<CityParametersT>;

    itemRef = this.db.object('AppParameters/CityParameters');
    item = itemRef.valueChanges();

    return item;
  }

}
