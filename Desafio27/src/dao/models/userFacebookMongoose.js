const { Schema, model } = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

// Estructura del documento en MongoDB a través de Mongoose
const userFBkSchema = new Schema({
    user: { type: Object }
})

userFBkSchema.plugin(findOrCreate);

const userFacebookModel = model('UsersFacebook', userFBkSchema);

module.exports = userFacebookModel;