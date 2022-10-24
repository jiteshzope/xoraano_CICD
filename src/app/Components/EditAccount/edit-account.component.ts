import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

import firebase from 'firebase/app';
import 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { pipe, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/Services/user.service';
import { WindowService } from 'src/app/Services/window.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm | undefined;

  faArrowCircleLeft = faArrowCircleLeft;

  windowRef: any;

  verificationCode: string = '';

  isLoading: boolean = false;

  user: any;

  isFormdisabled: boolean = false;

  userSubscription: Subscription | undefined;

  userInfo: User | null = null;

  redirectUrl : string | undefined | null;

  isRecaptchaSolved: boolean = false;

  constructor(private toastr : ToastrService , private userService: UserService,private route : ActivatedRoute, private auth: AngularFireAuth, private win: WindowService, private router: Router) { }

  ngOnDestroy() {
    
  }

  callback(response: any) {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    this.isRecaptchaSolved = true;
    //console.log("recaptcha solved !! response is : ", response);
  }

  expired_callback() {
    this.isRecaptchaSolved = false;
    // Response expired. Ask user to solve reCAPTCHA again.
    //console.log("recaptcha expired !! please solve again !");
    this.toastr.error('','recaptcha expired !! please solve again !');
  }

  ngOnInit() {

    this.redirectUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    //console.log("redirectUrl on login page : ",this.redirectUrl)

    this.isLoading = true;
    this.userService.getUserInfo().pipe(take(1)).subscribe(userInfo => {

      this.isLoading = false;
      this.userInfo = userInfo;

      //console.log("ng on init : userinfo is ",userInfo);

      if (this.userInfo != null && this.userInfo.getPhone() != null) {

        //console.log("ng on init : userinfo.getphone() is ",userInfo?.getPhone());

        this.form?.form.setValue({
          userName: this.userInfo.getName(),
          userPhone: this.userInfo.getPhone()?.substr(3),
          userPassword: this.userInfo.getPassWord(),
          userPincode: this.userInfo.getPincode(),
          userAddress: this.userInfo.getAddress()
        });
      }
    });

    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'callback': this.callback.bind(this),
      'expired-callback': this.expired_callback.bind(this)
    });

    this.windowRef.recaptchaVerifier.render();

  }

  sendLoginCode() {

    if(!this.isRecaptchaSolved){
      this.toastr.error('','Please solve the recaptcha first !!');
      return;
    }

    this.isLoading = true;
    this.isFormdisabled = true;
    //console.log(this.form);

    const appVerifier = this.windowRef.recaptchaVerifier;

    let num = '+91' + this.form?.value.userPhone;

    //console.log(num);

    firebase.auth().signInWithPhoneNumber(num, appVerifier).then(result => {

      this.isLoading = false;
      this.windowRef.confirmationResult = result;

      this.toastr.success("An otp has been sent successfully");

    }).catch(error => {
      this.isLoading = false;
      this.isFormdisabled = false;
      this.toastr.error('',"An error occured while sending otp , err : ", error);
      //console.log('An error occured while sending OTP !! ', error)
    });

  }

  verifyCode() {
    this.isLoading = true;
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then((result: any) => {

        //console.log(result); //{user: Jm, credential: null, additionalUserInfo: xg, operationType: "signIn"}

        let user = result.user;
        this.user = user;

        this.windowRef.confirmationResult = null;

        this.saveUser();

      })
      .catch((error: any) => {
        this.windowRef.confirmationResult = null;
        this.isLoading = false;
        this.isFormdisabled = false;

        this.toastr.error('','Incorrect code entered !');
        //console.log(error, "Incorrect code entered?")
      });
  }

  saveUser() {

    this.userInfo?.setPhone('+91'+this.form?.value.userPhone);
    this.userInfo?.setPassWord(this.form?.value.userPassword);
    this.userInfo?.setAddress(this.form?.value.userAddress);
    this.userInfo?.setPincode(this.form?.value.userPincode);
    this.userInfo?.setName(this.form?.value.userName);

    //console.log("user info is :", this.userInfo);

    let userInfo = this.userInfo ? this.userInfo : new User();

    if (userInfo.getPhone() != null) {
      this.userService.saveUserInfo(userInfo).then(_ => {
        //console.log("user info saved successfully !");

        this.toastr.success('Acount edited successfully!!');

        let url: string = this.redirectUrl ? this.redirectUrl : '/home';
        this.router.navigate([url]);
        
        this.isLoading = false;
        this.isFormdisabled = false;
      });
    } else {
      //console.log("user is empty !!");
      this.isLoading = false;
      this.isFormdisabled = false;
    }


  }

  getIfErrorExists(errors : any, type : string){

    if(type === 'required'){
      return errors ? (errors.required ? errors.required : false) : false;
    }

    if(type === 'minlength'){
      return errors ? (errors.minlength ? errors.minlength : false) : false;
    }

    if(type === 'minlength_maxlength'){
      return errors ? ((errors.minlength || errors.maxlength) ? (errors.minlength || errors.maxlength)  : false) : false;
    }

    return false;

  }


}
