const Idea = require("../model/IdeaModel");

module.exports.newidea = async (req,res,next)=>{
    try {
    const {idea,Col}=req.body;
    const newIdea = await Idea.create({
        Pcolor: Col,
        content:idea
    });
    return res.json({status:true,newIdea});
    } catch(ex){
        next(ex);
    }
};

module.exports.getAllpost=async (req,res,next)=>{
    try {
        const all = await Idea.find();
        return res.json({status:true,all});
        } catch(ex){
            next(ex);
        }
};

module.exports.likePost=async(req,res,next)=>{
    try{
        const {_id,likes,liked}=req.body;
        const updatedlikes=liked?likes-1:likes+1;
        const post=await Idea.findByIdAndUpdate(_id,{
                likeCount:updatedlikes
            });
            return res.json({status:true,post});   
    }catch(ex){
        next(ex);
    }
};

module.exports.addComment=async(req,res,next)=>{
    try{
        const {_id,content}=req.body;
        const post=await Idea.findById(_id);
        post.Comment.push(content);
        const update= await Idea.findByIdAndUpdate(_id,{
            Comment:post.Comment
        });
        return res.json({status:true,post});   
    }catch(ex){
        next(ex);
    }
};