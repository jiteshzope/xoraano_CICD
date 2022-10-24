import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { elementAt } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsGuardService {

  constructor(private router: Router) { }

  canActivate(routeSnapshot : ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean | UrlTree| Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {

    let time_stamp_id : number = +routeSnapshot.params['orderId'];
    
    if(time_stamp_id > 0){
      return true;
    }else{
      return false;
    }

  }

}
