const mongoose = require("mongoose");
const shortid = require("shortid");

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    default: shortid.generate,
  },
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
