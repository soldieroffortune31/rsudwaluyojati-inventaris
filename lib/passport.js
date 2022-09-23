const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {petugas} = require('../models');

async function authenticate(username, password, done){
	try{
		const user = await petugas.authenticate({username, password});
		return done(null, user)
	}catch(error){
		return done(null, false, {message : error.message})
	}
}

passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'}, authenticate))

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async(id, done) => done(null, await petugas.findByPk(id)))

module.exports = passport;