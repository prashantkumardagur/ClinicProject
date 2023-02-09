const express = require('express');
const router = express.Router();

const staff = require('../controllers/staff_controller');

const { authCheck, isStaff } = require('../middlewares/auth_middleware');
const { validateRecordData } = require("../validators/staff_validators");

// Routes =============================================================

router.use(authCheck);
router.use(isStaff);

router.post("/patients", staff.getPatients);
router.post("/doctors", staff.getDoctors);
router.post("/appointment-count", staff.getAppointmentCount);
router.post("/appointments", staff.getAppointments);

router.post("/appointment/:id", staff.getAppointmentById);
router.post("/appointment", validateRecordData, staff.modifyAppointment);
 
// =============================================================

module.exports = router;