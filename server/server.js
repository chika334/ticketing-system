const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require("path")
const mongoose = require('mongoose')
require('dotenv').config()

const user = require('./routes/user')
const auth = require('./routes/auth')
const event = require('./routes/event')

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

// routes
app.use(express.json())
app.use('/api', user)
app.use('/api', auth)
app.use('/api', event)
app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
        res.status(401).json({"error": err.name + ": " + err.message})
    } else {
        res.status(500).json({"error": "Something went wrong" + err})
        //console.log(err)
    }
})

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err))
    

app.use("/uploads", express.static(path.join(__dirname, 'uploads')));    
    
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("Connected to server")
})
