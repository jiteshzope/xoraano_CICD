
export class Product {

    private productName : string ='';
    private productPrice : string ='';
    private categoryId : string ='';
    private isAvailable : string ='';
    private categoryName_pincode : string ='';
    private productDeliveryTime : string ='';
    private code : string ='';

    private images : string[]  = [];

    private productId : string =''; // only for website ,NOT for storing in db

    constructor(){

    }

    public getProductId(): string  {
        return this.productId;
    } 

    public setProductId(id : string) {
        this.productId = id ;
    }

    public getCode() :string  {
        return this.code;
    }

    public setCode(code:string) {
        this.code = code;
    }

    public getProductDeliveryTime() :string {
        return this.productDeliveryTime;
    }

    public setProductDeliveryTime(productDeliveryTime:string) {
        this.productDeliveryTime = productDeliveryTime;
    }


    public getCategoryName_pincode():string  {
        return this.categoryName_pincode;
    }

    public setCategoryName_pincode(categoryName_pincode:string) {
        this.categoryName_pincode = categoryName_pincode;
    }

    public getProductPrice() :string {
        return this.productPrice;
    }

    public setProductPrice(productPrice:string) {
        this.productPrice = productPrice;
    }

    public setImages(images:string[]) {
        this.images = images;
    }

    public getImages() : string[]  {
        return this.images;
    }

    public getIsAvailable() :string {
        return this.isAvailable;
    }

    public setIsAvailable(isAvailable:string) {
        this.isAvailable = isAvailable;
    }

    public setProductName(productName:string) {
        this.productName = productName;
    }

    public getProductName() :string {
        return this.productName;
    }

    public setCategoryId(categoryId:string) {
        this.categoryId = categoryId;
    }

    public getCategoryId():string  {
        return this.categoryId;
    }
}

