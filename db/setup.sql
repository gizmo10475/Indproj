CREATE DATABASE IF NOT EXISTS vaccine;

USE vaccine;

SHOW DATABASES LIKE "%vaccine%";

CREATE USER IF NOT EXISTS 'user'@'%'
     IDENTIFIED WITH mysql_native_password
     BY 'pass'
;

GRANT ALL PRIVILEGES
    ON *.*
    TO 'user'@'%'
;

SHOW GRANTS FOR 'user'@'%';
