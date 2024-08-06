const express = require('express');
const app = express();
const DB = require('./db'); // Database
const BP = require('body-parser'); // Body Parser
app.use(BP.json())

app.get('/', (req, res) => {
     res.send("hello world")
})

// person Data 
const PersonRout = require('./routes/personRoutes')
app.use('/person', PersonRout);

// Menu Data
const MenuRout = require('./routes/menuRoutes')
app.use('/menu', MenuRout);


app.listen(8080, () => {
     console.log("Server is started...")
})


