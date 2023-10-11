const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

db.on('error', function(err) {console.log(err)});

db.once('open', function() {console.log("Successfully connected to db")});

module.exports = db;