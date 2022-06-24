const express = require("express");
const cors = require("cors");
const habitsRoutes = require("./routes/habits");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", habitsRoutes);

app.get("/api/", (req, res) => {
  res.status(200).send("Hello, server is running");
});

module.exports = app;
