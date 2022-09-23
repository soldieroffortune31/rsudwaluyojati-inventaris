const express = require('express');
const router = express.Router();
const petugas = require('../controllers/petugas');
var level = require('../middleware/level');
var restrict = require('../middleware/restrict')

// router.post('/', petugas.create);
// router.post('/updatepetugas/:id', petugas.updatepetugas);
// router.get('/', petugas.index);
// router.get('/inputpetugas', petugas.inputPetugas);
// router.get('/update/:id', petugas.renderpetugas);
// router.get('/updatepassword', petugas.renderpassword);
// router.post('/update', petugas.updatepassword);

router.post('/',level, petugas.create);
router.post('/updatepetugas/:id',level, petugas.updatepetugas);
router.get('/', level, petugas.index);
router.get('/inputpetugas',level, petugas.inputPetugas);
router.get('/update/:id',level, petugas.renderpetugas);
router.get('/updatepassword',restrict, petugas.renderpassword);
router.post('/update',restrict, petugas.updatepassword);
router.get('/delete/:id', level, petugas.deletepetugas);
router.post('/api/inputpetugas', petugas.createpetugas);

module.exports = router;