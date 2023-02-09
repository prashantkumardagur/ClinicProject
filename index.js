// ENVIROMENT VARIABLES =====================================================================
require('dotenv').config()

// IMPORTS =================================================================================

const express = require('express')
const cors = require('cors')


// CONFIGS =================================================================================

const app           = express()
const port          = 5000



// MDDLEWARES ===============================================================================

app.use(express.json())
app.use(cors())



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


app.use((req, res, next) => {
    res.status(404).send({ success: false, message: "Page Not Found" })
})



// SERVER ==================================================================================

app.listen(port, function() {
    console.log(`App is running on port ${port}`)
})