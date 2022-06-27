const express = require("express");
const cors = require("cors");
const habitsRoutes = require("./routes/habits");
const usersRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/habits', habitsRoutes);
app.use('/users', usersRoutes);

app.get("/api/", (req, res) => {
  res.status(200).send("Hello, server is running");
});

module.exports = app;
