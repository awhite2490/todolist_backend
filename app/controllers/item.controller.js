const Item = require('../models/item.model.js');

exports.create = (req, res) => {
    if(!req.body.text) {
        return res.status(400).send({
            message: "Item text can not be empty"
        })
    }

    const item = new Item({
        text: req.body.text,
        isComplete: req.body.isComplete || false
    });

    item.save()
    .then(data =>  {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Unknown error occurred while creating item"
        });
    });
};

exports.findAll = (req, res) => {
    Item.find()
    .then(items => {
        res.send(items);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Unknown error occurred while retrieving all items"
        });
    });
};

exports.findOne = (req, res) => {
    Item.findById(req.params.itemId)
    .then(item => {
        if(!item)  {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });
        }
        res.send(item);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });
        }
        return res.status(500).send({
            message: "Error retrieving item with id " + req.params.itemId
        });
    })
};

exports.update = (req, res) => {
    if(!req.body.text) {
        return res.status(400).send({
            message: "Item text can not be empty"
        });
    }

    Item.findByIdAndUpdate(req.params.itemId, {
        text: req.body.text,
        isComplete: req.body.isComplete || false
    }, {new: true})
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });
        }
        res.send(item);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });
        }
        return res.status(500).send({
            message: "Error updating item with id " + req.params.itemId
        });
    });
};

exports.delete = (req, res) => {
    Item.findByIdAndRemove(req.params.itemId)
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });
        }
        res.send({message: "Item deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });
        }
        return res.status(500).send({
            message: "Could not delete item with ID " + req.params.itemId
        });
    });
};