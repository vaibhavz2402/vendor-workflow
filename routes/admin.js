const express = require('express');
const Admin = require('../controller/admin')
const router = express.Router();
const checkAuth = require('./checkAuth')


router.get('/create-request', checkAuth.ensureAuthenticated, (req, res) => {
    res.render('createRequest', {
        layout: 'admin.hbs'
    })
})


router.post('/generate-request', Admin.addRequest)

router.get('/all-requests',checkAuth.ensureAuthenticated, Admin.allRequest)


router.get('/logs',checkAuth.ensureAuthenticated, Admin.showLogs)








module.exports = router;




