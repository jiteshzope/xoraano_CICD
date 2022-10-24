
import { AssignedPerson } from './AssignedPerson';
import { MyLocation } from './MyLocation';
import { OrderItem } from './OrderItem';

export class OrderRequest {

    name : string | null | undefined;
    phone : string | null| undefined;
    address : string | null | undefined;
    pincode : string | null | undefined;
    orderId : string ='';
    day_and_date : string | null = null;
    status : string | null = null;
    time : string | null = null;
    dateTime : string | null = null;
    noOfOrderItems : string | null = null;
    timestamp : string | null = null;
    pincode_status : string | null = null;
    deliveryFee : string | null = null;
    billReceipt : string | null = null;
    userNotes : string | null = null;
    deliveryTimeTaken : string | null = null;
    date : string | null = null;
    date_pincode : string | null = null;
    delivery_rating : string | null = null;
    food_rating : string | null = null;
    subTotal : string | null = null;
    grandTotal : string ='0';
    taxRate : string | null = null;
    payment_method : string | null = null;
    txnRef : string | null = null;
    applied_coupon_code : string | null = null;
    applied_discount_amount : string | null = null;
    assignedPersonPhone : string | null = null;
    razorpay_orderid : string ='';
    razorpayPaymentId : string | null = null;
    razorpay_refund_id : string | null = null;
    razorpay_refund_amt : string | null = null;
    razorpay_refund_status : string | null = null;

    orderItems : OrderItem[] | null = null;
    myLocation : MyLocation  | null = null;
    assignedPerson : AssignedPerson | null= null;

    constructor(){

    }

    public setRazorpay_refund_status( razorpay_refund_status: string | null) {
        this.razorpay_refund_status = razorpay_refund_status;
    }

    public setRazorpay_refund_id( razorpay_refund_id: string | null) {
        this.razorpay_refund_id = razorpay_refund_id;
    }

    public setRazorpay_refund_amt( razorpay_refund_amt: string | null) {
        this.razorpay_refund_amt = razorpay_refund_amt;
    }

    public getRazorpay_refund_amt() :string | null{
        return this.razorpay_refund_amt;
    }

    public getRazorpay_refund_id() :string | null{
        return this.razorpay_refund_id;
    }

    public getRazorpay_refund_status() :string | null{
        return this.razorpay_refund_status;
    }

    public getRazorpayPaymentId() :string | null{
        return this.razorpayPaymentId;
    }

    public setRazorpayPaymentId( razorpayPaymentId:string | null) {
        this.razorpayPaymentId = razorpayPaymentId;
    }

    public getRazorpay_orderid() :string {
        return this.razorpay_orderid;
    }

    public setRazorpay_orderid( razorpay_orderid:string ) {
        this.razorpay_orderid = razorpay_orderid;
    }

    public setTimestamp( timestamp:string | null) {
        this.timestamp = timestamp;
    }

    public getTimestamp() :string | null{
        return this.timestamp;
    }

    public getApplied_coupon_code() :string | null{
        return this.applied_coupon_code;
    }

    public getApplied_discount_amount() :string | null{
        return this.applied_discount_amount;
    }

    public setApplied_coupon_code( applied_coupon_code:string | null) {
        this.applied_coupon_code = applied_coupon_code;
    }

    public setApplied_discount_amount( applied_discount_amount:string | null) {
        this.applied_discount_amount = applied_discount_amount;
    }

    public getTxnRef() :string | null{
        return this.txnRef;
    }

    public setTxnRef( txnRef:string | null) {
        this.txnRef = txnRef;
    }

    public getPayment_method() :string | null{
        return this.payment_method;
    }

    public setPayment_method( payment_method:string | null) {
        this.payment_method = payment_method;
    }

    public getGrandTotal() :string {
        return this.grandTotal;
    }

    public getSubTotal() :string | null{
        return this.subTotal;
    }

    public getTaxRate() :string | null{
        return this.taxRate;
    }

    public setGrandTotal( grandTotal:string) {
        this.grandTotal = grandTotal;
    }

    public setSubTotal( subTotal:string | null) {
        this.subTotal = subTotal;
    }

