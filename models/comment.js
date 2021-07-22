const mongoose = require('mongoose');
const Joi = require('joi');

////////////////////////////////////////////////////////////////////////////////////////////////
const replySchema = new mongoose.Schema({
  text: { type: String, required: true, minlength: 5, maxlength: 1000 },
  dateAdded: { type: Date, default: Date.now },
});
////////////////////////////////////////////////////////////////////////////////////////////////
const commentSchema = new mongoose.Schema({
    text: { type: String, required: true, minlength: 5, maxlength: 500 },
    dateAdded: { type: Date, default: Date.now },
    replies: [replySchema],
    likes: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
    videoId: { type: String, required: true, minlength: 4, maxlength: 50 },
  });
////////////////////////////////////////////////////////////////////////////////////////////////
const Comment = mongoose.model('Comment', commentSchema); 
const Reply = mongoose.model("Reply", replySchema);


function validateComment(comment){
    const schema = Joi.object({
        text: Joi.string().min(5).max(500).required(), 
        likes: Joi.number(),
        dislikes: Joi.number(),
        videoId: Joi.string().min(4).max(50).required(),

    });
    return schema.validate(comment);
} 

function validateReply(reply){
  const schema = Joi.object({
      text: Joi.string().min(5).max(500).required(), 
  });
  return schema.validate(reply);
}


module.exports = {
  Comment: Comment,
  Reply: Reply,
  validate: validateComment,
  validateReply: validateReply
}