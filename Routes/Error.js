const express = require('express');
const router = express.Router();

router.get("/",(req,res) => {
    res.status(404).send("This path hasn't been defined yet. Please return back to where you came from.")
    // res.send("Hello from home.js");
});

module.exports = router;