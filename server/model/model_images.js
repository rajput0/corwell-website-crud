const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    productId: {
        type: String,
        required: false
    },
    
    fileName: {
        type: Array,
        required: false
    },

    contentType: {
        type: Array,
        required: false
    },

    imageBase64: {
        type: String,
        required: false
    }
})

const productImages = mongoose.model('productImages', schema)
module.exports = productImages;