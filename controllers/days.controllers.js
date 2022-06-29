const Days = require('../models/days.model');


async function index(req, res) {
    try {
      const days = await Days.all;
      res.status(200).json(days);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  
  async function show(req, res) {
    try {
      const day = await Days.findById(req.params.id);
      res.status(200).json(day);
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  module.exports = { index, show };