    public setTaxRate( taxRate:string | null) {
        this.taxRate = taxRate;
    }

    public getDelivery_rating() :string | null{
        return this.delivery_rating;
    }

    public getFood_rating() :string | null{
        return this.food_rating;
    }

    public setDelivery_rating( delivery_rating:string | null) {
        this.delivery_rating = delivery_rating;
    }

    public setFood_rating(food_rating:string | null) {
        this.food_rating = food_rating;
    }

    public getDate() :string | null{
        return this.date;
    }

    public setDate( date:string | null) {
        this.date = date;
    }

    public setDate_pincode( date_pincode:string | null) {
        this.date_pincode = date_pincode;
    }

    public getDate_pincode() :string | null{
        return this.date_pincode;
    }

    public getDeliveryTimeTaken() :string | null{
        return this.deliveryTimeTaken;
    }

    public setDeliveryTimeTaken( deliveryTimeTaken:string | null) {
        this.deliveryTimeTaken = deliveryTimeTaken;
    }

    public getUserNotes() :string | null{
        return this.userNotes;
    }

    public setUserNotes( userNotes:string | null) {
        this.userNotes = userNotes;
    }

    public getAssignedPerson() :AssignedPerson | null{
        return this.assignedPerson;
    }

    public setMyLocation( myLocation:MyLocation | null) {
        this.myLocation = myLocation;
    }


    public setBillReceipt( billReceipt:string | null) {
        this.billReceipt = billReceipt;
    }

    public setDeliveryFee( deliveryFee:string | null) {
        this.deliveryFee = deliveryFee;
    }

    public getDeliveryFee() :string | null{
        return this.deliveryFee;
    }


    public setPincode_status( pincode_status:string | null) {
        this.pincode_status = pincode_status;
    }

    public getNoOfOrderItems() :string | null{
        return this.noOfOrderItems;
    }

    public setNoOfOrderItems( noOfOrderItems:string | null) {
        this.noOfOrderItems = noOfOrderItems;
    }

    public setDateTime( dateTime:string | null) {
        this.dateTime = dateTime;
    }

    public setPhone(phone:string | null| undefined) {
        this.phone = phone;
    }

    public  getPhone() :string | null | undefined{
        return this.phone;
    }

    public  getAddress() :string | null| undefined{
        return this.address;
    }

    public setAddress( address:string | null| undefined) {
        this.address = address;
    }

    public  getName() :string | null| undefined{
        return this.name;
    }

    public setName( name:string | null| undefined) {
        this.name = name;
    }

    public  getPincode() :string | null| undefined{
        return this.pincode;
    }

    public setPincode( pincode:string | null| undefined) {
        this.pincode = pincode;
    }

    public getOrderItems() :OrderItem[] | null {
        return this.orderItems;
    }

    public setOrderItems(orderItems:OrderItem[] | null) {
        this.orderItems = orderItems;
    }

    public setStatus( status:string | null) {
        this.status = status;
    }

    public  getStatus() :string | null{
        return this.status;
    }

    public  getTime() :string | null{
        return this.time;
    }

    public setTime( time:string | null) {
        this.time = time;
    }

    public  getDay_and_date() :string | null{
        return this.day_and_date;
    }

    public setDay_and_date( day_and_date:string | null) {
        this.day_and_date = day_and_date;
    }

    public  getOrderId() :string {
        return this.orderId;
    }

    public setOrderId( orderId:string ) {
        this.orderId = orderId;
    }

    public setAssignedPersonPhone( assignedPersonPhone:string | null) {
        this.assignedPersonPhone = assignedPersonPhone;
    }

    public setAssignedPerson( assignedPerson:AssignedPerson | null) {
        this.assignedPerson = assignedPerson;
    }

    public  getDateTime() :string | null{
        return this.dateTime;
    }

    public  getPincode_status() :string | null{
        return this.pincode_status;
    }

    public getBillReceipt() :string | null{
        return this.billReceipt;
    }

    public getMyLocation() :MyLocation | null{
        return this.myLocation;
    }

    public  getAssignedPersonPhone() :string | null{
        return this.assignedPersonPhone;
    }
}

