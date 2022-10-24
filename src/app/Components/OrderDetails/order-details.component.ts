import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { OrderRequestT } from 'src/app/Interface_models/OrderRequestT';
import { MyLocation } from 'src/app/models/MyLocation';
import { OrderRequest } from 'src/app/models/OrderRequest';
import { DeliveryboyLocationService } from 'src/app/Services/deliveryboy-location.service';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit,OnDestroy {

  orderSubscription: Subscription | undefined;
  deliveryboylocationSubscription : Subscription | undefined;

  orderrequestitem: OrderRequestT | undefined;

  zoom : number = 15;

  order: any; // for use in the template

  userLocation : any;
  deliveryboylocation: any;

  faArrowCircleLeft = faArrowCircleLeft;

  constructor(private route: ActivatedRoute, private ordersService: OrdersService, private deliveryboylocationservice: DeliveryboyLocationService) {

  }
  ngOnDestroy(): void {
    this.deliveryboylocationSubscription?.unsubscribe();
    this.orderSubscription?.unsubscribe();
  }

  ngOnInit() {

    let timestampId = this.route.snapshot.params['orderId'];

    let flag = true;
    this.orderSubscription = this.ordersService.getOrder(timestampId).subscribe(order => {

      this.orderrequestitem = order;

      this.order = this.orderrequestitem;
      this.userLocation=this.orderrequestitem.myLocation;

      let delboyphone: string = this.orderrequestitem.assignedPersonPhone ? this.orderrequestitem.assignedPersonPhone : ''

      if (flag && (order.status === 'Placed' || order.status==='InProgress' || order.status==='On the way')) {

        flag=false;

        this.deliveryboylocationSubscription = this.deliveryboylocationservice.getDeliveryBoyLocation(delboyphone).subscribe(location => {

          this.deliveryboylocation = location;

        });
      }

    });

  }

}
