const Record = require('../models/record');

// ========================================================================================

module.exports.modifyAppointment = async (req, res) => {
    const {id, prescription} = req.body;
    // check if id and prescription are present
    if(!id || !prescription) return res.status(400).json({success: false, error: "Invalid request"});

    try {
        const record = await Record.findOne({ where : { id } });
        // check if record exists
        if(!record) return res.status(404).json({success: false, error: "Record not found"});

        // check if doctor is authorized
        if(record.doctor !== req.user.email) return res.status(403).json({success: false, error: "Not authorized"});

        record.prescription = prescription;
        record.status = "completed";
        await record.save();

        res.status(200).json({success: true, record});
    
    } catch (err) {
      res.status(500).json({success: false, error : err.message});
    }
}




module.exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Record.findAll({ where : { doctor: req.user.email } });
        res.status(200).json({success: true, appointments});
    }
    catch(err) {
        res.status(500).json({success: false, error : err.message});
    }
  
}