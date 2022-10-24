import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartPageComponent } from './Components/CartPage/cart-page.component';
import { ContactUsComponent } from './Components/ContactUs/contact-us.component';
import { CreateAccountComponent } from './Components/CreateAccount/create-account.component';
import { EditAccountComponent } from './Components/EditAccount/edit-account.component';
import { HomeComponent } from './Components/Home/home.component';
import { LoginPageComponent } from './Components/LoginPage/login-page.component';
import { MyOrdersComponent } from './Components/MyOrders/my-orders.component';
import { OrderDetailsComponent } from './Components/OrderDetails/order-details.component';
import { OrderPlacedPageComponent } from './Components/OrderPlacedPage/order-placed-page.component';
import { PlaceOrderPageComponent } from './Components/PlaceOrderPage/place-order-page.component';
import { PrivacyPolicyComponent } from './Components/PrivacyPolicy/privacy-policy.component';
import { RazorpayCheckoutPageComponent } from './Components/RazorpayCheckoutPage/razorpay-checkout-page.component';
import { TermsOfUseComponent } from './Components/TermsOfUse/terms-of-use.component';
import { PlaceOrderPageGuardService } from './RouteGuards/place-order-page-guard.service';
import { OrderPlacedPageGuardService } from './RouteGuards/order-placed-page-guard.service';
import { RazorpayPageGuardService } from './RouteGuards/razorpay-page-guard.service';
import { OrderDetailsGuardService } from './RouteGuards/order-details-guard.service';
import { TempOrderResolverService } from './Resolvers/temp-order-resolver.service';
import { AuthGuardService } from './RouteGuards/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  { path: 'cart', component: CartPageComponent },

  { path: 'checkout', component: PlaceOrderPageComponent, canActivate: [AuthGuardService, PlaceOrderPageGuardService]},

  { path: 'payment/:orderId', component: RazorpayCheckoutPageComponent, canActivate: [AuthGuardService, 
    RazorpayPageGuardService], resolve : {tempOrder : TempOrderResolverService}},

  { path: 'login', component: LoginPageComponent, canActivate: [AuthGuardService] },

  { path: 'edit-account', component: EditAccountComponent, canActivate: [AuthGuardService]},

  { path: 'create-account', component: CreateAccountComponent, canActivate: [AuthGuardService] },

  { path: ':orderId/order-success', component: OrderPlacedPageComponent, canActivate: [AuthGuardService, OrderPlacedPageGuardService]},

  { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuardService]},

  { path: 'my-orders/:orderId', component: OrderDetailsComponent, canActivate: [AuthGuardService, OrderDetailsGuardService]},

  { path: 'contact-us', component: ContactUsComponent },

  { path: 'terms-of-use', component: TermsOfUseComponent},
  
  { path: 'privacy-policy', component: PrivacyPolicyComponent },

  { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{anchorScrolling : 'enabled' , useHash:true })], // use this for static hosting
  //imports: [RouterModule.forRoot(routes,{anchorScrolling : 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
