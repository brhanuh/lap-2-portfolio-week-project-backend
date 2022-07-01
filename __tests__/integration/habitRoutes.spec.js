const request = require('supertest');
const fs = require("fs");
const { Pool } = require('pg');
const app = require('../../server.js');

const testSeed = fs.readFileSync(__dirname + '/test_seeds.sql').toString();

const resetTestDB = () => {
    return new Promise (async (resolve, reject) => {
        try {
            const db = new Pool()
            await db.query(testSeed);
            resolve('Test DB reset');
        } catch (err) {
            reject(`Test DB could not be reset: ${err} in ${err.file}`);
        };
    });
}

describe('habits endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

    it('should return a list of all habits in database', async () => {
        const res = await request(api).get('/api/habits');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
    });

    it('should create a new habit by an existing user', async () => {
        const res = await request(api)
            .post('/api/habits')
            .send({
                habit_frequency_type: 'weekly',
                habit: 'Test habit',
                habit_frequency: 5,
                habit_aim_total: 7,
                date: '2022-06-30',
                user_id: 1
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("id");

        const userRes = await request(api).get('/api/users/1');
        expect(userRes.body.length).toEqual(2);
    });


    it('should delete a habit', async () => {
        const res = await request(api)
            .delete('/api/habits/1')
        expect(res.statusCode).toEqual(204);

        const habRes = await request(api).get('/api/habits/1');
        expect(habRes.statusCode).toEqual(404);
    }); 
})
