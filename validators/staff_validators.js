const joi = require('joi');


// ================== Staff Validator ==================

module.exports.validateRecordData = async (req, res, next) => {

  // Expected schema
  const schema = joi.object({
    id: joi.number().required(),
    status: joi.string().allow("approved", "rejected").required(),
    doctor: joi.string().required(),
    // Check time to be in the format of "HH:MM:SS"
    time: joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/).required(),
  }).required();

  // Validate the request body against the schema
  const result = schema.validate(req.body);
  if(result.error) return res.status(400).send({success: false, error: result.error.details[0].message});

  next();
}