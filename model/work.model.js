const mongoose = require('mongoose')


let WorkSchema = new mongoose.Schema({
    vendorName : {
        type : String,
        required : "Required"
    },
    description : {
        type : String,
        required : "Required"
    },
    createdAt :{
        type : String,
        required : "Required"
    },
    status : {
        type : Number,
        required : "Required"
        // 0 - Active
        // 1 - Terminated
        // 2 - Approved
    },
    flag : {
        type : Number,
        default: 0
    },
    approval1: {
        type : Number,
        default: 0
    },
    approval2: {
        type : Number,
        default: 0
    }
})

mongoose.model("Work", WorkSchema)
