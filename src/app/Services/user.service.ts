import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireObject, AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map, take, exhaustMap } from 'rxjs/operators';
import { CityParametersT } from '../Interface_models/CityParametersT';
import { UserT } from '../Interface_models/UserT';
import { User } from '../models/User';
import { CityParametersService } from './city-parameters.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  itemRef: AngularFireObject<any> | null = null;
  item: Observable<any> | null = null;

  user = new BehaviorSubject<User | null>(null);

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {

  }

  ngOnInit() {

    this.auth.user.pipe(
      switchMap((user) => {

        this.itemRef = this.db.object('Users/' + user?.phoneNumber);
        this.item = this.itemRef.valueChanges();

        return this.item;

      }),
      map((userT: UserT | null) => {

        if (userT != null) {
          let userobj = new User();
          userobj.setName(userT.name);
          userobj.setAddress(userT.address);
          userobj.setPhone(userT.phone);
          userobj.setPassWord(userT.passWord);
          userobj.setPincode(userT.pincode);
          userobj.setNoOfOrders(userT.noOfOrders);
          userobj.setPincode_noOfOrders(userT.pincode_noOfOrders);
          userobj.setLast_seen(userT.last_seen);
          userobj.setEmail(userT.email);
          userobj.setUid(userT.uid);
          userobj.setDay_date_time_of_registeration(userT.day_date_time_of_registeration);
          userobj.setFcm_token(userT.fcm_token);

          return userobj;

        } else {
          return null;
        }

      })
    ).subscribe((user: User | null) => {

      this.user.next(user);
      //console.log("user emmited is : ", user);

    });

  }

  // use this single method on create account page , edit account page, forgot password page to save the user object that is 
  // created/updated on those pages to rtdb
  saveUserInfo(user: User): Promise<void> {

    return this.auth.currentUser.then(currentuser => {

      this.itemRef = this.db.object('Users/' + currentuser?.phoneNumber);

      return this.itemRef.set(user);

    });

  }

  // call this after a user phone is authenticated with otp to check if this user phone is registered or not
  checkIfUserExists(userPhone: string): Observable<boolean> {

    let itemRef: AngularFireObject<any>;
    let item: Observable<boolean>;

    itemRef = this.db.object('list_registered_userPhones/' + userPhone);

    item = itemRef.valueChanges().pipe(take(1), map(data => !!data));

    return item;

  }

  updateListRegisteredUserPhonesWithNewUser(userPhone: string): Promise<void> {

    let itemRef: AngularFireObject<any>;

    itemRef = this.db.object('list_registered_userPhones/' + userPhone);

    return itemRef.set(true);

  }

  isValidLogin(phone: string, passWord: string): Observable<boolean> {

    let itemRef: AngularFireObject<any>;
    let item: Observable<any>;

    itemRef = this.db.object('Users/' + phone);
    item = itemRef.valueChanges();


    return this.checkIfUserExists(phone).pipe(
      switchMap((isUserRegistered: boolean) => {
        if (isUserRegistered) {
          return item;
        } else {
          return new Observable(subscriber => subscriber.next(null));
        }
      }),
      map((user: UserT) => {

        if (user && user.passWord === passWord && user.phone === phone) {
          return true;
        } else {
          return false;
        }
      })
    );

  }

  resetPassword(newPassword: string, phoneNumber: string): Promise<void> {

    this.itemRef = this.db.object('Users/' + phoneNumber);

    return this.itemRef.update({ 'passWord' : newPassword });
  }

  /*
  // used in a component which is responsible for read only operation only
  getUserInfoStream(): Observable<UserT> | null {

    return this.auth.user.pipe(
      switchMap((user) => {

        this.itemRef = this.db.object('Users/' + user?.phoneNumber);
        this.item = this.itemRef.valueChanges();

        return this.item;

      })
    );
  }
  */

  getUserInfo() : Observable<User> {

    return this.auth.user.pipe(
      
      switchMap((user) => {

        this.itemRef = this.db.object('Users/' + user?.phoneNumber);
        this.item = this.itemRef.valueChanges();

        return this.item;

      }),
      map((userT: UserT) => {

        let userobj = new User();
        userobj.setName(userT.name);
        userobj.setAddress(userT.address);
        userobj.setPhone(userT.phone);
        userobj.setPassWord(userT.passWord);
        userobj.setPincode(userT.pincode);
        userobj.setNoOfOrders(userT.noOfOrders);
        userobj.setPincode_noOfOrders(userT.pincode_noOfOrders);
        userobj.setLast_seen(userT.last_seen);
        userobj.setEmail(userT.email);
        userobj.setUid(userT.uid);
        userobj.setDay_date_time_of_registeration(userT.day_date_time_of_registeration);
        userobj.setFcm_token(userT.fcm_token);

        return userobj;

      })
    );

  }
  

}

/*

The switchMap operator returns an observable that emits items based on applying a function that you supply to each item
emitted by the source observable where that function returns an inner observable. ...
It continues to behave like this for subsequent inner observables.

ExhaustMap always waits for the inner observable to finish.
It ignores any value it receives from the source during this period.
Any value it receives after the inner observable is finished is accepted and it creates a new inner observable

switchMap vs exhaustMap :
  switchMap throttles or cancels any incomplete inner emits if parent emits a new value,
  but exhaustMap throttles following emits until the earlier ones complete.
*/
