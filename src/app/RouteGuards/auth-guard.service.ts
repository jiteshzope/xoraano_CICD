import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AngularFireAuth, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {

    return this.auth.user.pipe(take(1),
      map(user => {

        //console.log(state.url); // /checkout

        if (state.url.includes('login') || state.url.includes('create-account')) {
          if (user === null) {
            return true;
          }

          return this.router.createUrlTree(['/home']);
          
        }

        if (user !== null) {
          return true;
        }

        if (state.url.includes("checkout")) {
          return this.router.createUrlTree(['/login'], { queryParams: { 'returnUrl': '/checkout' } });
        }

        return this.router.createUrlTree(['/login']);

      })
    )

  }
}
