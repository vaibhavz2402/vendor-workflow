const express = require('express');
const User = require('../controller/user')
const router = express.Router();
const checkAuth = require('./checkAuth')



router.get('/tasks', checkAuth.ensureAuthenticated, User.getUserRequests)

router.post('/user-action', User.makeAction)







module.exports = router;




