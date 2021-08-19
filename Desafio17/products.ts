class Product {

    public title:string;
    public price:string;
    public thumbnail:string;
    private id:number;

    constructor(title:string, price:string, thumbnail:string, id:any) {
        this.title = title, 
        this.price = price,
        this.thumbnail = thumbnail,
        this.id = id
    }

}

module.exports = Product
