const express = require('express');
const router = express.Router();

const staff = require('../controllers/staff_controller');

const { authCheck, isStaff } = require('../middlewares/auth_middleware');

// Routes =============================================================

router.post("/get-patients", authCheck, isStaff, staff.getPatients);
router.post("/get-doctors", authCheck, isStaff, staff.getDoctors);
router.post("/get-appointments", authCheck, isStaff, staff.getAppointments);
// router.post("/modify")
 
// =============================================================

module.exports = router;