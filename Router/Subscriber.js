const express = require('express');
const router = express.Router();
const subs= require('../modules/subscriber.js');
const subscriber = require('../modules/subscriber.js');

router.get('/',async (req,res)=>{
    try{
        const data= await subs.find();
        res.send(data);
    }
    catch(err){
        res.status(500).json({message:err.json})
    }
});
router.get('/:id',getsub,(req,res)=>{
    res.json(res.subs.name);
});
router.post('/',async(req,res)=>{
    const sub = new  subscriber({
        name:req.body.name,
        subscribertoChannel:req.body.subscribertoChannel

    })
    try{
        const newsub= await  sub.save();
        res.status(201).send(newsub);
    }
    catch(err){
        res.status(400).json({message:err.json})
    }
});
router.patch('/:id',getsub,async (req,res)=>{
    if(req.body.name!=null){
        res.subs.name =req.body.name;
    }
    if(req.body.subscribertoChannel!=null){
        res.subs.subscribertoChannel =req.body.subscribertoChannel;
    }
    try{
        const updatedsub = await res.subs.save();
        res.json(updatedsub);
    }
    catch(err){
        res.status(404).json({message:err.message});
    }
});
router.delete('/:id',getsub,async (req,res)=>{
    try{
        await res.subs.deleteOne(res.subs);
        res.json("deleted frfr")
    }
    catch(err){
                res.status(404).json({message:err.message});

    }
});
async function getsub(req,res,next){
    let subs;
    try{
        subs = await subscriber.findById(req.params.id);
        if(subs == null){
           return res.status(404).json({message:'hmmm not working huh'});
        }

    }
    catch(err){
    return res.status(500).json({ message: err.message });
    }
    res.subs=subs;
    next();
}

module.exports=router;