const express = require('express');
const router = express.Router();

const doctor = require('../controllers/doctor_controller');

const { authCheck, isDoctor } = require('../middlewares/auth_middleware');

// Routes =============================================================

router.use(authCheck);

router.get("/", (req, res) => { res.send("Doctor Routes") })


// =============================================================

module.exports = router;