const mongoose = require('mongoose')


let LogSchema = new mongoose.Schema({
    workID : {
        type : String,
        required : "Required"
    },
    userID : {
        type : String,
        required : "Required"
    },
    createdAt :{
        type : String,
        required : "Required"
    },
    marked : {
        type : Number,
        required : "Required"
        // 0 - Approved
        // 1 - Reject & Remove
        // 2 - Reject

    }
})

mongoose.model("Log", LogSchema)
