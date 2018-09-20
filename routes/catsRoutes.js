var express = require('express');
var router = express.Router();
var catsController = require('../controllers/catsController');

//===============================

router.get('/api/cats', catsController.index);
router.post('/api/cats', catsController.create);
router.get('/api/cats/:id', catsController.show);
router.put('/api/cats/:id', catsController.update);
router.delete('/api/cats/:id', catsController.destroy);


module.exports = router;