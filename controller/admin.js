const mongoose = require('mongoose')
const Work = mongoose.model("Work")
const Log = mongoose.model("Log")
const User = mongoose.model("User")



exports.addRequest = (req,res) => {
    const work = new Work();
    console.log(req.body.vendorName)
    console.log(req.body.description)
    work.vendorName = req.body.vendorName
    work.description = req.body.description
    let [month, date, year] = (new Date()).toLocaleDateString().split("/")
    work.createdAt =  year + '-' + month + '-' + date
    work.status = 0


    work.save().then(() => {
        console.log('Work Saved Successfully!!!!')
        res.redirect('/all-requests')
    }).catch(err => {
        console.log(err)
    })
}

exports.allRequest = (req, res) => {
    Work.find().then(docs => {
        if (docs) {

            let arr = []
            for (let i = 0; i < docs.length; i++) {
                let data = {
                    vendorName: docs[i]['vendorName'],
                    description: docs[i]['description'],
                    createdAt: docs[i]['createdAt'],
                    status: docs[i]['status']
                }
                console.log(data)
                arr = arr.concat(data)
            }
            console.log(arr)

            res.render('all-works', {
                data: arr,
                layout: 'admin.hbs'
            })
        }
        else{
            res.redirect('/empty-tasks')
        }
    }).catch(err => {
        console.log(err)
    })
}



exports.showLogs = (req, res) => {
    Log.aggregate([{
        "$project": {
            "userID": {
                "$toObjectId": "$userID"
            },
            "workID": {
                "$toObjectId": "$workID"
            },
            "marked": "$marked",
            "createdAt": "$createdAt"
        }
    }, {
        $lookup: {
            from: "users",
            localField: "userID",
            foreignField: "_id",
            as: "userData"
        }
    }, {
        $lookup: {
            from : "works",
            localField : "workID",
            foreignField : "_id",
            as : "workData"
        }
    }]).then(data => {

        let arr = []
        for (let i = 0; i < data.length ; i++){
            let dict = {
                name: data[i]['userData'][0]['userName'],
                marked: data[i]['marked'],
                vendorName: data[i]['workData'][0]['vendorName'],
                createdAt: data[i]['createdAt'],
            }
            arr = arr.concat(dict)
        }
        console.log(arr)
        res.render('logs', {
            data : arr,
            layout : 'admin.hbs'
        })
    })
}


