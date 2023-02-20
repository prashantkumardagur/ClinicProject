const joi = require('joi');

// =========================================================================


module.exports.validateAppointmentData = async (req, res, next) => {

  // request body schema
  const schema = joi.object({
    // Check if date is in formate dd/mm/yyyy
    date: joi.string().regex(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/).required(),
    notes: joi.string().max(1024).required(),
  }).required();

  // Validate request body
  const result = schema.validate(req.body);
  if(result.error) return res.status(400).send({success: false, message: result.error.details[0].message});
  
  next();
}