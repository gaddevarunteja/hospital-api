const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/');
const db = mongoose.connection;

db.on('error', function(err) {console.log(err)});

db.once('open', function() {console.log("Successfully connected to db")});

module.exports = db;