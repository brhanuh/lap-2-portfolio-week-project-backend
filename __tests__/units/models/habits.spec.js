const Habit = require('../../../models/habits.models');
const User = require('../../../models/users.models');

jest.mock('../../../models/users.models');

const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('Habit', () => {
    beforeEach(() => jest.clearAllMocks())
    
    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with users on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await Habit.all;
            expect(all).toHaveLength(3)
        })
    });

    describe('findById', () => {
        test('it resolves with habits on successful db query', async () => {
            let habitData = { id: 1, title: 'Test Habit' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ habitData] });
            const result = await Habit.findById(1);
            expect(result).toBeInstanceOf(Habit)
        })
    });

    describe('create', () => {
        test('it resolves with habit on successful db query', async () => {
            let habitData = { habit_freq_type: "test daily",
                habit: "test habit",
                habit_frequency: 7,
                habit_aim_total: 4,
                date: "2022-02-20",
                user_id: 1 }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ { ...habitData, id: 1 }] });
            jest.spyOn(User, 'findOrCreateByName')
                .mockResolvedValueOnce(new User({id: 1, name: 'Test User'}));
            const result = await Habit.create(habitData);
            expect(result).toHaveProperty('id')
        })
    });
    
})
