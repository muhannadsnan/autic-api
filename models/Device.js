// DB CONNECTION
var db, collection;
var mongoClient = require("mongodb").MongoClient.connect(ENV.db.uri, { useNewUrlParser: true }, (err, client)=>{
    if(err) throw err;
    db = client.db("autic");
    collection = db.collection("devices");
    console.log("---------------------------------------- " + ENV.db.messageConnected + " - from Device model ------------------------------------------------------");
});

// FUNCTIONS
module.exports.createDataForDevice = function(query, newData, callback){
    collection.updateOne(query, {$set: newData}, {upsert: true}, callback); // update or insert if not exist
};

module.exports.createDevice = function(newDev, callback){
    collection.insertOne(newDev, callback);
};

module.exports.readDevices = function(callback, limit){
    collection.find(limit).toArray(callback);
};

module.exports.readOneDevice = function(callback, limit){
    collection.find(limit).toArray(callback);
};

module.exports.updateDevice = function (condition, updatedDev, options, callback){
    collection.findOneAndUpdate(condition, updatedDev, options).toArray(callback);
}; 

// SCHEMA 
// var catSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     created_at: {
//         type: Date,
//         default: Date.now
//     },
//     updated_at: {
//         type: Date,
//         default: Date.now
//     }
// }/* ,{timestamps:true} */);

// var Device = module.exports = mongoClient.model('devices', catSchema);
