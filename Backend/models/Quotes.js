const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("quote", quoteSchema);
