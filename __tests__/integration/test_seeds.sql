TRUNCATE users, habits RESTART IDENTITY;

INSERT INTO users (username, email, user_password) 
VALUES
('Test user 1', 'user1@email.com', 'testPassword1'),
('Test user 2', 'user2@email.com', 'testPassword2');

INSERT INTO habits (habit_freq_type, habit, habit_frequency, habit_aim_total, date, user_id) 
VALUES
(
    'Test frequency 1', 
    'test habit1', 
    1,
    3,
    '2022-06-25',
    1
),
(
    'Test frequency 2', 
     'test habit2', 
    6,
    9,
    '2022-06-25',
    3
),
(
    'Test frequency 3',
     'test habit3', 
    4,
    5,
    '2022-06-25',
    2

);
