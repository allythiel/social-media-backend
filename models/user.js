const mongoose = require('mongoose');
const Joi = require('joi');


////////////////////////////////////////////////////////////////////////////////////////////////
const friendRequestInSchema = new mongoose.Schema({
    receiver: { type: String, required: true, minlength: 5, maxlength: 500 },
    status: {type: String, required: true, minlength: 5, maxlength: 50},
    dateAdded: { type: Date, default: Date.now },
  }); 
////////////////////////////////////////////////////////////////////////////////////////////////
const friendRequestOutSchema = new mongoose.Schema({
    sender: { type: String, required: true, minlength: 5, maxlength: 500 },
    status: {type: String, required: true, minlength: 5, maxlength: 50},
    dateAdded: { type: Date, default: Date.now },
  });
////////////////////////////////////////////////////////////////////////////////////////////////
const postSchema = new mongoose.Schema({
    post: { type: String, required: true, minlength: 5, maxlength: 1000 },
    likes: { type: Number, required: true, default: 0 },
    author: {type: String, required: true, minlength: 5, maxlength: 50},
    dateAdded: { type: Date, default: Date.now },
  });
 ////////////////////////////////////////////////////////////////////////////////////////////////
const friendSchema = new mongoose.Schema({
  bff: { type: String, required: true, minlength: 5, maxlength: 100 },
  dateAdded: { type: Date, default: Date.now },
});
////////////////////////////////////////////////////////////////////////////////////////////////
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 50 }, 
    password: { type: String, required: true, minlength: 5, maxlength: 50 }, 
    email: { type: String, required: true, minlength: 5, maxlength: 50 }, 
    avatar: { type: String, minlength: 0, maxlength: 50 },
    aboutMe: { type: String,  minlength: 5, maxlength: 1000 }, 
    friends: [friendSchema], 
    friendRequestIn: [friendRequestInSchema], 
    friendRequestOut: [friendRequestOutSchema], 
    posts: [postSchema],
    dateAdded: { type: Date, default: Date.now },
  });
////////////////////////////////////////////////////////////////////////////////////////////////

const User = mongoose.model('User', userSchema); 
const FriendRequestIn = mongoose.model("FriendRequestIn", friendRequestInSchema);
const FriendRequestOut = mongoose.model('FriendRequestOut', friendRequestOutSchema); 
const Post = mongoose.model("Post", postSchema);
const Friend = mongoose.model("Friend", friendSchema);
////////////////////////////////////////////////////////////////////////////////////////////////

function validateUser(user){
    const schema = Joi.object({ 
     name: Joi.string().min(2).max(50).required(), 
     password: Joi.string().min(5).max(50).required(),
     email: Joi.string().min(5).max(50).required(), 
    
     
    });
    return schema.validate(user);
} 
////////////////////////////////////////////////////////////////////////////////////////////////
function validatePost(post){
  const schema = Joi.object({
      post: Joi.string().min(5).max(1000).required(),  
      author: Joi.string().min(5).max(50).required(), 
  });
  return schema.validate(post);
}
////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  User: User,
  FriendRequestIn: FriendRequestIn,
  FriendRequestOut: FriendRequestOut,
  Post: Post, 
  Friend: Friend,
  validateUser: validateUser,
  validatePost: validatePost 
} 

