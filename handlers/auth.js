const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User.js');

// Maps passport fields to email and password fields in database.
const localOpt = {
    usernameField : 'email',
    passwordField : 'password_bcrypt'
};

// Strategy for validating login
const strategy = new LocalStrategy(localOpt, async (email, password, done) => {
    try {
        // Finds the user matching the email. 
        const userChosen = await UserModel.findOne({ email: email });

        if ( !userChosen ) {
            //Set message to email not found if no user matches that email.
            return done(null, false, { message : 'Email not found'});
        }
        //Validate password for found user, if not found return error. 
        const validate = await userChosen.isValidPassword(password);
        if ( !validate ) {
            return done(null, false, { message : 'Wrong Password'});
        }
        //If logged in send successful message.
        return done(null, userChosen, { message : 'Logged in Successfully'});
    }
    catch (error) {
        return done(error);
    }
});

// Use strategy defined above for login. 
passport.use('localLogin', strategy);

//Save email in session detail. 
passport.serializeUser( (user, done) => done(null, user.email) );
passport.deserializeUser(async (email, done) => {
    try {
        const user = await UserModel.findOne({ email: email });
        done(null, user, { message: "Welcome"});
    } catch (error) {
        done(error);
    }
});

