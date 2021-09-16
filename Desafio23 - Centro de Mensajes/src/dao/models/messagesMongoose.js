const { Schema, model } = require('mongoose');

// Estructura del documento en MongoDB a través de Mongoose
const msgSchema = new Schema({
    user: {type: String, required: true, max: 40},
    msg: {type: String, required: true, max: 255},
    date: {type: String, required: true}
})

const msgModel = model('Message', msgSchema);

module.exports = msgModel;