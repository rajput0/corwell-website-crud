var productDB = require('../model/model'); // model for productDB Collection
var productImages = require('../model/model_images'); // model for productImages Collection
const fs = require('fs'); // fs -> node file system



/**
 * all the crud operations will be happening in this file
 * - will be exported 
 * - and accessed in the router.js
 */

// function for - create and save new product
exports.create = (req, res, next)=>{
    // return error if req.body is empty
    //console.log(req)

    if(!req.body) return res.status(400).send('Content can not be empty');

    const files = req.files
    //console.log(files);
    if(!files){
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error);
    } 

    // now storing all the images to base64 to store it into mongodb
    let imgArray = files.map((file)=>{
        let img = fs.readFileSync(file.path);
        return encode_image = img.toString('base64');
    });

    //res.json(files);


    // // storing images into database

    // const images = new productImages({
    //     productId : req.body._id,
    //     fileName : files.orignalName,
    //     contentType : files.mimetype,
    //     imageBase64 : ''
    // });

    // images
    //     .save(images)

    // create a product with provided req.body
    const product = new productDB({
        productName: req.body.productName,
        productDescription: req.body.productDescription, 
        productPriceNew: parseFloat(req.body.productPriceNew),
        productPriceOld: req.body.productPriceOld=="" ? 0 : parseFloat(req.body.productPriceOld),
        images: imgArray, //TODO figure out a way to send images from req.body
        isAvailable: (true ? req.body.isAvailable == 'on' : false)
    });

    product
        .save(product)
        .then(data => {
            res.redirect('/add-product')
        })
        .catch(err=>{
            res.status(500).send(`error: ${err.message || "Some error occured while creating product"}`)
        })

}

// function for - find a user by id/find all users
exports.find = (req, res)=>{
    // find single product if id is provided
    const id = req.query.id;
    if( id ){
        productDB.findById(id)
            .then(product => {
                if(!product) {
                    return res.status(404).send(`No user found with id: ${id}`)
                } 
                //console.log("product    " + product);
                return res.send(product);
            })
            .catch(err=>{
               return res.status(500).send("_error: "+ err.message || 'something went wrong while fetching user');
            })
    }else{
        // find all products
        productDB.find()
        .then(products => {
            res.send(products);
        })
        .catch(err=>{
            res.status(500).send(`_error: ${err.message || "problem retriving information"}`)
        })
    }      
}

// func for - update product by id
exports.update = (req, res, next)=>{
    
    //console.log(req.body, 'is req.body')
    const id = req.params.id;
    // set isAvailable variables
    if(req.body.isAvailable === 'on') req.body.isAvailable = true;
    if(!req.body.isAvailable) req.body.isAvailable = false;

    // set images
    const files = req.files
    
    if(files.length){
        let imgArray = files.map((file)=>{
            let img = fs.readFileSync(file.path);
            return encode_image = img.toString('base64');
        });

        req.body.images = imgArray;
        console.log(files);
    }

    //console.log('inside controller', req.body)
    productDB.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data=>{
            if(!data){
                res.status(404).send(`cannot update user with id ${id}`);
            }else{
                //res.send(data)
                res.redirect("/")
            }
        })
        .catch(err=>{
            res.status(505).send(`Error while updating user information`);
        })
    // const id = req.param.id;    
    // if(!req.body) return res.status(400).send('data to be send is not found');
    // let data = req.body;
    // if(data.isAvailable === 'on') data.isAvailable = true;

    // console.log('from controller', data);
    // productDB.findByIdAndUpdate(id, data, {useFindAndModify: false})
    //     .then(data=>{
    //         if(!data){
    //             res.status(404).send(`cannot update user with id ${id}`);
    //     }else{
    //             //res.send(data)
    //             res.redirect("/")
    //         }
    //     })
    //     .catch(err=>{
    //         res.status(505).send(`Error while updating user information`);
    //     })
    //console.log('controller exited');
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
