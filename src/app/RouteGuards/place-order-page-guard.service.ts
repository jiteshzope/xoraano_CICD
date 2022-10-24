import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../Services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class PlaceOrderPageGuardService implements CanActivate{

  constructor(private cartService : CartService,private router : Router) { }

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | UrlTree| Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {

    let cartItemsLength = this.cartService.getCartItems().length ;
    
    if(cartItemsLength > 0){
      return true;
    }else {
      return this.router.createUrlTree(['/home']);
    }

  }

}
