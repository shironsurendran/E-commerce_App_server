const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  selectedOption:{
      type:String,
      required:true
  },
  phone:{
      type:Number,
      required:true
  }
});

module.exports = User = mongoose.model("customers", UserSchema);
