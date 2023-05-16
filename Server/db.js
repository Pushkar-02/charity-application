const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://pushkarpophali02:admin@cluster0.imvpzvl.mongodb.net/";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI).catch(error=>handleError(error));
}

module.exports = connectToMongo;