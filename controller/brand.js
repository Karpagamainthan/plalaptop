const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  brand_name: { type: String, default: null },
  ram: { type: String},
  rom: { type: String},
  price: { type: String},
  processor: { type: String},
  os:{ type: String },
  color :{ type: String },
  cus_rating: { type: String },
});

module.exports = mongoose.model("brand", userSchema);

