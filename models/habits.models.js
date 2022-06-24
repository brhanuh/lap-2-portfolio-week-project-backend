// provisionally required in seed, should be init.js
const db = require("../dbConfig/seedDev");

module.exports = class Habit {
  constructor(data, user) {
    this.id = data.id;
    this.habitName = data.habitName;
    this.frequency = data.frequency;
    this.date = data.date;
    this.user = {
      name: data.username,
      path: `/users/${data.user_id}`,
    };
  }

  // database query wont work atm because there is no database rn. habitData and habits have beencommented out for now
  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        // const habitData = await db.query(`SELECT * FROM habits;`);
        // const habits = habitData.rows.map((h) => new Habit(h));
        resolve("inside model");
      } catch (error) {}
    });
  }
};
