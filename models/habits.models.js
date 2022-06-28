// provisionally required in seed, should be init.js
const db = require("../dbConfig/init");

const User = require("./users.models");

module.exports = class Habit {
  constructor(data, user) {
    this.id = data.id;
    this.habitName = data.habitName;
    this.hours_per_day = data.hours_per_day;
    this.date = data.date;
    this.user = {
      name: data.username,
      path: `/users/${data.user_id}`,
    };
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const habitData = await db.query(`SELECT * FROM habits;`);
        const habits = habitData.rows.map((h) => new Habit(h));
        resolve(habits);
      } catch (error) {
        reject("Book not found");
      }
    });
  }

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let habitData = await db.query(`SELECT habit FROM habits WHERE id=$1`, [
          id,
        ]);

        let habit = new Habit(habitData.rows[0]);
        resolve(habit);
      } catch (error) {
        reject("Book not found");
      }
    });
  }

  // end of class
};
