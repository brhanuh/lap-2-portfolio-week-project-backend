const Habit = require("../models/habits.models");

async function index(req, res) {
  try {
    const habits = await Habit.all;
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = { index };
