import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WindowService } from 'src/app/Services/window.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/Services/user.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
//import { environment } from 'src/environments/environment';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm | undefined;

  @ViewChild('f1') form1: NgForm | undefined;

  faArrowCircleLeft = faArrowCircleLeft;

  windowRef: any;

  verificationCode: string = '';

  user: any;

  phoneNumber: string = '';

  isLoading: boolean = false;

  disablebtn: boolean = false;

  isLoginMode: boolean = true;

  isFormdisabled: boolean = false;

  newPassword: any;
  //isForm1disabled: boolean = false;

  userSubscription: Subscription | undefined;

  redirectUrl: string | undefined | null;

  isRecaptchaSolved: boolean = false;

  constructor(private toastr: ToastrService, private win: WindowService, private auth: AngularFireAuth, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
    //this.windowRef.recaptchaVerifier = null;
    this.windowRef.confirmationResult = null;
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
    this.toastr.error('',"recaptcha expired !! please solve again !")
  }

  ngOnInit() {

    this.redirectUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    //console.log("redirectUrl on login page : ", this.redirectUrl)

    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
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

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {

        this.isLoading = false;

        this.windowRef.confirmationResult = result;

        this.toastr.success("An otp has been sent successfully");

      })
      .catch(error => {
        this.isLoading = false;
        this.isFormdisabled = false;
        this.toastr.error('',"An error occured while sending otp , err : ", error);
        //console.log("An error occured while sending otp , err : ", error)
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

        if (this.isLoginMode) {

          //console.log("login mode");
          if (user && user.phoneNumber && user.uid) {

            this.userService.isValidLogin(user.phoneNumber, this.form?.value.userPassword).pipe(take(1)).subscribe((isValid: Boolean) => {

              this.isLoading = false;
              this.isFormdisabled = false;

              if (isValid) {
                //console.log("user login successfull !!")
                this.toastr.success('', 'Login successfull !!');

                let url: string = this.redirectUrl ? this.redirectUrl : '/home';
                this.router.navigate([url]);
              } else {
                //console.log("user login failed!! Incorrect login information");
                this.toastr.error('','Login failed!! Incorrect login information')
                this.auth.signOut();
              }

            },
              err => {
                this.isLoading = false;
                this.isFormdisabled = false;
                this.auth.signOut();
                //console.log("An error occurred while fetching user from userService : ", err);
              });

          } else {

            //console.log("user is invalid : ", user);
            this.isLoading = false;
            this.isFormdisabled = false;
            this.auth.signOut();
          }

        } else {
          //console.log("Forgot password mode !!");
          this.isLoading = false;
          this.isFormdisabled = false;
          this.resetPassword();
        }

      })
      .catch((error: any) => {
        this.windowRef.confirmationResult = null;
        this.isLoading = false;
        this.isFormdisabled = false;
        this.auth.signOut();
        this.toastr.error('','Incorrect code entered')
        //console.log(error, "Incorrect code entered")
      });
  }

  resetPassword() {
    this.isLoading = true;


    this.userService.checkIfUserExists(this.user.phoneNumber).pipe(take(1)).subscribe((isUserRegistered: boolean) => {

      let newPassword = this.newPassword;
      //console.log(newPassword);
      this.userService.resetPassword(newPassword, this.user.phoneNumber).then(_ => {
        this.isLoading = false;

        //console.log("Password reset successfull");

        this.toastr.success('Password reset successfull');

        let url: string = this.redirectUrl ? this.redirectUrl : '/home';
        this.router.navigate([url]);

      })
        .catch(err => {
          //console.log("An error occured while password reset ,while saving the new password")
          this.isLoading = false;

          this.auth.signOut();
        });

    },
      err => {
        //console.log("An error occured while password reset ,while checking the existence of user in list of phones")
        this.isLoading = false;

        this.auth.signOut();
      });

  }

  getIfErrorExists(errors: any, type: string) {

    if (type === 'required') {
      return errors ? (errors.required ? errors.required : false) : false;
    }

    if (type === 'minlength') {
      return errors ? (errors.minlength ? errors.minlength : false) : false;
    }

    if (type === 'minlength_maxlength') {
      return errors ? ((errors.minlength || errors.maxlength) ? (errors.minlength || errors.maxlength) : false) : false;
    }

    return false;

  }

  logout() {

    this.auth.signOut();

  }

}
