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
    searchWeb: searchWeb
};

const mysql = require("promise-mysql");
const config = require("../config/db/vaccine.json");
let db;

/**
 * Main function.
 * @async
 * @returns void
 */
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

async function getAllVaccines() {
    let sql = `SELECT * FROM Patient`;
    let res;

    res = await db.query(sql);
    // console.log(res);
    return res;
}

async function getPatientData(ssn) {
    let sql = `SELECT * FROM Patient WHERE ssn = ?`;
    let res;

    res = await db.query(sql, [ssn]);
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


async function searchWeb(email) {
    let sql = `CALL search_register(?)`;
    let res;

    res = await db.query(sql, [email]);
    return res[0];
}
