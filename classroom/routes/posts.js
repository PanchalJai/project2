const express = require("express");
const router = express.Router();


// index - posts
router.get("/", (req, res) => {
    res.send("get for posts");
});

//new - post

router.get("/new", (req, res) => {
    res.send("get for new post ");
});

// Show - posts
router.get("/:id", (req, res) => {
    res.send("get for show posts id");
});

// Post - posts
router.post("/:id", (req, res) => {
    res.send("post for  posts id");
});

// delete - posts
router.delete("/:id", (req, res) => {
    res.send("delete for  posts id");
});

module.exports = router;