
export class CartItem {
    productName: string ='';
    image: string ='';
    quantity: string ='';
    amount: string = '0';
    code: string ='';

    constructor(productName: string , image: string , quantity: string , amount: string , code: string  ){
        this.productName = productName;
        this.image = image;
        this.quantity = quantity;
        this.amount = amount;
        this.code = code;
    }

    public setCode(code: string ) {
        this.code = code;
    }

    public getCode() : string  {
        return this.code;
    }

    public setImage(image: string ) {
        this.image = image;
    }

    public getImage() : string {
        return this.image;
    }

    public getProductName(): string  {
        return this.productName;
    }

    public setProductName(productName: string ) {
        this.productName = productName;
    }

    public getQuantity() : string {
        return this.quantity;
    }

    public setQuantity(quantity: string ) {
        this.quantity = quantity;
    }

    public getAmount() : string {
        return this.amount;
    }

    public setAmount(amount: string ) {
        this.amount = amount;
    }



}

