const express = require('express');
const router = express.Router();

router.get("/",(req,res) => {
    res.sendStatus(404);
    // res.send("Hello from home.js");
});

module.exports = router;