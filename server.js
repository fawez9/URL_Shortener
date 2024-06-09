const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ShortUrl = require("./models/shortUrl");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.json());

app.post("/shorten", async (req, res) => {
  const { full, short } = req.body;
  try {
    let shortUrl;
    if (short) {
      shortUrl = await ShortUrl.create({ full, short });
    } else {
      shortUrl = await ShortUrl.create({ full });
    }

    res.json({ "full URL: ": shortUrl.full, "short URL: ": shortUrl.short });
  } catch (err) {
    return res.status(500).json({ error: "failed to shorten URL" });
  }
});

app.get("/:short", async (req, res) => {
  const { short } = req.params;
  try {
    const url = await ShortUrl.findOne({ short });
    if (url) {
      return res.redirect(url.full);
    } else {
      return res.status(404).json({ error: "URL not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "ERROR ON REDIRECTING" });
  }
});

app.listen(process.env.PORT, () => {
  console.log("app running on port " + process.env.PORT);
});
