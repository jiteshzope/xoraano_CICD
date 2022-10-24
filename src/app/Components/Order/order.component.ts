import { Component, Input, OnInit } from '@angular/core';
import { OrderRequestT } from 'src/app/Interface_models/OrderRequestT';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input('item') item : OrderRequestT | undefined;

  order : any;

  constructor() {
  }

  ngOnInit() {
    this.order = this.item;
  }

}
