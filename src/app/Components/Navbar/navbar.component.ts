import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CityParametersT } from 'src/app/Interface_models/CityParametersT';
import { CityParametersService } from 'src/app/Services/city-parameters.service';
import { CommonService } from 'src/app/Services/common.service';

import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/Services/cart.service';
import { AngularFireAuth } from '@angular/fire/auth';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {

  filteredOptions : Observable<string[] | undefined>;

  myControl : FormControl = new FormControl();

  options = [''];

  filteredOptionsList = [''];

  cityParams : CityParametersT | null =null;

  city_pincode_map : {[key:string] : string} | undefined ;

  faCartPlus = faCartPlus;
  faAngleDown = faAngleDown;

  cartItemsCount: string = '0';

  cartSubscription : Subscription | undefined;
  cityParametersSubscription : Subscription | undefined;

  user : any;

  constructor(private toastr : ToastrService, private cityParametersService: CityParametersService,private auth: AngularFireAuth ,private commonService : CommonService,private cartService : CartService) { 

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))

    )
  }
  ngOnDestroy() {
    this.cartSubscription?.unsubscribe();
    this.cityParametersSubscription?.unsubscribe();
  }

  ngOnInit() {

    
    this.auth.user.subscribe(user =>{
      this.user = user;
    })

    this.cartItemsCount = this.cartService.getItemsCount();
    this.cartSubscription = this.cartService.cartSubject.subscribe(data =>{
      this.cartItemsCount = data;
    });

    this.cityParametersSubscription =  this.cityParametersService.getCityParams().subscribe(params => {
      this.cityParams = params;

      //console.log("params : ",params)

      let city_pincode_map = params?.city_pincode_map ? params?.city_pincode_map : {}
      this.city_pincode_map = city_pincode_map;
      
      let currentpin = this.commonService.getCurrentPincode();

      let cityname;
      for (const city in this.city_pincode_map) {
        if (this.city_pincode_map[city] ===currentpin) {
          cityname = city;
          break;
        }
      }

      //console.log("currentpin : ",currentpin," city : ",cityname);
      this.myControl.setValue(cityname);

      this.options = Object.keys(city_pincode_map);
      this.filteredOptionsList = this.options;
      //console.log("cities retrieved are : ",this.options)

    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )

    this.filteredOptions.subscribe(filteredList => {
      let list = filteredList ? filteredList : [];
      this.filteredOptionsList = list;
    });

  }

  _filter(value : string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  setCurrentPincodeofcity(value:string){
    //console.log("selected city : ",value);
    this.toastr.success('',"Selected city : "+value)
    let map = this.city_pincode_map ? this.city_pincode_map : {}
    let currentPin = map[value];

    //console.log("current pincode : ",currentPin);
    this.commonService.setCurrentPincode(currentPin);

    this.cartService.clearCart();
  }

  logout(){
    this.auth.signOut().then(_=>{
      this.user = null;
    });
  }

}
