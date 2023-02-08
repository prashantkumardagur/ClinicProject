const express = require('express');
const router = express.Router();

const user = require('../controllers/user_controller');

// Routes =============================================================

router.get("/", (req, res) => { res.send("user Routes") })


// =============================================================

module.exports = router;