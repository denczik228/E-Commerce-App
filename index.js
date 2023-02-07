const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const authRouter = require("./routes/authRoute.js");

const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use('/api/user', authRouter);

//connection to db
const mongoose = require('mongoose');

mongoose
        .set("strictQuery", false)
        .connect(process.env.MONGO_URL)
        console.log("DB was connected")
 
app.listen(PORT, () => {
    console.log(`Server starts on ${PORT}`)
});

