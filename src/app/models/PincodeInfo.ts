
export class PincodeInfo {

     minOrderAmt : string = '0';
     appStatus : string ='';
     msg_appstatus : string ='';
     deliveryFee : string ='0';
     ref_latitude : string ='0';
     ref_longitude : string ='0';
     order_radius : string = '10000';
     maxOrderAmt : string ='1500';

    constructor(){

    }

    public getMaxOrderAmt() :string {
        return this.maxOrderAmt;
    }

    public setMaxOrderAmt(maxOrderAmt:string ) {
        this.maxOrderAmt = maxOrderAmt;
    }

    public getOrder_radius():string  {
        return this.order_radius;
    }

    public getRef_latitude():string  {
        return this.ref_latitude;
    }

    public getRef_longitude() :string {
        return this.ref_longitude;
    }

    public setOrder_radius(order_radius:string ) {
        this.order_radius = order_radius;
    }

    public setRef_latitude(ref_latitude:string ) {
        this.ref_latitude = ref_latitude;
    }

    public setRef_longitude(ref_longitude:string ) {
        this.ref_longitude = ref_longitude;
    }

    public getAppStatus() :string {
        return this.appStatus;
    }

    public getDeliveryFee() :string {
        return this.deliveryFee;
    }

    public getMinOrderAmt():string  {
        return this.minOrderAmt;
    }

    public getMsg_appstatus():string  {
        return this.msg_appstatus;
    }

    public setAppStatus(appStatus:string ) {
        this.appStatus = appStatus;
    }

    public setDeliveryFee(deliveryFee:string ) {
        this.deliveryFee = deliveryFee;
    }

    public setMinOrderAmt(minOrderAmt:string ) {
        this.minOrderAmt = minOrderAmt;
    }

    public setMsg_appstatus(msg_appstatus:string ) {
        this.msg_appstatus = msg_appstatus;
    }

}
