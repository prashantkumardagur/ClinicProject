const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth_controller');
const validator = require('../validators/auth_validators');
const { authCheck, isStaff } = require('../middlewares/auth_middleware');

// Routes =============================================================

router.post("/login", validator.validateLoginData , auth.login);
router.post("/register", validator.validateRegisterData, auth.register);

router.use(authCheck);
router.post("/addStaff", isStaff, validator.validateNewStaffData, auth.addStaff);
router.post("/removeStaff", isStaff, auth.removeStaff);
// =============================================================

module.exports = router;