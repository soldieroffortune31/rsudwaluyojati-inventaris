const express = require('express');
const router = express.Router();
const mutasi = require('../controllers/mutasi');
var restrict = require('../middleware/restrict');

router.post('/', restrict, mutasi.inputmutasi);
router.get('/', restrict, mutasi.rendermutasi);
router.get('/:id_detailbarang', restrict, mutasi.renderinputmutasi);
router.post('/getdata', restrict, mutasi.getdata);

module.exports = router;