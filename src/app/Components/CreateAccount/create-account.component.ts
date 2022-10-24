import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

import firebase from 'firebase/app';
import 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/Services/user.service';
import { WindowService } from 'src/app/Services/window.service';
//import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm | undefined;

  faArrowCircleLeft = faArrowCircleLeft;

  windowRef: any;

  user: any;

  verificationCode: string = '';

  isLoading: boolean = false;

  isFormdisabled: boolean = false;

  userSubscription: Subscription | undefined;

  redirectUrl : string | undefined | null;

  isRecaptchaSolved: boolean = false;

  constructor(private toastr: ToastrService, private userService: UserService,private route : ActivatedRoute, private auth: AngularFireAuth, private win: WindowService, private router: Router) { }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  callback(response: any) {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    this.isRecaptchaSolved = true;
    //console.log("recaptcha solved !! response is : ", response);
  }

  expired_callback() {
    this.isRecaptchaSolved = false;
    // Response expired. Ask user to solve reCAPTCHA again.
    //console.log("recaptcha expired !! please solve again !")
    this.toastr.error('',"recaptcha expired !! please solve again !");
  }

  ngOnInit() {

    this.redirectUrl = this.route.snapshot.queryParams['returnUrl'];

    //this.toastr.success('onInit!', 'Component initialized success!', { timeOut: 3000 });

    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container1', {
      'callback': this.callback.bind(this),
      'expired-callback': this.expired_callback.bind(this)
    });

    this.windowRef.recaptchaVerifier.render();


    this.isLoading = true;
    let flag = true;
    this.userSubscription = this.auth.user.subscribe(user => {
      if (flag) {
        this.isLoading = false;
        flag = false;
      }
      this.user = user;
      //console.log(user);
    });

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

  verifyLoginCode() {
    this.isLoading = true;
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then((result: any) => {

        this.windowRef.confirmationResult = null;

        //console.log(result); // this object can be used too to get the current user info  // {user: Jm, credential: null, additionalUserInfo: xg, operationType: "signIn"}
        let user = result.user;
        this.user = user;

        if (user && user.phoneNumber && user.uid) {

          this.userService.checkIfUserExists(user.phoneNumber).pipe(take(1)).subscribe((userExists: boolean) => {


            //console.log("userExists value is : ", userExists);
            if (!userExists) {

              if (user.phoneNumber && user.uid) {
                this.saveUser(user.phoneNumber, user.uid);
              } else {
                //console.log("phone or uid is null : ", user.phoneNumber, user.uid);
                this.isLoading = false;
                this.isFormdisabled = false;
                this.auth.signOut();
              }

            } else {
              // user with this mobile already exists
              // navigate to login page with a toast

              this.toastr.error('','This mobile number is already Registered !');

              //console.log("user already exists in db !!")

              this.auth.signOut().then(_ => {
                this.isLoading = false;
                this.isFormdisabled = false;
                this.router.navigate(['/login']);

              });

            }

          },
            err => {
              //console.log("a db error occured while check If User Exists,  error : ", err);
              this.isLoading = false;
              this.isFormdisabled = false;
              this.auth.signOut();
            });

        } else {
          //console.log("user is invalid : ", user);
          this.isLoading = false;
          this.isFormdisabled = false;
          this.auth.signOut();
        }

      })
      .catch((error: any) => {
        this.isLoading = false;
        this.isFormdisabled = false;
        this.toastr.error('','Incorrect code entered !');
        //console.log(error, "Incorrect code entered?")
      });
  }

  saveUser(phone: string, uid: string) {

    let user = new User();
    user.setName(this.form?.value.userName);
    user.setPhone('+91' + this.form?.value.userPhone);
    user.setAddress(this.form?.value.userAddress);
    user.setPassWord(this.form?.value.userPassword);
    user.setPincode(this.form?.value.userPincode);

    user.setNoOfOrders('0');
    user.setPincode_noOfOrders(user.getPincode() + '_0');
    user.setEmail('');
    user.setFcm_token('');
    user.setDay_date_time_of_registeration(user.generateCurrentDayDateTime());
    user.setLast_seen('');
    user.setUid(uid);

    this.userService.saveUserInfo(user).then(() => {

      

      this.userService.updateListRegisteredUserPhonesWithNewUser(phone).then(_ => {
        this.isLoading = false;
        this.isFormdisabled = false;
        //console.log("success creating account");
        //console.log("success registering user in list of registered phones");

        this.toastr.success("Account created successfully !!");

        let url: string = this.redirectUrl ? this.redirectUrl : '/home';
        this.router.navigate([url]);
        
      }).catch(err => {
        this.isLoading = false;
        this.isFormdisabled = false;
        this.auth.signOut();
        //console.log("Error registering user in list of registered phones , err :", err);
      });

      // pending : navigate user to some url on successfull account creation

    }).catch(err => {
      this.isLoading = false;
      this.isFormdisabled = false;
      this.auth.signOut();
      //console.log("An error occured while saving new user to db , err : ", err)

    });

  }

  logout() {

    this.auth.signOut();

  }

}
