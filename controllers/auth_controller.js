const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


//= ===================================================================================


module.exports.login = async (req, res) => {

  const { email, password } = req.body;

  try{

    // Get user by email
    const user = await User.findOne({where : { email: email } });
    if (!user) return res.status(400).json({ success: false, error: 'User does not exist.' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, error: 'Invalid credentials.' });

    // Create token with user data and role
    user.password = undefined;
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.send({ success: true, token: token, user: user });
  
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }

}

module.exports.register = async (req, res) => {
    
    const { name, email, password, role } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({where :{ email: email } });
      if (user) return res.status(400).json({ success: false, error: 'User already exists.' });

      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Create new user
      const newUser = await User.create({ name, email, password : hashedPassword, role });

      res.status(201).json({ success: true, message: 'User created successfully.' });

    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }

}


module.exports.removeDoctor = async (req, res) => {
    const { email } = req.body;
    try {
        const doctor = await User.findOne({ where: { email: email } });
        // If doctor not found
        if (!doctor) return res.status(404).json({ success: false, message : "doctor not found" })
        
        doctor.destroy();
        res.status(200).json({ success: true, message: 'Doctor deleted successfully.' });
    }
    catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
}



module.exports.addDoctor = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ where : { email: email } });
    if(user) return res.status(400).json({ success: false, error: 'Doctor already exists.' });

    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create new doctor
    const newDoctor = await User.create({ name, email, password : hashedPassword, role : "doctor" });
    
    res.status(201).json({ success: true, message: 'Doctor created successfully.' });
  
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
