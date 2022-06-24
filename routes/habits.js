const express = require("express");
const router = express.Router();
const habitsController = require("../controllers/habits.controllers");

router.get("/api/habits", habitsController.index);

module.exports = router;
