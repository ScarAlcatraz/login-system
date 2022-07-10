const express = require("express");
const loggedIn = require("../controllers/loggedin");
const logout = require("../controllers/logout");
const router = express.Router();

router.get("/", loggedIn, (req, res) => {
    if (req.user) {
        res.render("index", {status: 'loggedIn', user: req.user})
        
    } else {
        res.render("index", {status: 'error'})
    }
})
router.get("/register", (req, res) => {
    res.sendFile("register.html", {root: "./public/"});
})
router.get("/login", (req, res) => {
    res.sendFile("login.html", {root: "./public/"});
})
router.get("/logout", logout)
router.get("/articlesDirectory", (req, res) => {
    res.render("articlesDirectory")
})

module.exports = router;