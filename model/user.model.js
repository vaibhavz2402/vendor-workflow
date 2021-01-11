const mongoose = require('mongoose')


let UserSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : "Required"
    },
    password : {
        type : String,
        required : "Required"
    },
        //0 - sequential - workStatus = 0 , 1
        //1 - round-robin - workStatus = 2 // log also check
        //2 - any-one - workStatus = 3
    workStatus : {
        type : Number
    },
    userType : {
        type : Number
        // 0 - robin 1
        // 1 - robin 2
    }
})

mongoose.model("User", UserSchema)
