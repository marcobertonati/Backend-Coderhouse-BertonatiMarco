const { Schema, model, now } = require("mongoose");
const {productSchema} = require('./productsMongoose');

// Estructura del documento en MongoDB a través de Mongoose
const cartSchema = new Schema({

  timestamp: {type: Date, default: new Date ()},
  product: [productSchema]

  /* IDEA 1 */
  // timestampCart: {type: String, required: true, max: 40},
  // product: {type: Array, required: true}

  /* IDEA 2 */
//   id: { type: Number, required: true, max: 40 },
//   timestampCart: { type: String, required: true, max: 40 },
//   product: {
//     title: { type: String, required: true, max: 40 },
//     price: { type: Number, required: true },
//     thumbnail: { type: String, required: true },
//     timestamp: { type: String, required: true, max: 40 },
//     description: { type: String, required: true, max: 255 },
//     code: { type: String, required: true, max: 40 },
//     stock: { type: Number, required: true },
//   },

});

const cartModel = model("Cart", cartSchema);

module.exports = cartModel;
