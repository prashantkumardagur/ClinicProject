const express = require('express');
const router = express.Router();

const doctor = require('../controllers/doctor_controller');

const { authCheck, isDoctor } = require('../middlewares/auth_middleware');

// Routes =============================================================

router.use(authCheck);
router.use(isDoctor);

router.get("/appointments", doctor.getAppointments);
router.post("/modify-appointment", doctor.modifyAppointment);


// =============================================================

module.exports = router;