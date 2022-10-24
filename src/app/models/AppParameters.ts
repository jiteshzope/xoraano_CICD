import { CityParameters } from "./CityParameters";
import { DisplayFoodItem } from "./DisplayFoodItem";

export class AppParameters {

    alertMsg : string='';
    casual_coupon_code : string='';
    checkout_image_url : string='';
    CityParameters : CityParameters = new CityParameters();
    cod_available : string='';
    del_boy : string='';
    displayFoodItems : DisplayFoodItem[] = [];
    eula : string='';
    first_order_coupon_code : string='';
    flagPermitAddress : string='';
    help_content : string='';
    key_id : string='';
    loc_update_interval : string='';
    locationMsg : string='';
    logout_serialno :string='';
    logouta :string='';
    logoutd :string='';
    logoutm :string='';
    onlinepay :string='';
    order_cancellation_details :string='';
    other_options_available :string='';
    phonepe_payment_available :string='';
    privacy_policy :string='';
    retries :string='';
    retries_dcs :string='';
    taxRate :string='';
    track_location_interval :string='';
    upi_id :string='';
    upi_id_gpay :string='';
    upi_id_phonepe :string='';

    constructor(){
        
    }

}