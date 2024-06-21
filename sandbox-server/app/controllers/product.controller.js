const db = require("../models");
const Product = db.products;

// create and save a new Product
exports.create = (req, res) => {
    // validate request
    if(!req.body.name){
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }

    // create a product
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        available: req.body.available ? req.body.available : false
    });

    // save the Product in the database
    product
        .save(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the product."
            });
        });
};

// retrieve all products from the db
exports.findAll = (req, res) => {
    const name = req.query.name;
    let condition = {};

    if (req.query.name) {
        condition.name = {$regex: new RegExp(name), $options: "i"};
    }

    Product.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the Product."
            });
        });
};

// find a single Product with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Product with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Product with id=" + id});
        });

};

// update a Product by the id in the req
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }

    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found!`
                });
            } else res.send({ message: "Product was updated successfully."});
        });
};

// delete a Product with the specified id in the req
exports.delete = (req, res) => {
    const id = req.params.id;

    Product.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
                });
            } else {
                res.send({
                    message: "Product was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id=" + id
            });
        });
};

// delete all Products from the db
exports.deleteAll = (req, res) => {
    Product.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Products were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all Products."
            });
        });
};

// find all published Products
exports.findAllAvailable = (req, res) => {
    Product.find({ available: true})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Products!"
            });
        });
};