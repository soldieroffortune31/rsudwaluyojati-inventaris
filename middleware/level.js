module.exports = (req, res, next) => {
    if(req.isAuthenticated() && req.user.dataValues.level === "Admin") return next()
    res.redirect('/')
}

// const passport = require('../lib/passport');

// module.exports = passport.authenticate('jwt', {
//   session : false  
// })