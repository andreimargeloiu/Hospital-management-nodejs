// for testing purposes ->  'mongodb://localhost:27017/NHSapp
var mongoose = require ('mongoose');


mongoose.Promise = global.Promise;
// process.env.MONGODB_URI
mongoose.connect("mongodb://admin:admin123@ds145220.mlab.com:45220/nhs-app");

module.exports = {mongoose};
