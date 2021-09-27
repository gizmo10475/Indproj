/**
 * General routes.
 */
"use strict";

const express = require("express");
const router  = express.Router();

router.get("/", (req, res) => {
    let data = {
        title: "Index"
    };

    res.render("index", data);
});

router.get("/vaccines", (req, res) => {
    let data = {
        title: "Vaccines"
    };

    res.render("vaccines", data);
});


router.get("/bookings", (req, res) => {
    let data = {
        title: "Bookings"
    };

    res.render("bookings", data);
});

router.get("/search", (req, res) => {
    let data = {
        title: "Search"
    };

    res.render("search", data);
});

module.exports = router;
