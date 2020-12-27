const express = require('express');
const bodyParse = require('body-parser');
const connectDB = require('./db')

require('dotenv').config({
    path: './config.env'
})

const app = express();
connectDB();
app.use(bodyParse.json());

app.get('/api/ping', (req, res) => {
    res.json("Auth Server connected")
    console.log("server pinged");    
});

const routes = require('./routes/authRoute');

app.use('/api',routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("listening to port: " + PORT);
})