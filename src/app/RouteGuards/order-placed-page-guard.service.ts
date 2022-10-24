import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderPlacedPageGuardService {

  constructor(private router : Router) { }

  canActivate(routeSnapshot: ActivatedRouteSnapshot, routersnapshot: RouterStateSnapshot): boolean | UrlTree| Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {

    let time_stamp_id : number = routeSnapshot.params['orderId'];
    let currentTime: number = new Date().getTime();

    let difference : number = currentTime - time_stamp_id; // in ms

    if(difference < 900*1000){
      return true;
      
    }else{
      //console.log("success page guard denied access!!");
      
      return this.router.createUrlTree(['/cart-page']);
    }

  }

}
