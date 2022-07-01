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
router.put("/api/habits/:id", habitsController.update);

// Users routes
router.get("/api/users", usersController.index);
router.get("/api/users/:id", usersController.show);
router.delete("/api/users/:id", usersController.destroy);

// Authorisation routes
router.post("/api/register", authControllers.registration);
router.post("/api/login", authControllers.login);

module.exports = router;
