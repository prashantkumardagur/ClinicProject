const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

//------------------------------------------------------------------

// ============================================================================================================================================================

// Middleware to check if user is logged in
module.exports.authCheck = async (req, res, next) => {
  try {
    // Extracting token from header
    if (!req.headers.authorization)
      return res
        .status(401)
        .json({ success: false, error: "No token provided" });

    const token = req.headers.authorization.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ success: false, error: "No token provided" });

    // Verifying token
    const decoded = jwt.verify(token, jwtSecret);

    // Assigning decoded values to request
    req.user = decoded.user;

    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: err.message });
  }
};

// ==========================================================================================

// Middleware to check if user is staff member
module.exports.isStaff = async (req, res, next) => {
  if (!req.user || req.user.role !== "staff")
    return res.status(401).json({ success: false, error: "Unauthorized" });
  next();
};

// Middleware to check if user is doctor
module.exports.isDoctor = async (req, res, next) => {
  if (!req.user || req.user.role !== "doctor")
    return res.status(401).json({ success: false, error: "Unauthorized" });
  next();
};

// Middleware to check if user is patient
module.exports.isUser = async (req, res, next) => {
  if (!req.user || req.user.role !== "user")
    return res.status(401).json({ success: false, error: "Unauthorized" });
  next();
};
