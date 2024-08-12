const mongodb = require('mongoose')
// require('dotenv').config()
// const URLmongodb = process.env.URLmongodb;
// const URLmongodbLocal = process.env.URLmongodbLocal;

const URLmongodb = 'mongodb://localhost:27017/Hotels';

mongodb.connect(URLmongodb, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
})

const db = mongodb.connection

db.on('connected', () => {
     console.log("Database Connected...")
})

db.on('error', (err) => {
     console.log("Database Error", err)
})

db.on('disconnected', () => {
     console.log("Database Disconnected..");

})

module.exports = db;