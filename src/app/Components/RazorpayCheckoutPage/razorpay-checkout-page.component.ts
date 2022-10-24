import { Component, OnInit } from '@angular/core';
import { AngularFireObject } from '@angular/fire/database';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AppParametersT } from 'src/app/Interface_models/AppParametersT';
import { UserT } from 'src/app/Interface_models/UserT';
import { AppParameters } from 'src/app/models/AppParameters';
import { OrderRequest } from 'src/app/models/OrderRequest';
import { User } from 'src/app/models/User';
import { AppParametersService } from 'src/app/Services/app-parameters.service';
import { CartService } from 'src/app/Services/cart.service';
import { CityParametersService } from 'src/app/Services/city-parameters.service';
import { OrdersService } from 'src/app/Services/orders.service';
import { PaymentService } from 'src/app/Services/payment-service';
import { UserService } from 'src/app/Services/user.service';
import { WindowService } from 'src/app/Services/window.service';

@Component({
  selector: 'app-razorpay-checkout-page',
  templateUrl: './razorpay-checkout-page.component.html',
  styleUrls: ['./razorpay-checkout-page.component.css']
})
export class RazorpayCheckoutPageComponent implements OnInit {

  tempOrder: OrderRequest = new OrderRequest(); // here it is instantiated just to hide the typescript errors but after assigned tempOrder

  windowRef: any;

  appParams: AppParameters;
  currentUser: User;

  isLoading : boolean= false;

  constructor(private toastr : ToastrService ,private ordersService: OrdersService, private paymentService: PaymentService, private windowService: WindowService,
    private route: ActivatedRoute, private appParamsService: AppParametersService, private router: Router,
    private userService: UserService, private cartService: CartService) {

    this.currentUser = new User();
    this.appParams = new AppParameters();

  }

  ngOnInit() {

    this.windowRef = this.windowService.windowRef;

    const id = this.route.snapshot.params['orderId'];

    this.isLoading = true; /* This loading will continue till the end even when the checkout begins loading will be there in the 
    background till the order is placed successfully or is failed.
    */

    this.appParamsService.getAppParams().pipe(take(1)).subscribe(appParams => {
      this.appParams = appParams;

      // resolver data
      this.route.data.subscribe(data => {
        
        this.tempOrder = data['tempOrder']; // do not use any method as it is not an instance of OrderRequest but just of that type

        let amount = (+(this.tempOrder.grandTotal ? this.tempOrder.grandTotal : '0') * 100).toString();
        let receipt = this.tempOrder.orderId ? this.tempOrder.orderId : '';

        this.createRazorpayOrder(amount, receipt);

      });

    });

  }

  createRazorpayOrder(amount: string, receipt: string) {

    
    this.paymentService.createRazorpayOrder(amount, receipt).subscribe(data => {
      this.tempOrder.razorpay_orderid = data.id;
      this.initCheckOut();

    });

  }

