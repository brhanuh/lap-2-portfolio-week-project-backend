const db = require('../dbConfig/init');

const Habits = require('./habits.models');

module.exports = class Days {
    constructor(data, habit, users) {
      this.id = data.id;
      this.day_of_week = data.day_of_week;
      this.month = data.month;
      this.habit = {
        habit: data.habit,
        date: data.date,
        frequency: data.habit_freq_type,
        habit_done: data.habit_frequency,
        habit_aim: data.habit_aim_total,
        // path: `/api/habits/${data.habit_id}`,
      }
      this.users = data.username,
      this.user_id = data.user_id;


      
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
                let dayData = await db.query(`SELECT habits.habit, habits.habit_freq_type,
                                                    habits.habit_frequency, habits.habit_aim_total, habits.date, habits.user_id,
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
