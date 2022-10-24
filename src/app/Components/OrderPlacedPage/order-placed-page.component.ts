import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-placed-page',
  templateUrl: './order-placed-page.component.html',
  styleUrls: ['./order-placed-page.component.css']
})
export class OrderPlacedPageComponent implements OnInit {

  orderId : any;

  faArrowCircleRight = faArrowCircleRight;

  constructor(private router : Router,private route : ActivatedRoute) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.params['orderId'];
  }

  goToDetails() {

    this.router.navigate(['/my-orders',this.orderId]);    // my-orders/:orderId

  }

}
