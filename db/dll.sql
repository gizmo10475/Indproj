CREATE TABLE IF NOT EXISTS Patient
(
    ssn VARCHAR(12) NOT NULL,
    name CHAR(50) NOT NULL,
	vaccine VARCHAR(50) NOT NULL,
	type VARCHAR(20) NOT NULL,
	date INT(8) NOT NULL,
	description VARCHAR(250) NOT NULL,
	phone CHAR(10) NOT NULL
);
DROP TABLE Patient;

CREATE TABLE IF NOT EXISTS Users
(
    uname CHAR(255) NOT NULL,
    name CHAR(50) NOT NULL,
	pwhash VARCHAR(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS book
(
    ssn VARCHAR(12) NOT NULL,
    name CHAR(50) NOT NULL,
	vaccine VARCHAR(50) NOT NULL,
	type VARCHAR(20) NOT NULL,
	phone CHAR(10) NOT NULL
);


DELIMITER $$
DROP PROCEDURE IF EXISTS addUser $$
CREATE PROCEDURE addUser(
	a_username CHAR(20),
    a_name CHAR(50),
    a_passwordHash CHAR(250)
)
BEGIN
    INSERT INTO Users VALUES (a_username, a_name, a_passwordHash);
END$$
DELIMITER ;


DELIMITER $$
DROP PROCEDURE IF EXISTS addVaccine $$
CREATE PROCEDURE addVaccine(
	a_ssn VARCHAR(12),
    a_name CHAR(50),
    a_vaccine VARCHAR(50),
    a_type VARCHAR(20),
    date INT(8),
    a_desc VARCHAR(250),
	a_phone CHAR(10)
)
BEGIN
    INSERT INTO Patient VALUES (a_ssn, a_name, a_vaccine, a_type, date, a_desc, a_phone);
END$$
DELIMITER ;



DELIMITER $$
DROP PROCEDURE IF EXISTS bookvaccine $$
CREATE PROCEDURE bookvaccine(
	a_ssn VARCHAR(12),
    a_name CHAR(50),
    a_vaccine VARCHAR(50),
    a_type VARCHAR(20),
	a_phone CHAR(10)
)
BEGIN
    INSERT INTO book VALUES (a_ssn, a_name, a_vaccine, a_type, a_phone);
END$$
DELIMITER ;


DELIMITER $$
DROP PROCEDURE IF EXISTS removebooking $$
CREATE PROCEDURE removebooking(
	a_ssn VARCHAR(12),
    a_name CHAR(50),
    a_vaccine VARCHAR(50),
    a_type VARCHAR(20),
	a_phone CHAR(10)
)
BEGIN
    DELETE FROM book WHERE (a_ssn, a_name, a_vaccine, a_type, a_phone);
END$$
DELIMITER ;



DELIMITER $$
DROP PROCEDURE IF EXISTS hashgetter $$
CREATE PROCEDURE hashgetter(
	a_username CHAR(20)
)
BEGIN
    SELECT pwhash FROM Users WHERE uname = a_username;
END$$
DELIMITER ;


DROP PROCEDURE IF EXISTS search_register;
DELIMITER ;;
CREATE PROCEDURE search_register(IN searchstring VARCHAR(255))
BEGIN
    SELECT *
FROM 
Patient
WHERE
		ssn LIKE searchstring OR
		name LIKE searchstring OR
        vaccine LIKE searchstring OR
        type LIKE searchstring OR
		description LIKE searchstring OR
        phone LIKE searchstring OR
		date LIKE searchstring
;
END
;;
DELIMITER ;

CALL search_register("COVID-19");











CALL hashgetter("test@test.com");

CALL addVaccine("198705041111", "Mange Magnusson", "TBE", "-", "211005", "-", "0101486321");
CALL addUser("test", "test@test.com", "aojshdakuhsgb&!%!¤%/dhjaks4123bd");

CALL bookvaccine("198705041111", "Ed", "TBE", "pfizer", "0768777777");
INSERT INTO book VALUES ("198705041111", "Ed", "TBE", "pfizer", "0768777777");

SELECT * FROM Patient;
SELECT * FROM Users;
SELECT * FROM book;

truncate table Users;
truncate table Patient;
truncate table book;

drop table Users;
drop table Patient;

SELECT * FROM Patient LIMIT 10;

SELECT pwhash FROM Users WHERE uname = "test@test.com";

INSERT INTO Users VALUES ("Eddie", "Edvin", 999999999);
INSERT INTO Patient VALUES (199905060000, "Eddie Fajkovic", "COVID-19", "Pfizer", 211001, "first covid dose", "0768763121");
INSERT INTO Patient VALUES (199905060000, "Eddie Fajkovic", "COVID-19", "Pfizer", 211020, "second covid dose", "0768763121");
INSERT INTO Patient VALUES (197905060111, "Test Karlson", "COVID-19", "Pfizer", 211009, "first covid dose", "0768763121");

INSERT INTO Users VALUES ("q@q", "Edvin", "q");
UPDATE Users SET pwhash = "aaaaaa" WHERE uname = "q@q";


SELECT * FROM Patient ORDER BY date DESC LIMIT 10;
