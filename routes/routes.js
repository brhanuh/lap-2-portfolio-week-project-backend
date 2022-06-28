const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controllers");
const habitsController = require("../controllers/habits.controllers");

// Habits routes
router.get("/api/habits", habitsController.index);
router.get("/api/habits/:id", habitsController.show);
router.post("/api/habits", habitsController.create);
router.delete("/api/habits/:id", habitsController.destroy);

// Users routes
router.get("/", usersController.index);
router.get("/:id", usersController.show);
router.post("/", usersController.create);
router.delete("/:id", usersController.destroy);

module.exports = router;
