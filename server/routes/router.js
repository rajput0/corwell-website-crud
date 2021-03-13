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
route.get("/api/users/:id", controller.find); // do we need id??
route.post("/api/users", controller.create);
route.put("/api/users/:id", controller.update);
route.delete("/api/users/:id", controller.delete);





module.exports = route;