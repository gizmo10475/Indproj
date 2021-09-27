CREATE TABLE IF NOT EXISTS Patient
(
    ssn VARCHAR(12) NOT NULL,
    name CHAR(50) NOT NULL,
	vaccine VARCHAR(50) NOT NULL,
	type VARCHAR(20) NOT NULL,
	date INT(8) NOT NULL,
	description VARCHAR(250) NOT NULL,
	phone INT(10) NOT NULL
);

drop table Users;
drop table Patient;

CREATE TABLE IF NOT EXISTS Users
(
    employmentnumber INT PRIMARY KEY NOT NULL,
    uname CHAR(20) NOT NULL,
    name CHAR(50) NOT NULL,
	pwhash VARCHAR(250) NOT NULL,
	title CHAR(20) NOT NULL
);


SELECT * FROM Patient;
SELECT * FROM Users;


INSERT INTO Users VALUES (404, "Eddie", "Edvin", 999999999, "CEO");
INSERT INTO Patient VALUES (199905060000, "Eddie Fajkovic", "Covid", "Pfizer", 210923, "first covid dose", 0768763121);
