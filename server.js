const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({path: 'config.env'});
const PORT = process.env.PORT || 5500;

// log requests
app.use(morgan('tiny'));

// mongo connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))
// add view engine
app.set('view engine','ejs');
// app.set("view", path.resolve(__dirname, "view/whatever_folder_name_is"))

// telling node, where to fetch css from
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

app.use('/',require('./server/routes/router'));

app.listen(PORT, ()=>{
    console.log("Server started on ", PORT);
})