const User = require('../models/user');
const Record = require('../models/record');

// ==============================================================================

// Create a new appointment
module.exports.createAppointment = async (req, res) => {
  const { date, notes } = req.body;
  const user = req.user;

  try {
    const record = await Record.create({
      date,
      notes,
      patient: user.email,
      status: 'pending',
    });

    res.status(201).json({ success: true, record });

  } catch(err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Get user profile
module.exports.getProfile = async (req, res) => {
  const user = req.user;
  const email = user.email;

  try{
  const records = await Record.findAll({where : { patient: email } });
  res.status(200).json({ success: true, profile: { user, records} });

  } catch(err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports.cancelAppointment = async (req, res) => {
    const { id } = req.body;
    if(!id) return res.status(400).json({ success: false, message: 'Invalid request' });

    try {
      const record = await Record.findOne({ where: { id } });
      if(!record) return res.status(404).json({ success: false, message: 'Record not found' });
    
      record.status = 'cancelled';
      await record.save();

      res.status(200).json({ success: true });
    } 
    catch(err) {
        res.status(500).json({ success: false, message: err.message });
    }

}

    