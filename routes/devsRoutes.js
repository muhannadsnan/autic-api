var express = require('express');
var router = express.Router();
var devsController = require('../controllers/devsController');

//===============================

router.get('/api/devs', devsController.index);
router.post('/api/devs', devsController.create);
router.get('/api/devs/:id', devsController.show);
router.put('/api/devs/:id', devsController.update);
router.delete('/api/devs/:id', devsController.destroy);

router.get('/api/insert/:devID', devsController.insertDataFromDevice);


module.exports = router;