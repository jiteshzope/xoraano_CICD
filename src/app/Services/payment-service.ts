import { Injectable, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService implements OnInit {

  constructor(private fns: AngularFireFunctions) { }

  ngOnInit() {

  }

  createRazorpayOrder(amount : string , receipt : string) : Observable<any> {

    const callable = this.fns.httpsCallable('createRazorapayOrder');
    const data$ = callable({ 'amount': amount, 'receipt' : receipt });

    return data$;

  }

  verifySignature(razorpayPaymentId : string, razorpayorderId :string, razorpaysignature :string) : Observable<any> {

    const callable = this.fns.httpsCallable('verifySignature');
    const data$ = callable({ 'razorpayPaymentId': razorpayPaymentId, 'razorpayorderId' : razorpayorderId, 'razorpaysignature' : razorpaysignature });

    return data$;

  }

}
