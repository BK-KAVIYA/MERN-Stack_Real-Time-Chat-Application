const Msg = require("../model/messageModel");
const { use } = require("../routes/messagesRoutes");

module.exports.addMessage =async (req,res,next)=>{
    try{
        const {from,to,message}=req.body;
        const data= await Msg.create({
            message:{
                text:message,
            },
            users:[from,to],
            sender:from,
        });
        if(data){
            return res.json({message:"Message sent successfully"});
        } else{
            return res.json({message:"Message not sent"});
        }
    }catch(ex){
        next(ex);
    }
}

module.exports.getAllMessage =async (req,res,next)=>{
    try{
        console.log(req.body);
        const {from,to}=req.body;
        const messages= await Msg.find({
            users:{$all:[from,to]},
        }).sort({updatedAt:1});
        const projectedMessages=messages.map((msg)=>{
            return{
               fromSelf:msg.sender.toString()===from.toString(),
               message:msg.message.text,
            };
        });
            return res.json(projectedMessages);

    }catch(ex){
        next(ex);
    }
}

