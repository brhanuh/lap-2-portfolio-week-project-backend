const db = require('../dbConfig/init');

const Habits = require('./habits.models');

module.exports = class Days {
    constructor(data, habit, users) {
      this.id = data.id;
      this.day_of_week = data.day_of_week;
      this.month = data.month;
      this.habit = {
        name: data.habit,
        date: data.date,
        frequency: data.hours_per_day
        // path: `/api/habits/${data.habit_id}`,
      }
      this.users = {
        name: data.username,
        // path: `/${data.user_id}`
      }
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

      static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let dayData = await db.query(`SELECT habits.habit, habits.hours_per_day, habits.date,
                                                      days.day_of_week, days.month, users.username
                                                      FROM habits
                                                      JOIN days
                                                      ON days.habit_id = habits.id
                                                      JOIN users
                                                      ON habits.user_id = users.id
                                                      WHERE days.id = $1`, [id]);
               let day = new Days(dayData.rows[0]);        
                resolve (day);
            } catch (err) {
                reject('day not found');
            }
        });
    };
    
    

}
