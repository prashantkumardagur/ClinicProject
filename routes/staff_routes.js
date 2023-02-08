const express = require('express');
const router = express.Router();

const staff = require('../controllers/staff_controller');

const { authCheck, isStaff } = require('../middlewares/auth_middleware');
const { validateRecordData } = require("../validators/staff_validators");

// Routes =============================================================

router.use(authCheck);
router.use(isStaff);

router.get("/patients", staff.getPatients);
router.get("/doctors", staff.getDoctors);
router.get("/appointment-count", staff.getAppointmentCount);
router.get("/appointments", staff.getAppointments);

router.get("/appointment/:id", staff.getAppointmentById);
router.post("/appointment", validateRecordData, staff.modifyAppointment);
 
// =============================================================

module.exports = router;