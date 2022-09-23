const express = require('express');
const router = express.Router();
const ruangan = require('../controllers/ruangan');
var level = require('../middleware/level');

router.post('/',level, ruangan.create);
router.get('/',level, ruangan.index);
router.get('/inputruangan',level, ruangan.inputruangan);
router.get('/update/:id',level, ruangan.renderupdate)
router.post('/:id',level, ruangan.updateData);
router.get('/delete/:id',level, ruangan.deleteByUpdate);
router.get('/:id',level, ruangan.delete);


module.exports = router;