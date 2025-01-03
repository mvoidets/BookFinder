const mongoose = require('mongoose');
require('dotenv').config();

const username = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const uri = process.env.MONGODB_URI || `mongodb+srv://${username}:${password}@cluster0.airdz.mongodb.net` //  /?retryWrites=true&w=majority&appName=Cluster0`;
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');
console.log("URI: ", uri);

mongoose.connect('mongodb+srv://admin:QHlMyBRENwcRpN0a@cluster0.airdz.mongodb.net/', {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
