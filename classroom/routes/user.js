const express = require("express");
const router = express.Router();


// index - ueser
router.get("/", (req, res) => {
    res.send("get for Users");
});

// new - ueser
router.get("/new", (req, res) => {
    res.send("get for new User id");
});

// Show - ueser
router.get("/:id", (req, res) => {
    res.send("get for show  User id");
});

// Post - ueser
router.post("/:id", (req, res) => {
    res.send("post for  User id");
});

// delete - ueser
router.delete("/:id", (req, res) => {
    res.send("delete for  User id");
});

module.exports = router;