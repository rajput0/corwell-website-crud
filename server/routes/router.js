/**
 * This file imports functions from different files 
 * and run the function when user goes to a certain route
 **/

const express = require('express');
const route = express.Router();

// renderer functions
const services = require('../services/render');

// crud functions
const controller = require('../controller/controller');

//############### router declarations ###################
// invokes when someone navigates to the defined route
/**
 * @description home route
 * @method GET /
 */
route.get("/",services.homeRoutes);

/**
 * @description add route
 * @method GET /add-product
 */
route.get("/add-product",services.add_product);

/**
 * @description update route
 * @method GET /update-product
 */
route.get("/update-product",services.update_product);

//############### controller methods ###################
// - invokes when someone makes a request
route.get("/api/products", controller.find); 
route.post("/api/products", controller.create);
route.put("/api/products/:id", controller.update);
route.delete("/api/products/:id", controller.delete);





module.exports = route;