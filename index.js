// ENVIROMENT VARIABLES =====================================================================
require('dotenv').config()


// IMPORTS =================================================================================
//Gokul again

var gokul = "Gokul"
const express = require('express')
const cors = require('cors')

const app = express()



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
});


// 404 PAGE NOT FOUND =======================================================================
app.use((req, res, next) => {
    res.status(404).send({ success: false, message: "Page Not Found" })
});



// SERVER ==================================================================================

app.listen(process.env.PORT, function() {
    console.log(`App is running on port ${process.env.PORT}`)
})