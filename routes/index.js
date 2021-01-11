const express = require('express');
const router = express.Router();


const login = require('./login')
router.use('/', login)

const admin = require('./admin')
router.use('/', admin)

const users = require('./users')
router.use('/', users)

router.get('empty-tasks', (req, res) => {
    res.render('empty')
})


module.exports = router;
