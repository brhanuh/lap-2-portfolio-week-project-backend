const express = require("express");
const router = express.Router();
const habitsController = require("../controllers/habits.controllers");

router.get("/api/habits", habitsController.index);
router.get("/api/habits/:id", habitsController.show);
router.post("/api/habits", habitsController.create);
router.delete("/api/habits/:id", habitsController.destroy);


module.exports = router;
