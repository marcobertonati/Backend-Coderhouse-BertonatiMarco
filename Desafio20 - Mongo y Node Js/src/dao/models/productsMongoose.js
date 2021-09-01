const { Schema, model } = require('mongoose');

// Estructura del documento en MongoDB a través de Mongoose
const productSchema = new Schema({
    title: {type: String, required: true, max: 40},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true}
})

const productModel = model('Product', productSchema);

module.exports = productModel;