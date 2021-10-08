/**
 * General routes.
 */
"use strict";

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const func = require("../src/funcs.js");

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect("/");
    }
}

const users = [];

router.get("/", async (req, res) => {
    let data = {
        title: "Index",
    };

    res.render("index", data);
});

router.get("/user", (req, res) => {
    let data = {
        title: "User",
    };

    if (req.session.loggedIn) {
        res.render("user", data);
    } else {
        res.redirect("/errorlogin");
    }
    res.end();
});

router.post("/user", (req, res) => {
    req.session.loggedIn = false;
    req.session.username = "";

    res.redirect("/");
});

router.get("/register", (req, res) => {
    let data = {
        title: "register",
    };

    res.render("register", data);
});

router.post("/", async function (req, response) {
    var email = req.body.email;
    var password = req.body.password;

    if (email && password) {
        const hashFromDB = await func.getHash(email);

        bcrypt.compare(password, hashFromDB, function (err, res) {
            if (err) {
                console.log("error");
                response.redirect("/register");
            } else if (res) {
                req.session.loggedIn = true;
                req.session.username = email;
                // console.log(req.session.loggedIn);
                response.redirect("/user");
            } else {
                console.log("nope");
                response.redirect("/register");
            }
        });
    }
});

router.post("/register", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await func.newUser(req.body.email, req.body.name, hashedPassword);
    res.redirect("/");
});

router.get("/vaccines", async (req, res) => {
    let data = {
        title: "Vaccines",
    };
    if (req.session.loggedIn) {
        data.res = await func.getAllVaccines();
        res.render("vaccines", data);
    } else {
        res.redirect("/errorlogin");
    }
});

// router.get("/patient/:ssn", async (req, res) => {
//     let ssn = req.params.ssn;
//     let data = {
//         title: `Vaccines ${ssn}`,
//         ssn: ssn,
//     };

//     if (req.session.loggedIn) {
//         data.res = await func.getPatientData(ssn);
//         res.render("patient", data);
//     } else {
//         res.redirect("/errorlogin");
//     }
// });

router.get("/patient/:ssn", async (req, res) => {
    let ssn = req.params.ssn;
    let data = {
        title: `Patient ${ssn}`,
        ssn: ssn
    };

    if (req.session.loggedIn) {
        data.res = await func.getPatientData(ssn);

        res.render("patient", data);
    } else {
        res.redirect("/errorlogin");
    }
});

router.get("/patientadd/:ssn", async (req, res) => {
    let ssn = req.params.ssn;
    let data = {
        title: `Patient ${ssn}`,
        ssn: ssn,
    };

    if (req.session.loggedIn) {
        data.res = await func.getPatientData(ssn);
        res.render("patientadd", data);
    } else {
        res.redirect("/errorlogin");
    }
});

router.get("/add", async (req, res) => {
    let data = {
        title: "Add vaccine",
    };
    if (req.session.loggedIn) {
        res.render("add", data);
    } else {
        res.redirect("/errorlogin");
    }
});

router.post("/add", async (req, res) => {
    let data = {
        title: "Add vaccine",
    };

    console.log(req.body);
    let ssn = req.body.ssn;
    let name = req.body.name;
    let vaccine = req.body.vaccine;
    let type = req.body.type;
    let desc = req.body.description;
    let phone = req.body.phone;

    data.res = await func.addVaccine(ssn, name, vaccine, type, desc, phone);

    res.redirect("vaccines");
});


router.post("/patientadd/:ssn", async (req, res) => {
    let data = {
        title: "Add vaccine",
    };

    console.log(req.body);
    let ssn = req.body.ssn;
    let name = req.body.name;
    let vaccine = req.body.vaccine;
    let type = req.body.type;
    let desc = req.body.description;
    let phone = req.body.phone;

    data.res = await func.addVaccine(ssn, name, vaccine, type, desc, phone);

    res.redirect("/vaccines");
});


router.get("/book", async (req, res) => {
    let data = {
        title: "Book vaccine",
    };

    res.render("book", data);
});

router.get("/thank", async (req, res) => {
    let data = {
        title: "Thank you",
    };

    res.render("thank", data);
});

router.get("/errorlogin", async (req, res) => {
    let data = {
        title: "Error",
    };

    res.render("errorlogin", data);
});

router.get("/bookings", (req, res) => {
    let data = {
        title: "Bookings",
    };
    if (req.session.loggedIn) {
        res.render("bookings", data);
    } else {
        res.redirect("/errorlogin");
    }
});

router.get("/search", async (req, res) => {
    let data = {
        title: "Search",
    };
    if (req.session.loggedIn) {
        data.res = await func.searchWeb();
        res.render("search", data);
    } else {
        res.redirect("/errorlogin");
    }
});

router.post("/search", async (req, res) => {
    await func.searchWeb(req.body.searchstring);
    res.redirect("search/" + req.body.searchstring);
});

router.get("/search/:searchstring", async (req, res) => {
    let searchstring = req.params.searchstring;
    let data = {
        title: "search",
        searchstring: searchstring,
    };

    data.res = await func.searchWeb(searchstring);

    res.render("search.ejs", data);
});



module.exports = router;
