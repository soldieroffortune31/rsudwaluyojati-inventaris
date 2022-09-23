const express = require('express');
const router = express.Router();
const distribusi = require('../controllers/distribusi');
var restrict = require('../middleware/restrict');

router.get('/',restrict, distribusi.renderdistribusi);
router.get('/input/:id',restrict, distribusi.renderinput);
router.get('/pilih',restrict, distribusi.renderpilihbarang)
router.post('/create', restrict, distribusi.create);
router.post('/simpan', restrict, distribusi.simpan);

module.exports = router;