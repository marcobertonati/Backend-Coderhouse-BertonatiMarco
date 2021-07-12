class Product {

    id = 0
    constructor(title, price, thumbnail, id = this.id) {
        this.title = title, 
        this.price = price,
        this.thumbnail = thumbnail,
        this.id = id++
    }

}

module.exports = {Product}