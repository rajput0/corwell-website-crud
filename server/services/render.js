const axios = require('axios');


exports.homeRoutes = (req,res)=>{
    // making a get request to api/users
    axios.get(`${process.env.URL}/api/products`)
        .then(function(response){
            // rendering-index.ejs and sending the data we received from get-request
            res.render('index',{products: response.data});
        })
        .catch(err=>{
            res.send(err);
        });

    //res.render('index');
}

exports.add_product = (req,res)=>{
    res.render('add_product');
}

exports.update_product = (req,res)=>{
    //res.render('update_product');
    
    axios.get(`${process.env.URL}/api/products`, {params : {id: req.query.id}})
        .then(function(response){
            // rendering-update_product and sending the data we received from get-request
            res.render('update_product',{product: response.data});
        })
        .catch(err=>{
            res.send(err);
        });
}

