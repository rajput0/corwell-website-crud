var productDB = require('../model/model');

/**
 * all the crud operations will be happening in this file
 * - will be exported 
 * - and accessed in the router.js
 */

// function for - create and save new product
exports.create = (req, res)=>{
    // return error if req.body is empty
    if(!req.body) return res.status(400).send('Content can not be empty');

    // else create a product with provided req.body
    const product = new productDB({
        productName: req.body.productName,
        productPriceNew: parseFloat(req.body.productPriceNew),
        productPriceOld: parseFloat(req.body.productPriceOld),
        images: req.body.images, //TODO figure out a way to send images from req.body
        isAvailable: req.body.isAvailable 
    });

    product
        .save(product)
        .then(data => {
            res.send(data)
        })
        .catch(err=>{
            // TODO maybe wrong
            res.status(500).send(`error: ${err.message || "Some error occured while creating product"}`)
        })
    
}

// function for - find a user by id
exports.find = (req, res)=>{
    
}

// func for - update user by id
exports.update = (req, res)=>{
    
}

// func for - delete user by id
exports.delete = (req, res)=>{
    
}
