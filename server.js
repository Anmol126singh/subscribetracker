require('dotenv').config();

const express=require('express');
const app = express();
const mongoose=require('mongoose');
mongoose.connect(process.env.Data_URL)
const db= mongoose.connection;
db.on("error",(error)=>console.log(error));

db.once('open',()=>console.log('database connected'));

app.use(express.json());
const SubscriberRouter = require('./Router/Subscriber.js');
app.use('/subscriber',SubscriberRouter);
app.listen(3000,()=>{
    console.log('server started');
})