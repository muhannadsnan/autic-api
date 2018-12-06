'use strict';
const chalk = require('chalk');
var iothub = require('azure-iothub');

module.exports = {
    getTwin: function (devID){  
        var connectionString = `HostName=IoT-Hub-Autic.azure-devices.net;DeviceId=${devID};SharedAccessKeyName=iothubowner;SharedAccessKey=RTL3N58rFNgp016JVUJR85QuoIGiSjXzTvb5zrgZsGE=`;
        var registry = iothub.Registry.fromConnectionString(connectionString);
        var queryTwins = function() {
            console.log(`IoT Hub listener on device: ${devID}.....`);
            var query = registry.createQuery("SELECT * FROM devices WHERE tags.location.plant = 'Redmond43'", 100);
            query.nextAsTwin(function(err, results) {
                if (err) {
                    console.error('Failed to fetch the results: ' + err.message);
                } else {
                    console.log(`Data from Iot device ${devID}: ` + results.map(function(twin) {return twin.deviceId}).join(','));
                }
            });
        
            // query = registry.createQuery("SELECT * FROM devices WHERE tags.location.plant = 'Redmond43' AND properties.reported.connectivity.type = 'cellular'", 100);
            // query.nextAsTwin(function(err, results) {
            //     if (err) {
            //         console.error('Failed to fetch the results: ' + err.message);
            //     } else {
            //         console.log(`Data2 from Iot device ${devID}: ` + results.map(function(twin) {return twin.deviceId}).join(','));
            //     }
            // });
        };

        registry.getTwin(devID, function(err, twin){
            if (err) {
                console.error(err.constructor.name + ': ' + err.message);
            } else {
                var patch = {
                    tags: {
                        location: {
                            plant: 1000
                      }
                    }
                };

                twin.update(patch, function(err) { // twin.properties.reported.update
                    if (err) {
                        console.error(chalk.black.bgYellow('Could not update twin: ' + err.constructor.name + ': ' + err.message));
                    } else {
                        console.log('Device: ' + chalk.cyan(twin.deviceId) + ' twin updated successfully');
                        queryTwins();
                    }
                });
            }
        });
    }      
}