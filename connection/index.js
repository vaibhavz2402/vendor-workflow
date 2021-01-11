const mongoose = require('mongoose')


mongoose.connect("mongodb://localhost:27017/vcomply", {useUnifiedTopology : true, useNewUrlParser: true}, (err) => {
    if (!err){
        console.log("Database has been connected Successfully on Port 27017")
    }
    else{
        console.log("Error occured while connecting to the Database...")
    }
})

const User = require('../model/user.model')
const Work = require('../model/work.model')
const Log = require('../model/logs.model')
