const passport = require('passport');
const passportJwt = require('passport-jwt');
const passportLocal = require('passport-local');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const _ = require('lodash');

const User = require('../models/User');

const jwtStrategy = passportJwt.Strategy;
const localStrategy = passportLocal.Strategy;
const extractJwt = passportJwt.ExtractJwt;

//Declare all the strategies here
//TODO: Add Redis to JWT strategy

//Local Strategy
passport.use(new localStrategy({
    usernameField : 'email',
    passwordField : 'password'
}, async(email, password, done) => {

    try{
        let userDoc = await User.findOne({email : email}, {
            password: 1, 
            role: 1
        });

        let ifMatchedPwd = await bcrypt.compare(password, userDoc.password);

        if(ifMatchedPwd){
            return done(null, userDoc);
        }
        else{
            return done('Invalid Username/Password');
        }
    }
    catch(err){
        done(err);
    }
}))

//Jwt Strategy
passport.use(new jwtStrategy({
    jwtFromRequest : extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.AUTH_SECRET_KEY
}, async(payload, done) => {
    try{
        let userDoc = await User.findOne({_id : payload.userId});
        if(userDoc){
            if(Date.now() > payload.expires){
                let error = createError(401, 'Token Expired');
                return done(error);
            }
            else{
                return done(null, userDoc, payload);
            }
        }
        else{
            return done('Invalid Token');
        }
    }
    catch(err){
        done(err);
    }
}))
    
module.exports = passport;
