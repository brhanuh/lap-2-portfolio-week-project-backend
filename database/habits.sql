DROP TABLE IF EXISTS habits;

CREATE TABLE habits (
 id serial PRIMARY KEY,
 habit_freq_type varchar(255),
 habit varchar(255),
 habit_frequency int,
 habit_aim_total int,
 date DATE,
 user_id int
);
