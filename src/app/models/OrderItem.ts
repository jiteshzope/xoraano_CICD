
export class OrderItem {
    private productName : string| null = null;
    private quantity : string| null = null;
    private amount : string| null = null;
    private image : string| null = null;
    private code : string| null = null;


    constructor(){

    }

    public getCode() : string| null {
        return this.code;
    }

    public setCode(code: string| null) {
        this.code = code;
    }

    public setQuantity(quantity: string| null) {
        this.quantity = quantity;
    }

    public setAmount(amount: string| null) {
        this.amount = amount;
    }

    public getAmount() : string| null {
        return this.amount;
    }

    public getQuantity() : string| null {
        return this.quantity;
    }

    public setProductName(productName: string| null) {
        this.productName = productName;
    }

    public getProductName() : string| null {
        return this.productName;
    }

    public getImage() : string| null {
        return this.image;
    }

    public setImage(image: string| null) {
        this.image = image;
    }


}
