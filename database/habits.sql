DROP TABLE IF EXISTS  habits;

CREATE TABLE habits (
 id serial PRIMARY KEY,
 habit varchar(255),
 hours_per_day int,
 date DATE,
 user_id int
)
