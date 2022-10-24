
export class Category {

    private name : string ='';
    private image : string ='';
    private pincode : string ='';
    private isAvailable : string ='';
    private code : string ='';
    private categoryId : string =''; // only for website , NOT for storing in db

    constructor(){

    }

    public getCategoryId(): string  {
        return this.categoryId;
    } 

    public setCategoryId(id : string ) {
        this.categoryId = id ;
    }

    public getCode(): string  {
        return this.code;
    }

    public setCode(code: string ) {
        this.code = code;
    }

    public getIsAvailable(): string  {
        return this.isAvailable;
    }

    public  getPincode() : string {
        return this.pincode;
    }

    public  setPincode(pincode: string ) {
        this.pincode = pincode;
    }

    public getName() : string {
        return this.name;
    }

    public  getImage() : string {
        return this.image;
    }

    public setName( name: string ) {
        this.name = name;
    }

    public setIsAvailable( isAvailable: string ) {
        this.isAvailable = isAvailable;
    }

    public setImage( image: string ) {
        this.image = image;
    }

}

