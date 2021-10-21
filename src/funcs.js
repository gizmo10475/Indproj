/**
 * A module exporting functions to access the database.
 */
"use strict";

module.exports = {
    newUser: newUser,
    getHash: getHash,
    getAllVaccines: getAllVaccines,
    addVaccine: addVaccine,
    hashGetter: hashGetter,
    getPatientData: getPatientData,
    searchWeb: searchWeb,
    bookVaccine: bookVaccine,
    getAllBookings: getAllBookings,
    getPatientBookData: getPatientBookData,
    deleteBooking: deleteBooking,
    ChangePwHash: ChangePwHash
};

const mysql = require("promise-mysql");
const config = require("../config/db/vaccine.json");
let db;

(async function () {
    db = await mysql.createConnection(config);

    process.on("exit", () => {
        db.end();
    });
})();

async function newUser(username, name, passwordHash) {
    let sql = `CALL addUser(?, ?, ?);`;
    let res;

    res = await db.query(sql, [username, name, passwordHash]);
    console.log("added user");
}

async function getHash(email) {
    try {
        let sql = `SELECT pwhash FROM Users WHERE uname = ?`;
        let res;

        res = await db.query(sql, [email]);

        return res[0].pwhash;
    } catch (error) {
        return;
    }
}

async function hashGetter(email) {
    let sql = `CALL hashGetter(?)`;
    let res;

    res = await db.query(sql, [email]);
    console.log(res[0].pwhash);
    return res;
}

async function ChangePwHash(newPWhash, email) {
    let sql = `UPDATE Users SET pwhash = ? WHERE uname = ?`;
    let res;

    res = await db.query(sql, [newPWhash, email]);
    // console.log(res);
    return res;
}


async function getAllVaccines() {
    let sql = `SELECT * FROM Patient ORDER BY date DESC LIMIT 10`;
    let res;

    res = await db.query(sql);
    // console.log(res);
    return res;
}

async function deleteBooking(ssn) {
    let sql = `DELETE FROM book WHERE ssn = ?`;
    let res;

    res = await db.query(sql, [ssn]);
    return res;
}


async function getPatientData(ssn) {
    let sql = `SELECT * FROM Patient WHERE ssn = ?`;
    let res;

    res = await db.query(sql, [ssn]);
    return res;
}

async function getPatientBookData(ssn) {
    let sql = `SELECT * FROM book WHERE ssn = ?`;
    let res;

    res = await db.query(sql, [ssn]);
    return res;
}

async function getAllBookings() {
    let sql = `SELECT * FROM book;`;
    let res;

    res = await db.query(sql);
    return res;
}

async function addVaccine(ssn, name, vaccine, type, desc, phone) {
    let sql = `CALL addVaccine(?, ?, ?, ?, ?, ?, ?);`;
    let res;
    let date = new Date();
    let dateFormated =
        date.toISOString().split("T")[0].replace(/\-/g, "").slice(2, 8) - 0;

    res = await db.query(sql, [
        ssn,
        name,
        vaccine,
        type,
        dateFormated,
        desc,
        phone,
    ]);
    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}

async function bookVaccine(ssn, name, vaccine, type, phone) {
    let sql = `CALL bookvaccine(?, ?, ?, ?, ?);`;
    let res;

    res = await db.query(sql, [
        ssn,
        name,
        vaccine,
        type,
        phone,
    ]);
    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}


async function searchWeb(email) {
    let sql = `CALL search_register(?)`;
    let res;

    res = await db.query(sql, [email]);
    return res[0];
}
