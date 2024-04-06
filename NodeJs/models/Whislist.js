const mongoose = require('mongoose');

var UserSchema ={
    type:mongoose.Schema.Types.ObjectId,
    ref: "customer"
}
var ProductSchema ={
    type:mongoose.Schema.Types.ObjectId,
    ref: "products"
}
const WhislistSchema = new mongoose.Schema({
    userId:UserSchema,
    Product:ProductSchema
})

module.exports = mongoose.model('whislist',WhislistSchema);