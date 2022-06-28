const db = require('../dbConfig/init');

const Habits = require('./habits.models');

module.exports = class Days {
    constructor(data, habits) {
      this.id = data.id;
      this.day_of_week = data.day_of_week;
      this.month = data.month;
      this.habits = {
        name: data.habits,
        path: `/api/habits/${data.habit_id}`,
      };
    }

    static get all() {
        return new Promise(async (resolve, reject) => {
          try {
            const dayData = await db.query(`SELECT * FROM days;`);
            const days = dayData.rows.map((d) => new Days(d));
            resolve(days);
          } catch (error) {
            reject("day not found");
          }
        });
      }
    

}
