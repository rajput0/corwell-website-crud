const axios = require('axios');


exports.homeRoutes = (req,res)=>{
    // making a get request to api/users
    axios.get('http://localhost:3000/api/users')
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
    res.render('add_products');
}

exports.update_product = (req,res)=>{
    res.render('update_product');
}

