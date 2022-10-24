import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { take } from 'rxjs/operators';
import { OrderRequest } from '../models/OrderRequest';
import { OrdersService } from '../Services/orders.service';

@Injectable({
  providedIn: 'root'
})
export class TempOrderResolverService implements Resolve<OrderRequest>{

  constructor(private ordersService: OrdersService,) { }

  resolve(routesnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    const id = routesnapshot.params['orderId'];

    return this.ordersService.getTempOrder(id).pipe(take(1));

  }
  
}
