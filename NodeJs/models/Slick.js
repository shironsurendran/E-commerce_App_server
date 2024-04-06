const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let slickSchema = new Schema(
  {
    name: {
      type: String
    }
  },
  {
    collection: "slick"
  }
);

module.exports = mongoose.model("slick", slickSchema);