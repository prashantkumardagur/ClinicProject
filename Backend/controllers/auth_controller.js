const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


//= ===================================================================================

// controller to login user, doctor or staff
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
    res.status(200).send({ success: true, token: token, user: user });
  
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }

}


// controller to register a new user
module.exports.register = async (req, res) => {
    
    const { name, email, password } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({where :{ email: email } });
      if (user) return res.status(409).json({ success: false, error: 'User already exists.' });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Create new user
      const newUser = await User.create({ name, email, password : hashedPassword, role: "user" });

      res.status(201).json({ success: true, message: 'User created successfully.' });

    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }

}


// controller to remove a user
module.exports.removeStaff = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } });
        // If user not found
        if (!user) return res.status(404).json({ success: false, message : "user not found" })
        
        user.destroy();
        res.status(200).json({ success: true, message: 'Doctor deleted successfully.' });
    }
    catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
}


// controller to add a new doctor or staff
module.exports.addStaff = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ where : { email: email } });
    if(user) return res.status(409).json({ success: false, error: `${role} already exists.` });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create new doctor
    const newDoctor = await User.create({ name, email, password : hashedPassword, role });
    
    res.status(201).json({ success: true, message: `${role} created successfully.`});
  
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