  initCheckOut() {

    let options = {
      "key": this.appParams?.key_id, // Enter the Key ID generated from the Dashboard
      "amount": (+this.tempOrder.grandTotal * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Xoraano Food delivery",
      "description": "Payment for order " + this.tempOrder.orderId,
      "image": this.appParams?.checkout_image_url,
      "order_id": this.tempOrder?.razorpay_orderid, //razorpay order id
      "handler": this.paymentSuccessHandler.bind(this),
      "prefill": {
        "name": this.tempOrder.name,
        "email": "",
        "contact": this.tempOrder?.phone
      },
      "notes": {
        "address": ""
      },
      "theme": {
        "color": "#3399cc"
      }
    };

    let razorpayobj = new this.windowRef.Razorpay(options);
    razorpayobj.on('payment.failed', this.paymentErrorHandler);

    razorpayobj.open();

    //console.log("checkout started")


  }

  paymentSuccessHandler(response: any) {

    //console.log("payment success handler !");

    let razorpayPaymentId: string = response.razorpay_payment_id;
    let razorpayorderId: string = response.razorpay_order_id;
    let razorpaysignature: string = response.razorpay_signature;

    //console.log(razorpayPaymentId);
    //console.log(razorpayorderId);
    //console.log(razorpaysignature);

    this.verifySignature(razorpayPaymentId, razorpayorderId, razorpaysignature);

  }

  paymentErrorHandler(response: any) {

    //console.log("payment error handler !");

    this.toastr.error('','Payment Failed !');

    //console.log(response.error.code);
    //console.log(response.error.description);
    //console.log(response.error.source);
    //console.log(response.error.reason);

    this.router.navigate(['/checkout']);

  }

  verifySignature(razorpayPaymentId: string, razorpayorderId: string, razorpaysignature: string) {

    this.paymentService.verifySignature(razorpayPaymentId, razorpayorderId, razorpaysignature).subscribe(data => {

      const signature_verification_status = data.signature_verification_status;  // values are success or failed

      //console.log("signature_verification_status : ", signature_verification_status);

      if (signature_verification_status === 'success') {

        //console.log("SIGNATURE VERIFICATION SUCCESS");

        this.resolveParams_place_order(razorpayPaymentId,razorpayorderId);

      } else if (signature_verification_status === 'failed') {

        //console.log("SIGNATURE VERIFICATION FAILED");

        this.toastr.error('','Payment Failed !');

        this.isLoading = false;
        this.router.navigate(['/checkout']);

      }

    });

  }

  resolveParams_place_order(razorpayPaymentId :string, razorpayorderId : string){

    const id = this.route.snapshot.params['orderId'];
    this.ordersService.getTempOrder(id).pipe(take(1)).subscribe(order => {

      this.tempOrder = order; // do not use any method as it is not an instance of OrderRequest but just of that type

      this.tempOrder.razorpay_orderid = razorpayorderId;
      this.tempOrder.razorpayPaymentId = razorpayPaymentId;
      this.tempOrder.txnRef = razorpayPaymentId;

      this.userService.getUserInfo().pipe(take(1)).subscribe(user => {
        this.currentUser = user;

        this.place_order();

      });

    });

  }

  place_order() {

    this.tempOrder.payment_method = 'Prepaid';

    this.tempOrder.status = 'Placed';
    this.tempOrder.pincode_status = this.currentUser?.getPincode() + "_Placed";

    this.ordersService.saveOrder(this.tempOrder).then(_ => {

      //console.log("Payment gateway order saved successfully !!");

      this.cartService.clearCart();

      let user: User = new User();
      user.setName(this.currentUser.getName());
      user.setPhone(this.currentUser.getPhone());
      user.setAddress(this.currentUser.getAddress());
      user.setPassWord(this.currentUser.getPassWord());
      user.setPincode(this.currentUser.getPincode());
      user.setEmail(this.currentUser.getEmail());
      user.setFcm_token(this.currentUser.getFcm_token());
      user.setDay_date_time_of_registeration(this.currentUser.getDay_date_time_of_registeration());
      user.setLast_seen(this.currentUser.getLast_seen());
      user.setUid(this.currentUser.getUid());

      //user = Object.assign({}, this.currentUser);

      let noOfOrders = +this.currentUser.getNoOfOrders();
      if (noOfOrders != null && noOfOrders === 0) {
        noOfOrders = 1;
      } else {
        noOfOrders += 1
      }
      user.setNoOfOrders(noOfOrders.toString());
      user.setPincode_noOfOrders(user.getPincode() + '_' + noOfOrders);

      this.userService.saveUserInfo(user).then(_ => {
        this.isLoading=false;
        //console.log("no of orders of user modified and user saved back successfully for gateway order !");

        this.toastr.success(' ',' Order placed successfully !');

        this.router.navigate(['/',this.tempOrder.timestamp,'order-success']);
      });

    })

  }

}
