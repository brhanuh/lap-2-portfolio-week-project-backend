INSERT INTO habits (habit, hours_per_day, date, user_id)
VALUES
('running', 2,' 2022-06-22', 4),
('going to the gym', 2, '2022-06-26', 3),
('learning javascript', 4, '2022-06-27', 2),
('walking the cat', 2, '2022-06-27', 1);

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
