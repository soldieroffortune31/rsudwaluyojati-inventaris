const express = require('express');
const router = express.Router();
const kondisi = require('../controllers/kondisi');
var restrict = require('../middleware/restrict');

// router.post('/', restrict, mutasi.inputmutasi);
router.get('/', restrict, kondisi.renderkondisi);
router.get('/:id', restrict, kondisi.renderupdate);
router.post('/getdata', restrict, kondisi.getdata);
router.post('/',restrict, kondisi.update);
router.get('/delete/:id', restrict, kondisi.delete)

module.exports = router;