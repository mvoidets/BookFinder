const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://dbUser:gzK8sfeDXgiqpkFc@cluster1.ptcdc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1/googlebooksDB');

module.exports = mongoose.connection;
