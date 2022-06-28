const db = require('../dbConfig/init');

class User {
    constructor(data){
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
    };

    static get all(){ 
        return new Promise (async (resolve, reject) => {
            try {
                console.log(db);
                const result = await db.query('SELECT * FROM users;')
                const users = result.rows.map(u => ( {id: u.id, username: u.username, email: u.email} ))
                resolve(users);
            } catch (err) {
                reject("Error retrieving users")
            }
        })
    };

    get habits(){
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query('SELECT id, habit FROM habits WHERE user_id = $1', [ this.id ]);
                const habits = result.rows.map(h => ({habit: h.habit, path: `/habits/${h.id}`}));
                resolve(habits);
            } catch (err) {
                reject("habit cannot be found");
            };
        });
    };

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [ this.id ]);
                resolve(`User ${result.id} was deleted`)
            } catch (err) {
                reject('user could not be deleted')
            }
        })   
    }

    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let userData = await db.query('SELECT * FROM users WHERE id = $1;', [ id ]);
                let user = new User(userData.rows[0]);
                resolve(user);
            } catch (err) {
                reject('User not found');
            };
        });
    };

    static create(username, email){
        return new Promise (async (resolve, reject) => {
            try {
                let userData = await db.query('INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *;', [ username, email ]);
                let user = new User(userData.rows[0]);
                resolve (user);
            } catch (err) {
                reject('User could not be created');
            };
        });

    };

};

 
module.exports = User;
