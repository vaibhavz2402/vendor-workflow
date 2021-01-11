const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
let bCrypt = require('bcrypt-nodejs');
const User = mongoose.model("User")

module.exports = function (passport) {
    try {

        passport.use('local-signin',
            new LocalStrategy({
                    usernameField: 'username',
                    passwordField: 'password',
                    passReqToCallback: true // allows us to pass back the entire request to the callback
                },
                (req, username, password, done) => {
                    let isValidPassword = function(userpass, password) {
                        return bCrypt.compareSync(password, userpass);
                    }

                    User.findOne({'userName' : username})
                        .then(user => {
                        console.log(user)
                        if (!user) {
                            console.log("Not User")
                            return done(null, false, {
                                message: 'User does not exist'
                            });
                        }

                        console.log("Username correct")

                        if (!isValidPassword(user.password, password)) {
                            return done(null, false, {
                                message: 'Incorrect password.'
                            });
                        }

                        console.log(req.user)
                        return done(null, user);

                    }).catch(function(err) {
                        console.log("Error:", err);
                        return done(null, false, {
                            message: 'Something went wrong with your Signin'
                        });
                    });
                }))

        passport.serializeUser(function (user, done) {  //Important for callback
            done(null, user);
        });

        passport.deserializeUser(function (user, done) {    //Important for callback
            done(null, user);
        });
    }
    catch (e){
        console.log("error: ", e)
    }

}






