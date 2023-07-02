const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const host = "0.0.0.0";
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
// Mounting news
const newsRouter = require("./routes/news");
app.use("/", newsRouter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

try {
  mongoose.connect("mongodb://localhost:27017/news", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Connected to DB successfully!");
} catch {
  console.error("Error occurred while connecting to DB");
}

app.listen(port, host, () =>
  console.log(`Server started! listening on port ${port}!`)
);
