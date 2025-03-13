const express = require('express')
const connectDB = require("./config/db")
require('dotenv').config();
const app = express();

connectDB();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/users", require("./routes/userRoutes"))

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res)=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})
