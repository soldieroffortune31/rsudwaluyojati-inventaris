const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
var restrict = require('../middleware/restrict');

router.get('/', restrict, home.home);

module.exports = router;
