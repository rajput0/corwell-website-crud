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
    // find single product
    const id = req.query.id;
    if( id ){
        productDB.findById(id)
            .then(product => {
                if(!product) {
                    return res.status(404).send(`No user found with id: ${id}`)
                } 
                console.log("product    " + product);
                return res.send(product);
            })
            .catch(err=>{
               return res.status(500).send("errorrr "+ err.message || 'something went wrong while fetching user');
            })
            
    }else{
        // find all products
        productDB.find()
        .then(products => {
            res.send(products);
        })
        .catch(err=>{
            res.status(500).send(`error: ${err.message || "problem retriving information"}`)
        })
    }
    
        
}

// func for - update user by id
exports.update = (req, res)=>{
    if(!req.body) return res.status(404).send('data to be updated not found!');

    const id = req.params.id;
    productDB.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data=>{
            if(!data){
                res.status(404).send(`cannot update user with id ${id}`);
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(505).send(`Error while updating user information`);
        })
}

// func for - delete user by id
exports.delete = (req, res)=>{
    const id = req.params.id;
    productDB.findByIdAndDelete(id)
        .then(data => {
            if(!data) res.status(404).send('no user found to delete')
            else res.send('user deleted successfully');
        })
        .catch(err=>{
            res.status(500).send('internal error occured while deleting user')
        })

}
