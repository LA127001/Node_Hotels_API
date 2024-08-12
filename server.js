const express = require('express');
const app = express();
const DB = require('./db'); // Database
const BP = require('body-parser'); // Body Parser
const passport = require('./auth')
app.use(BP.json())
const port = process.env.port || 8080



// Middleware function

const logRequest = (req, res, next) => {
     console.log(`${new Date().toLocaleString()} Request made to : ${req.originalUrl}`);
     next();
}

app.use(logRequest)
require('dotenv').config()


app.use(passport.initialize());

const localMiddleware = passport.authenticate('local', { session: false })

app.get('/', (req, res) => {
     res.send("hello world")
})

// person Data 
const PersonRout = require('./routes/personRoutes')
app.use('/person', PersonRout);

// Menu Data
const MenuRout = require('./routes/menuRoutes')
app.use('/menu',  MenuRout);

app.listen(port, () => {
     console.log("Server is started...")
})


