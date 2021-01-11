const mongoose = require('mongoose')
const Work = mongoose.model("Work")
const Log = mongoose.model("Log")
const User = mongoose.model("User")


exports.getUserRequests = (req, res) => {

    if(req.user.workStatus != 2) {
        Work.find({flag: req.user.workStatus}).then(docs => {
            if (docs){
                let arr = []
                for (let i = 0; i < docs.length; i++) {
                    let data = {
                        vendorName: docs[i]['vendorName'],
                        id: docs[i]['_id'],
                        description: docs[i]['description'],
                        createdAt: docs[i]['createdAt']
                    }
                    //console.log(data)
                    arr = arr.concat(data)
                }
                res.render('pending-works', {
                    data: arr
                })
            }
            else{
                res.redirect('/empty-tasks')
            }
        })
    }
    else{
        if(req.user.userType == 1) {

            Work.find({flag: req.user.workStatus, approval1 : 0}).then(docs => {

                if (docs){
                    let arr = []
                    for (let i = 0; i < docs.length; i++) {
                        let data = {
                            vendorName: docs[i]['vendorName'],
                            id: docs[i]['_id'],
                            description: docs[i]['description'],
                            createdAt: docs[i]['createdAt']
                        }
                        arr = arr.concat(data)
                    }
                    res.render('pending-works', {
                        data: arr
                    })
                }
                else{
                    res.redirect('/empty-tasks')
                }
            })
        }
        else{
            Work.find({flag: req.user.workStatus, approval2 : 0}).then(docs => {
                if(docs){
                    let arr = []
                    for (let i = 0; i < docs.length; i++) {
                        let data = {
                            vendorName: docs[i]['vendorName'],
                            id: docs[i]['_id'],
                            description: docs[i]['description'],
                            createdAt: docs[i]['createdAt']
                        }
                        //console.log(data)
                        arr = arr.concat(data)
                    }
                    res.render('pending-works', {
                        data: arr
                    })
                }
                else{
                    res.redirect('/empty-tasks')
                }
            })
        }
    }
}

exports.makeAction = (req,res) =>{
    console.log(req.body)
    let log = new Log();
    log.workID = req.body.workID
    log.userID = req.user._id
    log.marked = req.body.action
    let [month, date, year] = (new Date()).toLocaleDateString().split("/")
    log.createdAt =  year + '-' + month + '-' + date
    log.save().then(() => {
        if (req.user.workStatus != 2) {
            let newFlag = parseInt(req.user.workStatus) + 1
            let newStatus = 0
            if(req.body.action == 2){
                newStatus = 1
                newFlag = 4
            }
            if(req.user.workStatus == 3 && req.body.action !=2){
                newStatus = 2

            }

            Work.update(
                {_id : req.body.workID},
                {
                    $set : {
                        flag : newFlag,
                        status : newStatus
                    }
                }).then(() => {
                    res.redirect('/tasks')
            })
        }
        else{
            Work.find({_id : req.body.workID }).then( docs => {
                let total = docs[0].approval1 + docs[0].approval2
                console.log("Total", total)
                let newFlag = req.user.workStatus;
                if(total == 2){
                    newFlag = parseInt(req.user.workStatus) + 1
                }

                let newStatus = 0
                if(req.body.action == 2){
                    newStatus = 1
                    newFlag = 4
                }

                if (req.user.userType == 1){
                    Work.update(
                        {_id : req.body.workID},
                        {
                            $set : {
                                flag : newFlag,
                                status : newStatus,
                                approval1 : 1
                            }
                        }).then(() => {
                        res.redirect('/tasks')
                    })
                }
                else{
                    Work.update(
                        {_id : req.body.workID},
                        {
                            $set : {
                                flag : newFlag,
                                status : newStatus,
                                approval2 : 1
                            }
                        }).then(() => {
                        res.redirect('/tasks')
                    })
                }
            })
        }
    })
}
