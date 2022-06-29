const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controllers");
const habitsController = require("../controllers/habits.controllers");
const authControllers = require("../controllers/auth.controllers");

// Habits routes
router.get("/api/habits", habitsController.index);
router.get("/api/habits/:id", habitsController.show);
router.post("/api/habits", habitsController.create);
router.delete("/api/habits/:id", habitsController.destroy);

// Users routes
router.get("/", usersController.index);
router.get("/:id", usersController.show);
// router.post("/", usersController.create);
router.delete("/:id", usersController.destroy);

// Authorisation routes
router.post("/api/register", authControllers.registration);
router.post("/api/login", authControllers.login);

module.exports = router;
