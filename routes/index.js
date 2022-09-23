const express = require('express');
const router = express.Router();
const login = require('../controllers/login');

router.get('/', (req,res) => {
    if(req.isAuthenticated()){
        res.redirect('/home')
    }else{
        res.render('index')
    }
})
router.post('/', login.login);

module.exports = router;