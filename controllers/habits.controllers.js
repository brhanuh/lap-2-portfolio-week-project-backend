const Habit = require("../models/habits.models");

async function index(req, res) {
  try {
    const habits = await Habit.all;
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function show(req, res) {
  try {
    const habit = await Habit.findById(req.params.id);
    res.status(200).json(habit);
  } catch (error) {
    res.status(404).json({ error });
  }
}

async function create(req, res) {
  try {
    const habit = await Habit.create(req.body);
    res.status(201).json(habit);
  } catch (error) {
    res.status(422).json({ error });
  }
}

async function destroy(req, res) {
  try {
    const habit = await Habit.findById(req.params.id);
    const resp = await habit.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const freshHabit = await Habit.updateHabit(id, req.body);

    res.status(200).json("Habit Updated!");
  } catch (error) {
    res.status(404).json({ error });
  }
}

module.exports = { index, show, create, destroy, update };
