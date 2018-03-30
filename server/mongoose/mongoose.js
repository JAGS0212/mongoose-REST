const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // Configure promise implementation to use default ES6
mongoose.connect('mongodb://localhost:27017/edx-course-db');

function cleanUp(){
        console.log('CLOSING DB CLIENT');
        mongoose.disconnect();
}

process.on('SIGINT',()=>{
    console.log('SIGINT');
    cleanUp();
    process.exit();
});
process.on('SIGTERM',()=>{
    console.log('SIGTERM');
    cleanUp();
    process.exit();
});
process.on('SIGHUP',()=>{
    console.log('SIGHUP');
    cleanUp();
    process.exit();
});
process.on('SIGBREAK',()=>{
    console.log('SIGBREAK');
    cleanUp();
    process.exit();
});


module.exports = mongoose;

