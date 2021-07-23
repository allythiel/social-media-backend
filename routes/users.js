const { User, FriendRequestIn, FriendRequestOut, Post, validateUser, validatePost} = require('../models/user');
const express = require('express');
const router = express.Router();


// All endpoints and route handlers go here
////////////////////////////////////////////////////////// GET all users//////////////////////////////////////////
router.get('/', async (req, res) => {
    try {
    const users = await User.find();
    return res.send(users);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
}}); 

////////////////////////////////////////////////////////// GET User By ID //////////////////////////////////////////
router.get('/:id', async (req, res) => {
    //TODO: refactor to get ALL users by videoId
    try {
   
    const user = await User.findById(req.params.id);
    if (!user)
    return res.status(400).send(`The user with id "${req.params.id}" does not exist.`);
    return res.send(user);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});
////////////////////////////////////////////////////////// POST new User//////////////////////////////////////////
 router.post('/', async (req, res) => {
    try {
        const { error } = (req.body);  // validateUser
        if (error)
        return res.status(400).send(error);
   
    const user = new User({

    name: req.body.name,
    password: req.body.password,
    email: req.body.email, 
  
    });

    await user.save();
    return res.send(user);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});   


//////////////////////////////////////////////////////////////////// PUT for user Profile update////////////////////////
router.put('/:id', async (req, res) => {
    try {
    const { error } = (req.body);                      // validate
    if (error) return res.status(400).send(error);
    const user = await User.findByIdAndUpdate(
    req.params.id,
    {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email, 
        photoURL: req.body.photoURL,  
        aboutMe: req.body.aboutMe,
        friends: req.body.friends,
        friendRequestIn: req.body.friendRequestIn, 
        friendRequestOut: req.body.friendRequestOut,
        post: req.body.post,
 

    },
    { new: true }
    );
    if (!user)
    return res.status(400).send(`The user with id "${req.params.id}" does not exist.`);
    await user.save();
    return res.send(user);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});   
////////////////////////////////////////////////////////// POST new Post //////////////////////////////////////////
router.post('/:id/post', async (req, res) => {
    try {
        const { error } = (req.body);  // validateUser
        if (error)
        return res.status(400).send(error);

        const user = await User.findById(req.params.id)

    const post = new Post({

    post: req.body.post,
    author: req.body.author,
    likes: req.body.likes, 
  
    });

    user.post.push(post)

    await user.save();
    return res.send(user);

    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});    
////////////////////////////////////////////////////////// POST new friend Request IN //////////////////////////////////////////
router.post('/:id/friendRequestIn', async (req, res) => {
    try {
        const { error } = (req.body);  // validateUser
        if (error)
        return res.status(400).send(error);

        const user = await User.findById(req.params.id)

    const friendRequestIn = new FriendRequestIn({

    receiver: req.body.receiver,
    status: req.body.status,
     
  
    });

    user.friendRequestIn.push(friendRequestIn)

    await user.save();
    return res.send(user);

    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});    
////////////////////////////////////////////////////////// POST new friend Request OUT //////////////////////////////////////////
router.post('/:id/friendRequestOut', async (req, res) => {
    try {
        const { error } = (req.body);  // validateUser
        if (error)
        return res.status(400).send(error);

        const user = await User.findById(req.params.id)

    const friendRequestOut = new FriendRequestOut({

    sender: req.body.sender,
    status: req.body.status,
     
  
    });

    user.friendRequestOut.push(friendRequestOut)

    await user.save();
    return res.send(user);

    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
}); 
////////////////////////////////////////////////////////// GET all Posts for User//////////////////////////////////////////
router.get('/:id/post', async (req, res) => {
    //TODO: refactor to get ALL users by videoId
    try {
   
    const user = await User.findById(req.params.id);
    if (!user)
    return res.status(400).send(`The user with id "${req.params.id}" does not exist.`);
    return res.send(user.post);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});
//////////////////////////////////////////////////////////////////// PUT  Likes (still nededs work)////////////////////////////////////////
router.put('/:id/post/:id/likes', async (req, res) => {
    
    
    try {
        const user = await User.findById(req.params.id)
        const post = await Post.findById(req.params.id) 

    if (!post)
    return res.status(400).send(`The post with id "${req.params.id}" does not exist.`);

    post.likes++

    await post.save();
    return res.send(user.post);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
}); 
//////////////////////////////////////////////////////////////////// DELETE Post (neeeds to be corrected)///////////////////////////////////////
router.delete('/:userId/post/:postId', async (req, res) => {
    try {

        const user = await User.findById(req.params.id)
    //const post = await Post.findByIdAndRemove(req.params.id);
        //const updatedUser = await user.post.filter((data)=> data!==req.params.postId) 
       //console.log(updatedUser); 
        console.log(user.post);

    if (!user)
    return res.status(400).send(`The post with id "${req.params.id}" does not exist.`);
    return res.send(user);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
}); 
///////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;