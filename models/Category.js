// DB CONNECTION
var db, collection;
var mongoClient = require("mongodb").MongoClient.connect(ENV.db.uri, { useNewUrlParser: true }, (err, client)=>{
    if(err) throw err;
    db = client.db("autic");
    collection = db.collection("categories");
    console.log("---------------------------------------- " + ENV.db.messageConnected + " - from category model ------------------------------------------------------");
});

// FUNCTIONS
module.exports.createCategory = function(newCat, callback){
    collection.insertOne(newCat, callback);
};

module.exports.readCategories = function(callback, limit){
    collection.find(limit).toArray(callback);
};

module.exports.updateCategory = function (condition, updatedCat, options, callback){
    collection.findOneAndUpdate(condition, updatedCat, options).toArray(callback);
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

// var Category = module.exports = mongoClient.model('categories', catSchema);
