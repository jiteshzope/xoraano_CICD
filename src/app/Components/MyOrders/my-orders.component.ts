import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { OrderRequestT } from 'src/app/Interface_models/OrderRequestT';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit,OnDestroy {

  myOrders : OrderRequestT[] = [];

  myOrdersSubscription : Subscription | undefined;

  faArrowCircleLeft = faArrowCircleLeft;

  constructor(private ordersService : OrdersService,private router : Router) { }

  ngOnDestroy() {
    this.myOrdersSubscription?.unsubscribe();
  }

  ngOnInit() {

    this.myOrdersSubscription =  this.ordersService.getMyOrders()?.subscribe(orders =>{

      this.myOrders = orders.reverse();

    });

  }

  goToOrderDetails(order : OrderRequestT){

    let timeStampId = order.timestamp ? order.timestamp : '';

    this.router.navigate(['/my-orders',timeStampId]);    // my-orders/:orderId

  }

}
