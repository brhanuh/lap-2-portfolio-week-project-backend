const db = require("../dbConfig/init");
const User = require("./users.models");

module.exports = class Habit {
  constructor(data, user) {
    this.id = data.id;
    this.habit = data.habit;
    this.habit_freq_type = data.habit_freq_type;
    this.habit_frequency = data.habit_frequency;
    this.habit_aim_total = data.habit_aim_total;
    this.date = data.date;
    this.user_id = data.user_id;
    this.user = {
      name: data.username,
    };
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const habitData = await db.query(`SELECT * FROM habits;`);
        const habits = habitData.rows.map((h) => new Habit(h));
        resolve(habits);
      } catch (error) {
        reject("habit not found");
      }
    });
  }

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let habitData = await db.query(`SELECT * FROM habits WHERE id=$1`, [
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
        const { habit, hours_per_day, date, user_id } = habitData;

        // let user = await User.findOrCreateByName(username);
        let newHabit = await db.query(
          `INSERT INTO habits (habit, hours_per_day, date, user_id) VALUES ($1, $2, $3, $4) RETURNING *`,
          [habit, hours_per_day, date, user_id]
        );

        resolve(newHabit.rows[0]);
      } catch (error) {
        reject("Habit could not be created");
      }
    });
  }

  destroy() {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteHabit = await db.query(
          `DELETE FROM habits WHERE id = $1 RETURNING user_id`,
          [this.id]
        );

        const user = await User.findById(deleteHabit.rows[0].user_id);
        const habits = await user.habits;
        console.log(user);
        if (!habits.length) {
          await user.destroy();
        }
        resolve("Habit was deleted");
      } catch (error) {
        console.log(error);
        reject("Habit could not be deleted");
      }
    });
  }

  static async updateHabit(id, newHabit) {
    return new Promise(async (resolve, reject) => {
      try {
        let updatedHabit = await db.query(
          `UPDATE habits SET habit = $1 WHERE id = $2 RETURNING *`,
          [newHabit.habit, id]
        );
        console.log(updatedHabit.rows[0]);
        resolve("Habit updated!");
      } catch (error) {
        reject("Habit could not be updated");
      }
    });
  }

  // end of class
};
