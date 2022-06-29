const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", routes);

app.get("/api/", (req, res) => {
  res.status(200).send("Hello, server is running");
});

module.exports = app;
