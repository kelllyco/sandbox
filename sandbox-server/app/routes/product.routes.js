module.exports = app => {
    const products = require("../controllers/product.controller.js");

    var router = require("express").Router();

    // create a new product
    router.post("/", products.create);

    // retrieve all products
    router.get("/", products.findAll);

    // retrieve all published products
    router.get("/available", products.findAllAvailable);

    // retrieve a single product with id
    router.get("/:id", products.findOne);

    // update a product with id
    router.put("/:id", products.update);

    // delete a product with id
    router.delete("/:id", products.delete);

    // delete all products
    router.delete("/", products.deleteAll);

    app.use('/api/products', router);
};