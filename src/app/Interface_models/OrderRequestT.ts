
import { AssignedPersonT } from './AssignedPersonT';
import { MyLocationT } from './MyLocationT';
import { OrderItemT } from './OrderItemT';

export interface OrderRequestT {

     name : string | null ;
     phone : string | null ;
     address : string | null ;
     pincode : string | null ;
     orderId : string | null ;
     day_and_date : string | null ;
     status : string | null ;
     time : string | null ;
     dateTime : string | null ;
     noOfOrderItems : string | null ;
     timestamp : string | null ;
     pincode_status : string | null ;
     deliveryFee : string | null ;
     billReceipt : string | null ;
     userNotes : string | null ;
     deliveryTimeTaken : string | null ;
     date : string | null ;
     date_pincode : string | null ;
     delivery_rating : string | null ;
     food_rating : string | null ;
     subTotal : string | null ;
     grandTotal : string | null ;
     taxRate : string | null ;
     payment_method : string | null ;
     txnRef : string | null ;
     applied_coupon_code : string | null ;
     applied_discount_amount : string | null ;
     assignedPersonPhone : string | null ;
     razorpay_orderid : string | null ;
     razorpayPaymentId : string | null ;
     razorpay_refund_id : string | null ;
     razorpay_refund_amt : string | null ;
     razorpay_refund_status : string | null ;

     orderItems : OrderItemT[] | null ;
     myLocation : MyLocationT  | null ;
     assignedPerson : AssignedPersonT | null;

}