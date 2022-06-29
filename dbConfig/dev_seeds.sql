INSERT INTO habits (habit_freq_type, habit, habit_frequency, habit_aim_total, date, user_id)
VALUES
( 'weekly', 'running', 3, 5, '2022-06-22', 4),
( 'weekly','going to the gym', 1, 6, '2022-06-26', 3),
( 'daily', 'learning javascript', 1, 2, '2022-06-27', 2),
( 'monthly', 'walking the cat', 10, 20, '2022-06-27', 1);

INSERT INTO users (username, email, user_password)
VALUES(
    'Summira Hussain',
    'summirahussain@email.com',
    'kdhgkqgdgy823gvj'
),
(
    'Hanibal Brhanu', 
    'hanibalbirhanu@email.com',
    'ssqweqwsscjqwed376'
),
(
    'Stuart Judd', 
    'stuartjudd@email.com',
    'jydtqdbclsdhwsfkf7'
),
(
    'Syed Javaid', 
    'syedjavaid@email.com',
    'sakhdwjdghdjciedjeh88'
);


INSERT INTO days (day_of_week, month, habit_id)
VALUES
('Monday', 'June', 4),
('Wednesday', 'June', 1),
('Sunday', 'June', 2),
('Monday', 'June', 3);
