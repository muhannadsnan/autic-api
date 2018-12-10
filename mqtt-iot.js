var Message = require('azure-iot-device').Message,
chalk = require('chalk'),
client;

var connectDevice = function (dev){
    var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
    var connectionString = `HostName=IoT-Hub-Autic.azure-devices.net;DeviceId=${dev};SharedAccessKey=Vnl3N7Yld7RMKa6wd0hF84Z6jEQctYNhDZBZwab0nBQ=`;
    return clientFromConnectionString(connectionString);
};

var connectCallback = function (err) {
    if (err) {
        console.error('Could not connect: ' + err);
    } else {
        console.log('Client connected by ' + chalk.yellow('mqtt iot'));
        client.on('message', function (msg) { 
            console.log(chalk.yellow('Message received: ')+msg); 
            client.complete(msg, function () {
                console.log('completed');
            });
        }); 
    }
};

module.exports = {    
    openClient: function(dev){
        client = connectDevice(dev);
        client.open(connectCallback);        
    }
}