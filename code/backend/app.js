const express = require('express')
const Sequelize = require("sequelize");
const logger=require('morgan');
const cors=require('cors');
const authRouter=require('./routers/authRouter')
const courseRouter=require('./routers/courseRouter')
const reviewRouter=require('./routers/reviewRouter')
const instructorRouter=require('./routers/instructorRouter')
const app = express()
const dotenv=require('dotenv')
dotenv.config()
require('./config/connection')
require('./config/associations')

app.use(cors());
app.use(logger('dev'));
app.use(express.json())

app.use('/auth',authRouter)
app.use(courseRouter)
app.use(reviewRouter)
app.use(instructorRouter)

app.listen(4000,()=>console.log("running"))

