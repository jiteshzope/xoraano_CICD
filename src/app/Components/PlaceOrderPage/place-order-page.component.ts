

import { Component, ElementRef, OnDestroy, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppParametersT } from 'src/app/Interface_models/AppParametersT';
import { PincodeInfoT } from 'src/app/Interface_models/PincodeInfoT';
import { UserT } from 'src/app/Interface_models/UserT';
import { AppParameters } from 'src/app/models/AppParameters';
import { CityParameters } from 'src/app/models/CityParameters';
import { MyLocation } from 'src/app/models/MyLocation';
import { OrderItem } from 'src/app/models/OrderItem';
import { OrderRequest } from 'src/app/models/OrderRequest';
import { User } from 'src/app/models/User';
import { AppParametersService } from 'src/app/Services/app-parameters.service';
import { CartService } from 'src/app/Services/cart.service';
import { CityParametersService } from 'src/app/Services/city-parameters.service';
import { CommonService } from 'src/app/Services/common.service';
import { OrdersService } from 'src/app/Services/orders.service';
import { UserService } from 'src/app/Services/user.service';
import { MapUtils } from 'src/app/Utilities/MapUtils';
import { MyDate } from 'src/app/Utilities/MyDate';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-place-order-page',
  templateUrl: './place-order-page.component.html',
  styleUrls: ['./place-order-page.component.css']
})
export class PlaceOrderPageComponent implements OnInit, OnDestroy {

  @ViewChild('specialNotes') specialNotesRef: ElementRef | undefined;

  @ViewChild('search') public searchElementRef: ElementRef | undefined;

  faArrowCircleRight = faArrowCircleRight;
  faArrowCircleLeft = faArrowCircleLeft;

  appParams: AppParameters;
  currentUser: User;

  payment_mode: string = 'Cod';

  is_allowed_to_place_order: boolean = true;

  // map and users current location related fields
  latitude = 20.5937;
  longitude = 78.9629;
  watchId: number = 0;
  zoom: number = 15;

  is_first_order: boolean = false;

  entered_coupon_code: string = ''; // ngModel used
  applied_coupon_code: string = '';

  btn_apply_coupon_text: string = 'Apply Coupon';

  // orderTotal * discount% * 0.01
  discount_amount: number = 0;

  // sum of all order items
  orderTotal: number = 0;

  taxRate: number = 0;

  // orderTotal- tax amount
  subTotal: number = 0;

  // subTotal + taxamt - discountamt + deliveryfee
  grandTotal: number = 0;

  deliveryFee: number = 0;

  orderItemsList: OrderItem[] = [];

  myLocation: MyLocation | null = null;

  appParamsSub: Subscription | undefined;

  myordersSub: Subscription | undefined;

  userSubscription: Subscription | undefined;

  isLoading: boolean = false;


