'use strict';
var connectionString = `HostName=IoT-Hub-Autic.azure-devices.net;DeviceId=test-001;SharedAccessKeyName=iothubowner;SharedAccessKey=RTL3N58rFNgp016JVUJR85QuoIGiSjXzTvb5zrgZsGE=`;
var { EventHubClient, EventPosition } = require('@azure/event-hubs');

var printError = function (err) {
  console.log(err.message);
};

var printMessage = function (message) {
  console.log('Telemetry received: ');
  console.log(JSON.stringify(message.body));
  console.log('Application properties (set by device): ')
  console.log(JSON.stringify(message.applicationProperties));
  console.log('System properties (set by IoT Hub): ')
  console.log(JSON.stringify(message.annotations));
  console.log('');
};

// Connect to the partitions on the IoT Hub's Event Hubs-compatible endpoint.
// This example only reads messages sent after this application started.
var ehClient;
EventHubClient.createFromIotHubConnectionString(connectionString).then(function (client) {
  console.log("Successully created the EventHub Client from iothub connection string.");
  ehClient = client;
  return ehClient.getPartitionIds();
}).then(function (ids) {
  console.log("The partition ids are: ", ids);
  return ids.map(function (id) {
    return ehClient.receive(id, printMessage, printError, { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
  });
})
.catch(printError);

setInter(() => {
    require('./iot-twin').getTwin('test-001') ;
    require('./mqtt-iot').openClient('test-001'); // mqtt IoT 
}, 10000);

