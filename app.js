
const express = require('express')
const mongoose = require('mongoose')

const dotEnv = require('dotenv');
const cors = require('cors');

const app = express();
const sessionRouter = require('./app/routers/session.routes');
dotEnv.config();

const PORT = process.env.PORT || 5000


// Middleware
app.use(cors());
app.use(express.json());
app.use('/sessions',sessionRouter);
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

app.get('/', ( req,res)=>{
    res.send('Welcome to Ai Tutor....');
})

app.listen(PORT, ()=>{
    console.log('Server started and running at ' , PORT)
})