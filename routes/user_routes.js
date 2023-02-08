const express = require('express');
const router = express.Router();

const user = require('../controllers/user_controller');

const { authCheck, isUser } = require('../middlewares/auth_middleware');
const { validateApp } = require("../validators/user_validator");


// Routes =============================================================

router.use(authCheck);
router.use(isUser);
router.post("/create-appointment", user.createAppointment);


// =============================================================

module.exports = router;