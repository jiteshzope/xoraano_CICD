import { MyLocation } from './MyLocation';

export class DeliveryPerson {
    private name : string | null =null;
    private image : string | null =null;
    private mobileNo : string | null =null;
    private password : string | null =null;
    private pincode : string | null =null;
    private is_blocked : string | null =null;
    private my_location : MyLocation | null = null;

    constructor(name : string | null, image : string | null, mobileNo : string | null, password : string | null, pincode : string | null){

        this.name=name;
        this.image=image;
        this.mobileNo=mobileNo;
        this.password=password;
        this.pincode=pincode;
    }

    public getIs_blocked() : string | null{
        return this.is_blocked;
    }

    public setMy_location(my_location : MyLocation) {
        this.my_location = my_location;
    }

    public getMy_location() : MyLocation | null{
        return this.my_location;
    }

    public setPincode(pincode: string | null) {
        this.pincode = pincode;
    }

    public getPincode(): string | null {
    return this.pincode;
    }

    public getImage() : string | null{
        return this.image;
    }

    public getMobileNo() : string | null{
        return this.mobileNo;
    }

    public getName() : string | null{
        return this.name;
    }

    public getPassword(): string | null {
        return this.password;
    }

    public setImage(image: string | null) {
        this.image = image;
    }

    public setMobileNo(mobileNo: string | null) {
        this.mobileNo = mobileNo;
    }

    public setName(name: string | null) {
        this.name = name;
    }

    public setPassword(password: string | null) {
        this.password = password;
    }

}
