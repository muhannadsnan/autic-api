var express = require('express');
var router = express.Router();
var devsController = require('../controllers/devsController');

//===============================

router.get('/devices', devsController.index);
router.post('/devices', devsController.create);
router.get('/devices/:id', devsController.show);
router.put('/devices/:id', devsController.update);
router.delete('/devices/:id', devsController.destroy);

router.get('/devices/insert/:devID', devsController.insertDataFromDevice);


module.exports = router;