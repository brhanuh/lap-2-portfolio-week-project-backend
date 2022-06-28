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



  static get all(){
    return new Promise(async (res, rej) => {
        try {
            let result = await db.query(`SELECT habits.*, users.username as username
                                                FROM habits 
                                                JOIN users ON habits.user_id = users.id;`);
            let habits = result.rows.map(h => new Habit(h))
            res(habits)
        } catch (err) {
            rej(`Error retrieving habits: ${err}`)
        }
    })
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
        reject("habit not found");
      }
    });
  }

//   static findById(id){
//     return new Promise (async (resolve, reject) => {
//         try {
//             let habitData = await db.query(`SELECT habits.*, users.username as author_name
//                                                 FROM habits 
//                                                 JOIN users
//                                                 ON habits.user_id = users.id
//                                                 JOIN days
//                                                 WHERE habits.id = $1;`, [ id ]);
//             let book = new Book(bookData.rows[0]);
//             resolve (book);
//         } catch (err) {
//             reject('Book not found');
//         }
//     });
// };

static async create(habitData){
  return new Promise (async (resolve, reject) => {
      try {
          const { habit, hours_per_day, date, userName} = habitData;
          let user = await User.findOrCreateByName(userName);
          let newHabit = await db.query('INSERT INTO habits ( habit, hours_per_day, date, user_id) VALUES ($1, $2, $3, $4) RETURNING *;', [ habit, hours_per_day, date, user.id]);
          resolve (newHabit.rows[0]);
      } catch (err) {
          reject('Habit could not be created');
      }
  });
};


destroy(){
    return new Promise(async(resolve, reject) => {
        try {
            const result = await db.query('DELETE FROM habits WHERE id = $1 RETURNING user_id', [ this.id ]);
            const user = await User.findById(result.rows[0].user_id);
            const habits = await user.habits;
            if(!habits.length){await user.destroy()}
            resolve('Habit was deleted')
        } catch (err) {
            reject('Habit could not be deleted')
        }
    })
};

  // end of class
};
