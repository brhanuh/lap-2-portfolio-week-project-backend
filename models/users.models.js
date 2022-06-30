const db = require("../dbConfig/init");
const Habit = require("./habits.models");

class User {
  constructor(data, habit) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.user_password = data.user_password;
    this.habit = {
      habit: data.habit,
      frequency_type: data.habit_freq_type,
      frequency: data.habit_frequency,
      aim: data.habit_aim_total,
    };
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query("SELECT * FROM users;");
        const users = result.rows.map((u) => ({
          id: u.id,
          username: u.username,
          email: u.email,
          user_password: u.user_password,
        }));
        resolve(users);
      } catch (err) {
        reject("Error retrieving users");
      }
    });
  }

  get habits() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(
          "SELECT id, habit FROM habits WHERE user_id = $1",
          [this.id]
        );
        const habits = result.rows.map((h) => ({
          habit: h.habit,
          path: `/habits/${h.id}`,
        }));
        resolve(habits);
      } catch (err) {
        reject("habit cannot be found");
      }
    });
  }

  destroy() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(
          "DELETE FROM users WHERE id = $1 RETURNING id",
          [this.id]
        );
        resolve(`User ${result.id} was deleted`);
      } catch (err) {
        reject("user could not be deleted");
      }
    });
  }

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await db.query(
          `SELECT users.username, habits.habit,
                                              habits.habit_freq_type,
                                              habits.habit_frequency,
                                              habits.habit_aim_total
                                              FROM habits
                                              JOIN users
                                              ON habits.user_id = users.id
                                              WHERE habits.user_id = $1;`,
          [id]
        );
        const users = userData.rows.map((u) => ({
          username: u.username,
          habit: u.habit,
          habit_frequency_type: u.habit_freq_type,
          habit_frequency: u.habit_frequency,
          habit_aim: u.habit_aim_total,
        }));
        console.log(userData.rows);
        resolve(users);
      } catch (err) {
        reject("User not found");
      }
    });
  }

  static create(username, email, user_password) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(username);
        let userData = await db.query(
          "INSERT INTO users (username, email, user_password) VALUES ($1, $2, $3) RETURNING *;",
          [username, email, user_password]
        );
        let user = new User(userData.rows[0]);
        resolve(user);
      } catch (err) {
        reject("User could not be created");
      }
    });
  }

  static findOrCreateByName(username) {
    return new Promise(async (resolve, reject) => {
      try {
        let user;
        const userData = await db.query(
          `SELECT * FROM users WHERE username = $1;`,
          [username]
        );

        if (!userData.rows.length) {
          user = await User.create(username);
        } else {
          user = await User(userData.rows[0]);
        }

        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }

  static findByEmail(email) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await db.query(`SELECT * FROM users WHERE email = $1`, [
          email,
        ]);
        let user = new User(result.rows[0]);
        resolve(user);
      } catch (error) {
        reject(`Error retrieving user: ${error.message}`);
      }
    });
  }
}

module.exports = User;
