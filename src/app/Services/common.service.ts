import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService implements OnInit {

  DEFAULT_PINCODE: string = '443101';

  currentPincode = new Subject<string>();
  currentCategoryId = new BehaviorSubject<string>('');

  constructor() {

  }

  ngOnInit() {

    let pincode = localStorage.getItem('current_pincode');

    this.currentPincode.next(!!pincode ? pincode : this.DEFAULT_PINCODE);

    //console.log("common service : ",pincode);

    this.currentCategoryId.next('');

  }

  setCurrentPincode(pincode: string) {

    localStorage.setItem('current_pincode', pincode);
    this.currentPincode.next(pincode);

  }

  getCurrentPincode(): string {

    let pincode = localStorage.getItem('current_pincode');
    return !!pincode ? pincode : this.DEFAULT_PINCODE;

  }

  generateCurrentDayDateTime() {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const d = new Date();
    const day = days[d.getDay()].substr(0, 3);
    const date = d.getDate();
    const month = months[d.getMonth()].substr(0, 3);
    const year = d.getFullYear();

    let hours = d.getHours() > 12 ? d.getHours() - 12 : (d.getHours() === 0 ? 12 : (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()));
    hours = +hours < 10 ? '0' + (hours) : hours;
    const am_pm = d.getHours() > 11 ? 'PM' : 'AM';
    const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();

    return day + ', ' + date + ' ' + month + ' ' + year + ' ' + hours + '.' + minutes + ' ' + am_pm; // 'Wed, 16 Sep 2020 06.03 PM'

  }

  // a service is instantiated when it is injected at least once , but if it needs to be injected eagerly right when it is provided 
  // then we can set eager : true in @Injectable({})
  // create methods to get and set the current pincode which can be called from a component
  // make sure when the method to set the current pincode is called from a component the current pincde in local storage is also updated

}

