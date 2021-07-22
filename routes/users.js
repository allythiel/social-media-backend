const { User, FriendRequestIn, FriendRequestOut, Post, validateUser, validatePos} = require('../models/user');
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
/*
////////////////////////////////////////////////////////// GET By ID //////////////////////////////////////////
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
////////////////////////////////////////////////////////// POST //////////////////////////////////////////
 router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);  
        if (error)
        return res.status(400).send(error);
   
    const user = new User({

    text: req.body.text,
    likes: req.body.likes,
    dislikes: req.body.dislikes, 
    videoId: req.body.videoId,
    });

    await user.save();
    return res.send(user);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});  
////////////////////////////////////////////////////////// POST Reply//////////////////////////////////////////
router.post('/:id/replies', async (req, res) => {
    try {
        const { error } = validateReply(req.body);  
        if (error)
        return res.status(400).send(error);

    const user = await user.findById(req.params.id)
   
    const reply = new Reply({

    text: req.body.text

    });

    user.replies.push(reply)

    await user.save();
    return res.send(user);


    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
}); 

//TODO: POST a reply to a user
//////////////////////////////////////////////////////////////////// PUT ////////////////////////////////////////
router.put('/:id', async (req, res) => {
    try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);
    const user = await user.findByIdAndUpdate(
    req.params.id,
    {
        text: req.body.text,
        likes: req.body.likes,
        dislikes: req.body.dislikes, 
        videoId: req.body.videoId,
    },
    { new: true }
    );
    if (!user)
    return res.status(400).send(`The user with id "${req.params.id}" d
   oes not exist.`);
    await user.save();
    return res.send(user);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
}); 
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