const Record = require('../models/record');
const User = require('../models/User');


// ===========================================================================


// Get all the patients
module.exports.getPatients = async (req, res) => {
  try{
    const patients = await User.findAll({where : {role : "user"}});
    patients.forEach(patient => { delete patient.dataValues.password; });
    res.status(200).json({success: true, patients});

  }catch(err){
    res.status(500).json({success: false, error: err.message});
  }
}



// Get all doctors
module.exports.getDoctors = async (req, res) => {
  try{
    const doctors = await User.findAll({where : {role : "doctor"}});
    doctors.forEach(doctor => { delete doctor.dataValues.password; });
    res.status(200).json({success: true, doctors});

  }catch(err){
    res.status(500).json({success: false, error: err.message});
  }
}


// Get all the appointments
module.exports.getAppointments = async (req, res) => {
  try{
    const appointments = await Record.findAll();
    res.status(200).json({success: true, appointments});
  }catch(err){
    res.status(500).json({success: false, error: err.message});
  }
}

// Get appointment by id
module.exports.getAppointmentById = async (req, res) => {
  const { id } = req.params;
  // check if id is present
  if(!id) return res.status(400).json({success: false, error: "Invalid id"});

  const appointment = await Record.findOne({where : {id}});
  // check if appointment exists
  if(!appointment) return res.status(404).json({success: false, error: "Appointment not found"});

  res.status(200).json({success: true, appointment});
}


// Modify the appointment
module.exports.modifyAppointment = async (req, res) => {
  const { id, doctor, time, status } = req.body;
  
  try{

    const appointment = await Record.findOne({where : {id}});
    // check if appointment exists
    if(!appointment) return res.status(404).json({success: false, error: "Appointment not found"});

    // implement changes
    appointment.doctor = doctor;
    appointment.time = time;
    appointment.status = status;
    appointment.approvedBy = req.user.email;

    await appointment.save();

    res.status(200).json({success: true, appointment});

  }catch(err){
    res.status(500).json({success: false, error: err.message});
  }
}



module.exports.getAppointmentCount = async (req, res) => {
  const { date } = req.body;
  try{
    const appointments = await Record.findAndCountAll({ attributes: ["doctor"], where : { status: "approved", date } , group : "doctor"} );
    res.status(200).json({success: true, appointments});
  }catch(err){
    res.status(500).json({success: false, error: err.message});
  }
}
