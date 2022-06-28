async function registration(req, res) {
  try {
    console.log("In auth controller");
    res.status(201).json("In auth controller");
  } catch (error) {
    res.status(422).json({ error });
  }
}

module.exports = registration;
