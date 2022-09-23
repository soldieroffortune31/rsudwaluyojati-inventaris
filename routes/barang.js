const express = require('express');
const router = express.Router();
const barang = require('../controllers/barang');
var restrict = require('../middleware/restrict'); 


router.post('/',restrict, barang.create);
router.post('/:id',restrict, barang.update);
router.get('/detailbarang/:id', restrict, barang.detailbarang);
router.get('/deletebyupdate/:id',restrict, barang.deleteByUpdate);
router.get('/',restrict, barang.renderbarang);
// router.get('/previewbarang/:id',restrict, barang.renderpreview);
router.get('/inputbarang',restrict, barang.renderinputbarang);
router.get('/updatebarang/:id',restrict, barang.renderupdate);
router.get('/updateno/:id', restrict, barang.renderupdateno);
router.post('/tambah/:id',restrict, barang.tambah);
router.get('/delete/:id', restrict, barang.delete);

module.exports = router;