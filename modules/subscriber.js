const mongoose=require('mongoose')
const newSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    subscribertoChannel:{
        type:String,
        required:true,
    },
    subscribeDate:{
        type:Date,
        required:true,
        default:Date.now,
    }
})
module.exports= mongoose.model('subscriber',newSchema);