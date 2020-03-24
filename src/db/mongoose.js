const mongoose = require('mongoose');
const Responses = require('../utils/Responses');

// mongoose.connect('mongodb://127.0.0.1:27017/norah',{
//     useNewUrlParser:true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// }).then(success => console.log("Connection to mongoose successful"))
//     .catch(err => console.error("Could not connect to mongoose ", err));

const url = Responses.mongoDbUrl;
mongoose.connect(url,{
    useNewUrlParser:true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(success => console.log("Connection to mongoose successful"))
    .catch(err => console.error("Could not connect to mongoose ", err));

process.on('exit', () => {
    // mongoose.close();
    mongoose.connection.close();
});