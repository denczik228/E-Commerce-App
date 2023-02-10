const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const authRouter = require("./routes/authRoute.js");
const productRouter = require('./routes/productRoute');
const { errorHandler, notFound } = require("./middlewares/errorHandler.js");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');


const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan('dev'));

//routes
app.use('/api/user', authRouter);
app.use("/api/product", productRouter);
//----------from middleware(after routes!)
app.use(notFound);
app.use(errorHandler);

//connection to db
const mongoose = require('mongoose');

mongoose
        .set("strictQuery", false)
        .connect(process.env.MONGO_URL)
        console.log("DB was connected")
 
app.listen(PORT, () => {
    console.log(`Server starts on ${PORT}`)
});

