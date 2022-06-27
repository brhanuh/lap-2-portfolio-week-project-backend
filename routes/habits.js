const express = require("express");
const router = express.Router();
const habitsController = require("../controllers/habits.controllers");

router.get("/", habitsController.index);

module.exports = router;
