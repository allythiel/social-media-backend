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
/*
//////////////////////////////////////////////////////////////////// PUT  Likes ////////////////////////////////////////
router.put('/:id/likes', async (req, res) => {
    try {

        const user = await user.findById(req.params.id) 

    if (!user)
    return res.status(400).send(`The user with id "${req.params.id}" does not exist.`);

    user.likes++

    await user.save();
    return res.send(user);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});  
//////////////////////////////////////////////////////////////////// PUT Dislikes////////////////////////////////////////
router.put('/:id/dislikes', async (req, res) => {
    try {
        const user = await user.findById(req.params.id)

    if (!user)
    return res.status(400).send(`The user with id "${req.params.id}" does not exist.`);

    user.dislikes++

    await user.save();
    return res.send(user);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
}); 
//////////////////////////////////////////////////////////////////// DELETE ////////////////////////////////////////
router.delete('/:id', async (req, res) => {
    try {
   
    const user = await user.findByIdAndRemove(req.params.id);
    if (!user)
    return res.status(400).send(`The user with id "${req.params.id}" does not exist.`);
    return res.send(user);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////
*/ 
module.exports = router;