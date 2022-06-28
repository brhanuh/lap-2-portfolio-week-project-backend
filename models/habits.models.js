// provisionally required in seed, should be init.js
const db = require("../dbConfig/init");

const User = require("./users.models");

module.exports = class Habit {
  constructor(data, user) {
    this.id = data.id;
    this.habit = data.habit;
    this.hours_per_day = data.hours_per_day;
    this.date = data.date;
    this.user_id = data.user_id;
    // this.user = {
    //   name: data.username,
    //   path: `/${data.user_id}`,
    // };
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
        reject("Habit not found");
      }
    });
  }

  static async create(habitData) {
    return new Promise(async (resolve, reject) => {
      try {
        const { habit, hoursPerDay, date, username } = habitData;
        console.log(habitData);
        let user = await User.findOrCreateByName(username);
        let newHabit = await db.query(
          `INSERT INTO habits (habit, hours_per_day, date, user_id) VALUES ($1, $2, $3, $4) RETURNING *`,
          [habit, hoursPerDay, date, user.id]
        );

        resolve(newHabit.rows[0]);
      } catch (error) {
        reject("Habit could not be created");
      }
    });
  }

  // end of class
};
