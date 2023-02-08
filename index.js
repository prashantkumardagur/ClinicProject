// ENVIROMENT VARIABLES =====================================================================
require('dotenv').config()

// IMPORTS =================================================================================

const express = require('express')


// CONFIGS =================================================================================

const app           = express()
const port          = 5000








// MDDLEWARES ===============================================================================

app.use(express.json())



// ROUTES ==================================================================================

const authRoutes = require('./routes/auth_routes')
const doctorRoutes = require('./routes/doctor_routes')
const staffRoutes = require('./routes/staff_routes')
const userRoutes = require('./routes/user_routes')


app.use("/auth", authRoutes)
app.use("/doctor", doctorRoutes)
app.use("/staff", staffRoutes)
app.use("/user", userRoutes)



app.get('/', (req, res) => {
    res.send('Hello World!')
})

// SERVER ==================================================================================

app.listen(port, function() {
    console.log(`App is running on port ${port}`)
})