const { now } = require('mongoose');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'assets/img');
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+'.jpg')
    }
})

module.exports =  upload = multer({storage: storage});