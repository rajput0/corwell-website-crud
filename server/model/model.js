const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: false
    },
    productPriceNew: {
        type: Number,
        required: true
    },
    productPriceOld:{
        type: Number,
        required: false
    },
    images: {
        type: Array,
        required: false
    },
    isAvailable: {
        type: Boolean,
        required: true
    }
})

const productDB = mongoose.model('productDB', schema)
module.exports = productDB;