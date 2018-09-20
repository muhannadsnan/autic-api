var env = require('../environment/environment')
var envDB = env.db;

// DB CONNECTION
var db, collection;
var mongoClient = require("mongodb").MongoClient.connect(envDB.uri, { useNewUrlParser: true }, (err, client)=>{
    db = client.db("autic");
    collection = db.collection("categories");
    console.log("---------------------------------------- " + envDB.messageConnected + " - from category model ------------------------------------------------------");
});

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

// var Category = module.exports = mongoClient.model('categories', catSchema);

module.exports.createCategory = function(newCat, callback){
    collection.create(newCat).toArray(callback);
};

module.exports.readCategories = function(callback, limit){
    collection.find(limit).toArray(callback);
};

module.exports.updateCategory = function (condition, updatedCat, options, callback){
    collection.findOneAndUpdate(condition, updatedCat, options).toArray(callback);
};