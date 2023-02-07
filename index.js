const express = require('express');
const app = express();

const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;

//connection to db
const mongoose = require('mongoose');
() => {
try{
mongoose
        .set("strictQuery", false)
        .connect(process.env.MONGO_URL)
        console.log("DB was connected")
    } catch (err) {
        console.log(err)
    }
}

//for 1st testing
// app.use("/", (req, res) => {
//     res.send("hello 1st")
// })

app.listen(PORT, () => {
    console.log(`Server starts on ${PORT}`)
});

