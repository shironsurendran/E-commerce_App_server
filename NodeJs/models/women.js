const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')
// var mongooseAggregatePaginate = require('mongoose-aggregate-paginate')

const Women = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  brand:{
    type:String
  },
  name: {
    type: String
  },
  Rate: {
    type: Number
  },
  description: {
    type: String
  },
  code:{
    type:String,
    required:true
  },
  productImage: {
    type: Array
  },
  size: {
    type: Array
  },
  offer:{
    type:Number
  }
});
Women.plugin(mongoosePaginate)
let womens = module.exports = mongoose.model('womens',Women);