  constructor(private toastr: ToastrService, private appParamsService: AppParametersService, private userService: UserService, private ordersService: OrdersService,
    private cartService: CartService, private router: Router, private commonService: CommonService, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {

    this.currentUser = new User();
    this.appParams = new AppParameters();

  }

  ngOnDestroy() {
    //navigator.geolocation.clearWatch(this.watchId);

    this.userSubscription?.unsubscribe();
    this.appParamsSub?.unsubscribe();
    this.myordersSub?.unsubscribe();
  }

  ngOnInit() {

    this.setCurrentLocation();

    this.loadPlacesAutoComplete();

    this.isLoading = true;
    this.userService.getUserInfo().pipe(take(1)).subscribe(user => {
      this.currentUser = user;
      this.appParamsService.getAppParams().pipe(take(1)).subscribe(appParams => {
        this.isLoading = false;
        this.appParams = appParams;

        let pincode = this.currentUser?.getPincode() ? this.currentUser?.getPincode() : '';
        this.deliveryFee = +this.appParams.CityParameters.pincodeToPincodeInfoMap[pincode].deliveryFee;

        this.taxRate = +this.appParams.taxRate;

        this.loadCartItems();

        this.init_subscriptions();

      });
    });

  }

  onRadioChange(event: any) {

    this.payment_mode = event.target.defaultValue;

    //console.log("payment mode : ", this.payment_mode);

  }

  check_parameters_place_order() {

    let appstatus: string = this.appParams.CityParameters.pincodeToPincodeInfoMap[this.currentUser.getPincode()]['appStatus'];
    let minOrderAmt: string = this.appParams.CityParameters.pincodeToPincodeInfoMap[this.currentUser.getPincode()]['minOrderAmt'];
    let maxOrderAmt: string = this.appParams.CityParameters.pincodeToPincodeInfoMap[this.currentUser.getPincode()]['maxOrderAmt'];
    let blocked_nos_list: string[] = this.appParams.CityParameters.blocked_nos_list || [];
    let other_options_available: string = this.appParams.other_options_available;
    let cod_available: string = this.appParams.cod_available;
    let flagPermitAddress: string = this.appParams.flagPermitAddress;
    let msgAppStatus: string = this.appParams.CityParameters.pincodeToPincodeInfoMap[this.currentUser.getPincode()]['msg_appstatus'];

    let check_failure_reason = '';
    let is_check_successful = false;

    if (appstatus != 'open') {

      check_failure_reason = msgAppStatus;

    } else if (!this.is_allowed_to_place_order) {

      check_failure_reason = 'You already have an ongoing order!!'

    } else if (this.orderTotal < +minOrderAmt) {

      check_failure_reason = 'Minimum order amount is ' + minOrderAmt;

    } else if (this.orderTotal > +maxOrderAmt) {

      check_failure_reason = 'Maximum order amount is ' + maxOrderAmt;

    } else if (blocked_nos_list.includes(this.currentUser.getPhone())) {

      check_failure_reason = 'Your have been blocked!!'

    } else if (this.commonService.getCurrentPincode() === this.currentUser.getPincode()) {

      if (this.myLocation != null) {

        if (this.isUserWithinOrderRadius()) {

          if (this.payment_mode === 'Cod') {

            if (cod_available != 'yes') {

              check_failure_reason = 'Cash on delievery not available !!';

            } else if (cod_available === 'yes') {

              is_check_successful = true;

            }

          } else if (this.payment_mode === 'onlinePayment') {

            if (other_options_available != 'yes') {

              check_failure_reason = 'Online payment not available';

            } else if (other_options_available === 'yes') {

              is_check_successful = true;

            }

          }

        } else if (!this.isUserWithinOrderRadius()) {

          check_failure_reason = 'You are out of the kitchen radius!!';

        }

      } else if (this.myLocation === null) {

        if (flagPermitAddress === 'yes') {

          if (this.payment_mode === 'Cod') {

            if (cod_available != 'yes') {

              check_failure_reason = 'Cash on delievery not available !!';

            } else if (cod_available === 'yes') {

              is_check_successful = true;

            }

          } else if (this.payment_mode === 'onlinePayment') {

            if (other_options_available != 'yes') {

              check_failure_reason = 'Online payment not available';

            } else if (other_options_available === 'yes') {

              is_check_successful = true;

            }

          }

        } else if (flagPermitAddress != 'yes') {

          check_failure_reason = 'Please enable and select your location';

        }

      }


    } else if (this.commonService.getCurrentPincode() != this.currentUser.getPincode()) {

      check_failure_reason = 'Your pincode does not match the selected city';

    }

    // check the flag and proceed
    if (is_check_successful) {

      if (this.payment_mode === 'Cod') {

        this.isLoading = true;
        this.place_cod_order();

      } else if (this.payment_mode === 'onlinePayment') {

        this.isLoading = true;
        this.create_and_saveTempOrder();

      }

    } else {

      this.toastr.error('', check_failure_reason);

      //console.log("Check failed with Reason : ", check_failure_reason);

    }

  }

  isUserWithinOrderRadius() {

    let orderRadius: number = +this.appParams.CityParameters.pincodeToPincodeInfoMap[this.currentUser.getPincode()]['order_radius'];

    let ref_latitude = +this.appParams.CityParameters.pincodeToPincodeInfoMap[this.currentUser.getPincode()]['ref_latitude'];
    let ref_longitude = +this.appParams.CityParameters.pincodeToPincodeInfoMap[this.currentUser.getPincode()]['ref_longitude'];

    let distance = new MapUtils().getDistanceFromLatLonInKm(ref_latitude, ref_longitude, this.latitude, this.longitude);

    //console.log("distance from kitchen : ",distance);

    if (distance*1000 > orderRadius) {
      return false;
    }

    return true;
  }

  place_cod_order() {

    let orderRequest = new OrderRequest();

    orderRequest.setPayment_method('Cash on delivery');
    orderRequest.setTxnRef('codTxn');

    orderRequest.setName(this.currentUser?.getName());
    orderRequest.setPhone(this.currentUser?.getPhone());

    orderRequest.setPincode(this.currentUser?.getPincode());

    orderRequest.setSubTotal(this.subTotal.toString());
    orderRequest.setGrandTotal(this.grandTotal.toString());

    orderRequest.setTaxRate(this.taxRate.toString());

    orderRequest.setDeliveryFee(this.deliveryFee.toString());

    orderRequest.setApplied_discount_amount(this.discount_amount.toString());

    orderRequest.setApplied_coupon_code(this.applied_coupon_code);

    orderRequest.setBillReceipt('');

    orderRequest.setUserNotes(this.specialNotesRef?.nativeElement.value); // doubt

    orderRequest.setOrderItems(this.orderItemsList);
    orderRequest.setNoOfOrderItems(this.orderItemsList.length.toString());

    let myDate = new MyDate();
    orderRequest.setDay_and_date(myDate.getDayDate()); // "Mon, 6 Jul 2020"
    orderRequest.setTimestamp(myDate.getTimeStamp());  // "1594016296769",
    orderRequest.setTime(myDate.getTime()); //"11.48 AM"
    orderRequest.setDateTime(myDate.getDateTime()); //2020/07/06 11:48:16
    orderRequest.setDate(myDate.getDate()); // 2020-07-06

    orderRequest.setDate_pincode(myDate.getDate() + "_" + this.currentUser?.getPincode()); // "2020-07-06_443101"

    let phone = this.currentUser?.getPhone();
    phone = phone ? phone : '';
    let orderId = myDate.getDayDate().slice(0, 1) + phone.slice(phone.length - 2) + '-' + myDate.getTimeStamp();
    orderRequest.setOrderId(orderId);  // "M55-1594016296769"

    if (this.myLocation != null) {
      orderRequest.setAddress(this.currentUser?.getAddress());
      orderRequest.setMyLocation(new MyLocation(this.myLocation.getLatitude(), this.myLocation.getLongitude()));
    } else {
      orderRequest.setAddress(this.currentUser?.getAddress() + "  **gps not provided**");
      orderRequest.setMyLocation(null);
    }

    orderRequest.setStatus("Placed");
    orderRequest.setPincode_status(this.currentUser?.getPincode() + "_" + orderRequest.getStatus());

    this.ordersService.saveOrder(orderRequest).then(_ => {

      //console.log("cod order saved successfully");

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
        this.isLoading = false;
        //console.log("no of orders of user modified and user saved back successfully for cod order !");

        this.toastr.success(' ', ' Order placed successfully !!');

        this.router.navigate(['/', orderRequest.getTimestamp(), 'order-success']);
      });

    })

  }

  create_and_saveTempOrder() {

    let orderRequest = new OrderRequest();

    //orderRequest.setPayment_method(payment_method);
    //orderRequest.setTxnRef(txnRef); //both will be set later

    orderRequest.setName(this.currentUser?.getName());
    orderRequest.setPhone(this.currentUser?.getPhone());

    orderRequest.setPincode(this.currentUser?.getPincode());

    orderRequest.setSubTotal(this.subTotal.toString());
    orderRequest.setGrandTotal(this.grandTotal.toString());

    orderRequest.setTaxRate(this.taxRate.toString());

    orderRequest.setDeliveryFee(this.deliveryFee.toString());

    orderRequest.setApplied_discount_amount(this.discount_amount.toString());

    orderRequest.setApplied_coupon_code(this.applied_coupon_code);

    orderRequest.setBillReceipt('');

    orderRequest.setUserNotes(this.specialNotesRef?.nativeElement.value); // doubt

    orderRequest.setRazorpay_orderid('');

    orderRequest.setOrderItems(this.orderItemsList);
    orderRequest.setNoOfOrderItems(this.orderItemsList.length.toString());

    let myDate = new MyDate();
    orderRequest.setDay_and_date(myDate.getDayDate()); // "Mon, 6 Jul 2020"
    orderRequest.setTimestamp(myDate.getTimeStamp());  // "1594016296769",
    orderRequest.setTime(myDate.getTime()); //"11.48 AM"
    orderRequest.setDateTime(myDate.getDateTime()); //2020/07/06 11:48:16
    orderRequest.setDate(myDate.getDate()); // 2020-07-06

    orderRequest.setDate_pincode(myDate.getDate() + "_" + this.currentUser?.getPincode()); // "2020-07-06_443101"

    let phone = this.currentUser?.getPhone();
    phone = phone ? phone : '';
    let orderId = myDate.getDayDate().slice(0, 1) + phone.slice(phone.length - 2) + '-' + myDate.getTimeStamp();
    orderRequest.setOrderId(orderId);  // "M55-1594016296769"

    if (this.myLocation != null) {
      orderRequest.setAddress(this.currentUser?.getAddress());
      orderRequest.setMyLocation(new MyLocation(this.myLocation.getLatitude(), this.myLocation.getLongitude()));
    } else {
      orderRequest.setAddress(this.currentUser?.getAddress() + "  **gps not provided**");
      orderRequest.setMyLocation(null);
    }

    orderRequest.setStatus("Pending");
    orderRequest.setPincode_status(this.currentUser?.getPincode() + "_" + orderRequest.getStatus());

    this.ordersService.saveTempOrder(orderRequest).then(_ => {

      this.isLoading = false;
      //console.log("success saving temporary order to db");
      this.router.navigate(['/payment/', orderRequest.getTimestamp()]);

    });

  }

  loadCartItems() {
    let cartItemsList = this.cartService.getCartItems();

    this.orderItemsList.splice(0, this.orderItemsList.length); // clear the array
    this.orderTotal = 0;

    cartItemsList.forEach(item => {
      let orderitem = new OrderItem();  // code is redundant but still used
      orderitem.setProductName(item.getProductName());
      orderitem.setAmount(item.getAmount());
      orderitem.setQuantity(item.getQuantity());
      orderitem.setImage(item.getImage());
      orderitem.setCode(item.getCode());

      this.orderItemsList.push(orderitem);

      this.orderTotal += +item.getAmount();

    });

    this.subTotal = this.orderTotal - this.taxRate * 0.01 * this.orderTotal;

    this.grandTotal = Math.round(this.deliveryFee + this.orderTotal - this.discount_amount);

    //subscription to check if user has any previous placed or inprogress or on the way order and according set the flag
    if (this.myordersSub === undefined) {

      this.isLoading = true;
      this.myordersSub = this.ordersService.getMyOrders()?.subscribe(orders => {
        this.isLoading = false;
        this.is_allowed_to_place_order = true;
        for (let item of orders) {
          if (item.status === 'Placed' || item.status === 'InProgress' || item.status === 'On the way') {

            this.is_allowed_to_place_order = false;
            break;

          }
        }

      });
    }

  }

  applyCoupon() {

    if (this.currentUser?.getNoOfOrders() != null && +this.currentUser.getNoOfOrders() > 0) {
      this.is_first_order = false;
    } else {
      this.is_first_order = true;
    }


    let first_order_coupon_code = this.appParams?.first_order_coupon_code;
    first_order_coupon_code = first_order_coupon_code ? first_order_coupon_code : '';
    let discount_percentage_first_order_coupon = +first_order_coupon_code?.substring(first_order_coupon_code.length - 2);

    let casual_coupon_code = this.appParams?.casual_coupon_code;
    casual_coupon_code = casual_coupon_code ? casual_coupon_code : '';
    let discount_percentage_casual_coupon = +casual_coupon_code?.substring(casual_coupon_code.length - 2);

    if (this.entered_coupon_code != '' && first_order_coupon_code === this.entered_coupon_code && discount_percentage_first_order_coupon != 0) {
      if (this.is_first_order) {
        this.applied_coupon_code = first_order_coupon_code;
        this.discount_amount = Math.round(this.orderTotal * discount_percentage_first_order_coupon * 0.01);  // rounding off ******************************

        this.btn_apply_coupon_text = this.applied_coupon_code + " Applied ";

        this.toastr.success(' ', this.applied_coupon_code + " Applied Successfully");

        this.entered_coupon_code = "";

      } else {
        this.toastr.warning('', "This coupon is valid only on 1st order");
        this.entered_coupon_code = '';
        //console.log("This coupon is valid only on 1st order");
      }

    } else if (this.entered_coupon_code != '' && casual_coupon_code === this.entered_coupon_code && discount_percentage_casual_coupon != 0) {
      this.applied_coupon_code = casual_coupon_code;
      this.discount_amount = Math.round(this.orderTotal * discount_percentage_casual_coupon * 0.01);  // rounding off ******************************

      this.btn_apply_coupon_text = this.applied_coupon_code + " Applied ";

      this.toastr.success(' ', this.applied_coupon_code + " Applied Successfully");

      this.entered_coupon_code = "";

    } else {
      this.entered_coupon_code = "";
      this.toastr.warning('', 'Invalid coupon code')
      //console.log("Invalid coupon code");
    }

    this.grandTotal = Math.round(this.deliveryFee + this.orderTotal - this.discount_amount);

  }

  init_subscriptions() {

    this.userSubscription = this.userService.getUserInfo().subscribe(user => {
      this.currentUser = user;

    });

    this.appParamsSub = this.appParamsService.getAppParams().subscribe(appParams => {
      this.appParams = appParams;
      if (this.currentUser) {
        let pincode = this.currentUser?.getPincode() ? this.currentUser?.getPincode() : '';
        let pincodeInfo: PincodeInfoT = this.appParams.CityParameters.pincodeToPincodeInfoMap[pincode];

        this.deliveryFee = +pincodeInfo.deliveryFee;

        this.taxRate = +this.appParams.taxRate;
        this.loadCartItems();

      }
    });

  }

  markerDragEnd($event: any) {
    //console.log($event);
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();

    this.myLocation = new MyLocation(this.latitude,this.longitude);
    this.isUserWithinOrderRadius();

    //console.log(this.latitude, this.longitude);

  }

  loadPlacesAutoComplete() {
    //load Places Autocomplete

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();

      if (this.searchElementRef) {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        autocomplete.addListener("place_changed", () => {

          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.myLocation = new MyLocation(this.latitude,this.longitude);
            this.isUserWithinOrderRadius();
            this.zoom = 15;
          });

        });
      }
    });

  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.myLocation = new MyLocation(this.latitude,this.longitude);
        this.isUserWithinOrderRadius();
        this.zoom = 15;
      });
    }
  }

}
