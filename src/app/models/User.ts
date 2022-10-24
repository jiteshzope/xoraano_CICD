
export class User{

    private name : string ='';
    private passWord : string ='';
    private address : string ='';
    private phone : string ='';
    private pincode : string ='';
    private uid : string ='';
    private fcm_token : string ='';
    private email : string ='';
    private noOfOrders : string ='';
    private pincode_noOfOrders : string ='';
    private day_date_time_of_registeration : string ='';
    private last_seen : string ='';

    // make some change to the constructor so that it can be used both to create/update the user 

    /*
    constructor(name : string , phone : string , password : string ,address : string ,pincode : string ,
        uid : string ,fcm_token : string ,email : string ){

        this.name = name;
        this.passWord = password;
        this.address = address;
        this.phone=phone;
        this.pincode = pincode;
        this.uid=uid;
        this.fcm_token=fcm_token;
        this.email=email;
        this.noOfOrders = "0";
        this.pincode_noOfOrders = pincode+"_"+"0";
        this.last_seen="";

        this.day_date_time_of_registeration = this.generateCurrentDayDateTime();
    }
    */

    // now just create an object & set all the fields from outside
    constructor(){

    }

    public generateCurrentDayDateTime(){

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const d = new Date();
        const day = days[d.getDay()].substr(0,3);
        const date = d.getDate();
        const month = months[d.getMonth()].substr(0,3);
        const year = d.getFullYear();

        let hours = d.getHours() > 12 ? d.getHours() - 12 : (d.getHours() === 0 ? 12 : (d.getHours() < 10 ? '0'+d.getHours() : d.getHours()));
        hours = +hours < 10 ? '0'+ (hours) : hours ;
        const am_pm = d.getHours() > 11 ? 'PM' : 'AM' ;
        const minutes = d.getMinutes() < 10 ? '0'+d.getMinutes() : d.getMinutes();

        return day+', '+date+' '+month+' '+year+' '+hours+'.'+minutes+' '+am_pm; // 'Wed, 16 Sep 2020 06.03 PM'

    }

    public setLast_seen( last_seen:string ) {
        this.last_seen = last_seen;
    }

    public  getLast_seen():string  {
        return this.last_seen;
    }
    
    public setDay_date_time_of_registeration( day_date_time_of_registeration:string ) {
        this.day_date_time_of_registeration = day_date_time_of_registeration;
    }

    public getDay_date_time_of_registeration():string  {
        return this.day_date_time_of_registeration;
    }

    public  getNoOfOrders():string  {
        return this.noOfOrders;
    }

    public  getPincode_noOfOrders():string  {
        return this.pincode_noOfOrders;
    }

    public setNoOfOrders( noOfOrders:string ) {
        this.noOfOrders = noOfOrders;
    }

    public setPincode_noOfOrders( pincode_noOfOrders:string ) {
        this.pincode_noOfOrders = pincode_noOfOrders;
    }

    public  getEmail():string  {
        return this.email;
    }

    public setEmail( email:string ) {
        this.email = email;
    }

    public  getFcm_token():string  {
        return this.fcm_token;
    }

    public setFcm_token( fcm_token:string ) {
        this.fcm_token = fcm_token;
    }

    public  getUid():string  {
        return this.uid;
    }

    public setUid( uid:string ) {
        this.uid = uid;
    }

    public  getPincode():string  {
        return this.pincode;
    }

    public setPincode(pincode:string ) {
        this.pincode = pincode;
    }

    public  getName():string  {
        return this.name;
    }

    public  getPassWord():string  {
        return this.passWord;
    }

    public setName( name:string ) {
        this.name = name;
    }

    public setPassWord( passWord:string ) {
        this.passWord = passWord;
    }

    public getPhone():string  {
        return this.phone;
    }

    public setPhone( phone:string ) {
        this.phone = phone;
    }

    public getAddress():string  {
        return this.address;
    }

    public setAddress( address:string ) {
        this.address = address;
    }
}

