// DB CONNECTION
var db, collection;
var mongoClient = require("mongodb").MongoClient.connect(ENV.db.uri, { useNewUrlParser: true }, (err, client)=>{
    if(err) throw err;
    db = client.db("autic");
    collection = db.collection("devices");
    console.log("---------------------------------------- " + ENV.db.messageConnected + " - from Device model ------------------------------------------------------");
});

// FUNCTIONS
module.exports.createDataForDevice = function(newData, callback){
    collection.insertOne(newData, {upsert: true}, callback); // update or insert if not exist
};

module.exports.createDevice = function(newDev, callback){
    collection.insertOne(newDev, callback);
};

module.exports.readDevices = function(callback){
    collection.find().toArray(callback);
};

module.exports.readOneDevice = function(query, callback, limit=100){
    collection.find(query).limit(limit).toArray(callback);
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
