//Includes
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const express = require('express');
const mongoose = require('./mongoose');
const morgan = require('morgan');

const routes = require('./routes');

//Instantiation
const app = express();
const port = 3000;
const host = 'localhost';

//Middleware
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use((req,res,next)=>{
    req.db = mongoose;
    next();
})

//Routes
app.use('/accounts',routes.accounts);

//Error handlers


//Server bootup
app.listen(port,host,()=>{
    console.log('Server started for:' +host+':'+port);
})