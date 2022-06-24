const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/", (req, res) => {
  res.status(200).send("Hello, server is running");
});

module.exports = app;
