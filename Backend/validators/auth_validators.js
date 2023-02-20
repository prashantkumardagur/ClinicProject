const joi = require('joi');


// =====================================================================================


module.exports.validateLoginData = async (req, res, next) => { 
  
  // Sschema for validating login data
  const schema = joi.object({
      email: joi.string().min(3).max(64).required(),
      password: joi.string().min(6).max(32).required().regex(/^[^<>%$()]*$/),
  }).required();

  // Validate the data
  const result = schema.validate(req.body);

  // If there is an error, return the error message
  if(result.error) return res.status(400).send({success: false, error: result.error.details[0].message});

  next();
}




module.exports.validateRegisterData = async (req, res, next) => {
  
  // Schema for validating register data
  const schema = joi.object({
    name: joi.string().min(3).max(64).required().regex(/^[^<>%$()]*$/),
    email: joi.string().min(3).max(64).required().email(),
    password: joi.string().min(6).max(32).required().regex(/^[^<>%$()]*$/)
  }).required();

  // Validate the data
  const result = schema.validate(req.body);
  if(result.error) return res.status(400).send({success: false, error: result.error.details[0].message});
  
  next();
}




module.exports.validateNewStaffData = async (req, res, next) => {

  // Schema for validating new doctor data
  const schema = joi.object({
    name: joi.string().min(3).max(64).required().regex(/^[^<>%$()]*$/),
    email: joi.string().min(3).max(64).required().email(),
    password: joi.string().min(6).max(32).required().regex(/^[^<>%$()]*$/),
    role: joi.string().allow('doctor', 'staff').required()
  }).required();

  // Validate the data
  const result = schema.validate(req.body);
  if(result.error) return res.status(400).send({success: false, error: result.error.details[0].message});

  next();
}