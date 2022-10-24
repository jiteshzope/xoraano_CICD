
export class DisplayInfo {

    private delivery_time : string | null =null;
    private slogan : string | null =null;
    private varieties : string | null =null;
    private payment_method : string | null =null;

    constructor(){

    }

    public getPayment_method() : string | null{
        return this.payment_method;
    }

    public setPayment_method(payment_method:string | null) {
        this.payment_method = payment_method;
    }

    public getDelivery_time() : string | null{
        return this.delivery_time;
    }

    public getSlogan() : string | null{
        return this.slogan;
    }

    public getVarieties() : string | null{
        return this.varieties;
    }

    public setDelivery_time(delivery_time:string | null) {
        this.delivery_time = delivery_time;
    }

    public setSlogan(slogan:string | null) {
        this.slogan = slogan;
    }

    public setVarieties(varieties:string | null) {
        this.varieties = varieties;
    }
}
