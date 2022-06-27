DROP TABLE IF EXISTS  days;

CREATE TABLE days (
 id serial PRIMARY KEY,
 day_of_week varchar(30),
 month varchar(30),
 habit_id int
);
