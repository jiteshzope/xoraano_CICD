import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartPageComponent } from './Components/CartPage/cart-page.component';

import { ContactUsComponent } from './Components/ContactUs/contact-us.component';
import { CreateAccountComponent } from './Components/CreateAccount/create-account.component';
import { EditAccountComponent } from './Components/EditAccount/edit-account.component';
import { HomeComponent } from './Components/Home/home.component';
import { LoginPageComponent } from './Components/LoginPage/login-page.component';

import { MyOrdersComponent } from './Components/MyOrders/my-orders.component';
import { OrderDetailsComponent } from './Components/OrderDetails/order-details.component';
import { PlaceOrderPageComponent } from './Components/PlaceOrderPage/place-order-page.component';
import { PrivacyPolicyComponent } from './Components/PrivacyPolicy/privacy-policy.component';

import { RazorpayCheckoutPageComponent } from './Components/RazorpayCheckoutPage/razorpay-checkout-page.component';

import { TermsOfUseComponent } from './Components/TermsOfUse/terms-of-use.component';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { OrderPlacedPageComponent } from './Components/OrderPlacedPage/order-placed-page.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import firebase from 'firebase/app';
import 'firebase/auth';
import { LoadingSpinnerComponent } from './Components/loading-spinner/loading-spinner.component';
import { NavbarComponent } from './Components/Navbar/navbar.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

//import {BrowserAnimationsModule} from '@angular/animations'
//import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductComponent } from './Components/Product/product.component';

import { MatCardModule } from '@angular/material/card';

import { ToastrModule } from 'ngx-toastr';
import { OrderComponent } from './Components/Order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    CartPageComponent,
    ContactUsComponent,
    CreateAccountComponent,
    EditAccountComponent,
    HomeComponent,
    LoginPageComponent,
    MyOrdersComponent,
    OrderDetailsComponent,
    PlaceOrderPageComponent,
    PrivacyPolicyComponent,
    RazorpayCheckoutPageComponent,
    TermsOfUseComponent,
    OrderPlacedPageComponent,
    LoadingSpinnerComponent,
    NavbarComponent,
    ProductComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatCardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCxxHdMYyUL5LN9NRumUAjzc0j731Q8hkc',
      libraries: ['places']
    }),
    HttpClientModule,
    AngularFireFunctionsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase);
   }else {
      firebase.app(); // if already initialized, use that one
   }
    
  }
}
