const express = require('express');
const passport = require('passport');
const checkAuth = require('./checkAuth')

const router = express.Router();


router.get('/login',(req, res) => {
    //console.log("Login Route")
    res.render('login', {
        layout: 'login.hbs'
    });
});



//Admin Passport Strategy
router.post('/adminsignin',
    passport.authenticate('local-signin', {failureRedirect: '/login'}),
    function (req, res) {
    if(req.user.userName == "admin"){
        res.redirect('/create-request')
    }
    else{
        res.redirect('/tasks')
    }

    });



router.get('/logout', checkAuth.destroySession)




module.exports = router;




