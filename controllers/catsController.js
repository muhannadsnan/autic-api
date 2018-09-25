var Category = require('../models/Category');

exports.index = function (req, resp) {
    Category.readCategories((err, result) => {
        if (err) throw err;
        resp.json(result);
    });
}

exports.create = function (req, resp) {
    var newCat = req.body; // resp.json(newCat);
    Category.createCategory(newCat, function(err, result){
        if (err) throw err;
        resp.json(newCat);
    });
}

exports.show = function(req, resp) {
    var query = {"_id": req.params.id};
    Category.find(query, function(err, result) {
        if (err) throw err;
        resp.send(result);        
    });
}

exports.update = function (req, resp) {
    var query = { _id: req.params.id };
    var updatedCat = req.body;
    updatedCat.updated_at = Date.now();
    Category.updateCategory(query, updatedCat, {}, function(err, result){
        if (err) throw err;
        resp.json({ "message": 'Category "' + updatedCat.name + '" was updated successfully' });
    });
}

exports.destroy = function(req, resp) {
    var query = {"_id": req.params.id};
    Category.deleteOne(query, function(err, result) {
        if (err) throw err;        
        resp.json({ "message": 'Category was deleted successfully' });
    });
}