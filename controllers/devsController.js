var Device = require('../models/Device');
var iothub = require('azure-iothub');
var IoT = iothub.Registry.fromConnectionString('HostName=IoT-Hub-Autic.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=RTL3N58rFNgp016JVUJR85QuoIGiSjXzTvb5zrgZsGE=');

exports.index = function (req, resp) {
    Device.readDevices((err, result) => {
        if (err) throw err;
        resp.json(result);
    });
}

exports.insertDataFromDevice = function (req, resp) {
    IoT.getTwin(req.params.devID, function(err, twin){ 
        if (err) throw err;
        var query = {deviceId: req.params.devID};
        var newData = {"deviceId":twin.deviceId, 
                        "lastUpdated": twin.properties.desired.$metadata.$lastUpdated,
                        "version": twin.properties.desired.$metadata.$lastUpdatedVersion,
                        ...twin.properties.reported.tags};
        Device.createDataForDevice(newData, function(err, result){
            if(err) throw err;
            resp.json(newData);
        });
    });
}

exports.create = function (req, resp) {
    var newDev = req.body; // resp.json(newDev);
    Device.createDevice(newDev, function(err, result){
        if (err) throw err;
        resp.json(newDev);
    });
}

exports.show = function(req, resp) {
    var query = {"deviceId": req.params.id};
    Device.readOneDevice(query, function(err, result) {
        if (err) throw err;
        resp.send(result);        
    });
}

exports.update = function (req, resp) {
    var query = { _id: req.params.id };
    var updatedCat = req.body;
    updatedCat.updated_at = Date.now();
    Device.updateDevice(query, updatedCat, {}, function(err, result){
        if (err) throw err;
        resp.json({ "message": 'Device "' + updatedCat.name + '" was updated successfully' });
    });
}

exports.destroy = function(req, resp) {
    var query = {"_id": req.params.id};
    Device.deleteOne(query, function(err, result) {
        if (err) throw err;        
        resp.json({ "message": 'Device was deleted successfully' });
    });
}