import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB');
}).catch((error)=>{
    console.log(error);
})

const app = express()

app.listen(()=>{
    console.log('Server Running on PORT 3000');
})