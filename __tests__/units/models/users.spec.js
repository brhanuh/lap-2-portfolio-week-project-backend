const User = require('../../../models/users.models');
const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('User', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with Users on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await User.all;
            expect(all).toHaveLength(3)
        })
    });

  
    describe('destroy', () => {
        test('it resolves with message on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ id: 1 });
            let testUser = new User({ id: 1, username: 'Test Author', email:'test email', user_password:'test pw'})
            const result = await testUser.destroy();
            expect(result).toBe('User 1 was deleted')
        })
    });

    describe('create', () => {
        test('it resolves with author on successful db query', async () => {
            let userrData = { id: 1, username: 'Test Author', email:'test email', user_password:'test pw' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ userrData] });
            const result = await User.create('New user');
            expect(result).toBeInstanceOf(User)
        })
    });

    describe('findOrCreateByName', () => {
        test('it calls on user.create if name not found', async () => {
            let userData = { id: 1, username: 'Test Author', email:'test email', user_password:'test pw' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ ] });
            const createSpy = jest.spyOn(User, 'create')
                .mockResolvedValueOnce(new User(userData));
            const result = await User.findOrCreateByName('New User');
            expect(createSpy).toHaveBeenCalled();
            expect(result).toBeInstanceOf(User);
        })

    });
    
})
