import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RazorpayPageGuardService {

  constructor(private router: Router) { }

  canActivate(routeSnapshot : ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean | UrlTree| Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {

    let time_stamp_id : number = routeSnapshot.params['orderId'];
    let currentTime: number = new Date().getTime();

    let difference : number = currentTime - time_stamp_id; // milliseconds

    if(difference < 60*1000){ // less than 60 seconds
      return true;
      
    }else{
      //console.log("Razorpay page guard denied access!!");
      
      return this.router.createUrlTree(['/home']);
    }

  }

}
