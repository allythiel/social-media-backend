const { User, FriendRequestIn, FriendRequestOut, validateReply} = require('../models/user');
const express = require('express');
const router = express.Router();


// All endpoints and route handlers go here
////////////////////////////////////////////////////////// GET //////////////////////////////////////////
router.get('/', async (req, res) => {
    try {
    const comments = await Comment.find();
    return res.send(comments);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
}});
////////////////////////////////////////////////////////// GET By ID //////////////////////////////////////////
router.get('/:id', async (req, res) => {
    //TODO: refactor to get ALL comments by videoId
    try {
   
    const comment = await Comment.findById(req.params.id);
    if (!comment)
    return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);
    return res.send(comment);
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
   
    const comment = new Comment({

    text: req.body.text,
    likes: req.body.likes,
    dislikes: req.body.dislikes, 
    videoId: req.body.videoId,
    });

    await comment.save();
    return res.send(comment);
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

    const comment = await Comment.findById(req.params.id)
   
    const reply = new Reply({

    text: req.body.text

    });

    comment.replies.push(reply)

    await comment.save();
    return res.send(comment);


    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
}); 

//TODO: POST a reply to a comment
//////////////////////////////////////////////////////////////////// PUT ////////////////////////////////////////
router.put('/:id', async (req, res) => {
    try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);
    const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
        text: req.body.text,
        likes: req.body.likes,
        dislikes: req.body.dislikes, 
        videoId: req.body.videoId,
    },
    { new: true }
    );
    if (!comment)
    return res.status(400).send(`The comment with id "${req.params.id}" d
   oes not exist.`);
    await comment.save();
    return res.send(comment);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
}); 
//////////////////////////////////////////////////////////////////// PUT  Likes ////////////////////////////////////////
router.put('/:id/likes', async (req, res) => {
    try {

        const comment = await Comment.findById(req.params.id) 

    if (!comment)
    return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);

    comment.likes++

    await comment.save();
    return res.send(comment);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});  
//////////////////////////////////////////////////////////////////// PUT Dislikes////////////////////////////////////////
router.put('/:id/dislikes', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)

    if (!comment)
    return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);

    comment.dislikes++

    await comment.save();
    return res.send(comment);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
}); 
//////////////////////////////////////////////////////////////////// DELETE ////////////////////////////////////////
router.delete('/:id', async (req, res) => {
    try {
   
    const comment = await Comment.findByIdAndRemove(req.params.id);
    if (!comment)
    return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);
    return res.send(comment);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;