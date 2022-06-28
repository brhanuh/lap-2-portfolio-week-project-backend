const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controllers");
const habitsController = require("../controllers/habits.controllers");
const daysController = require('../controllers/days.controller');

// Habits routes
router.get("/api/habits", habitsController.index);
router.get("/api/habits/:id", habitsController.show);
router.post("/api/habits", habitsController.create);
router.delete("/api/habits/:id", habitsController.destroy);

// Users routes
router.get("/api/users", usersController.index);
router.get("/api/users/:id", usersController.show);
router.post("/api/users", usersController.create);
router.delete("/api/users/:id", usersController.destroy);

//days routes
router.get("/api/days", daysController.index);

module.exports = router;
