const Record = require('../models/Record');
const User = require('../models/User');

// ===========================================================================


// Get all the patients
module.exports.getPatients = async (req, res, next) => {
  const patients = await User.findAll({where : {role : "user"}});
  patients.forEach(patient => { delete patient.dataValues.password; });
  res.status(200).json({success: true, patients});
}



// Get all doctors
module.exports.getDoctors = async (req, res, next) => {
  const doctors = await User.findAll({where : {role : "doctor"}});
  doctors.forEach(doctor => { delete doctor.dataValues.password; });
  res.status(200).json({success: true, doctors});
}


// Get all the appointments
module.exports.getAppointments = async (req, res, next) => {
  const appointments = await Record.findAll();
  res.status(200).json({success: true, appointments});
}