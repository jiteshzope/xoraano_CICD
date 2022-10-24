
export class CurrentTimes {
    otpRetries : number = 0;
    otpFailedTime : number = 0;

    constructor(){

    }

    public CurrentTimes(otpRetries: number,otpFailedTime: number){
        this.otpFailedTime=otpFailedTime;
        this.otpRetries=otpRetries;
    }

    public getOtpRetries() : number{
        return this.otpRetries;
    }

    public getOtpFailedTime() : number{
        return this.otpFailedTime;
    }

    public setOtpRetries(otpRetries: number)  {
        this.otpRetries = otpRetries;
    }

    public setOtpFailedTime(otpFailedTime: number) {
        this.otpFailedTime = otpFailedTime;
    }


}
