const { User, FriendRequestIn, FriendRequestOut, Post, validateUser, validatePost } = require('../models/user');
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
   }
});

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

      let user = await User.findOne({ email: req.body.email });
      if (user) return res.status(400).send('User already registered.');

      user = new User({
         name: req.body.name,
         password: req.body.password,
         email: req.body.email,
         avatar: '',
         aboutMe: 'Tell us all about you...',
         friends: [],
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
            avatar: req.body.avatar,
            aboutMe: req.body.aboutMe,


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

      user.posts.push(post)

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
router.get('/:id/posts', async (req, res) => {
   //TODO: refactor to get ALL users by videoId
   try {

      const user = await User.findById(req.params.id);
      if (!user)
         return res.status(400).send(`The user with id "${req.params.id}" does not exist.`);
      return res.send(user.posts);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});
//////////////////////////////////////////////////////////////////// PUT to add a friend (need work)///////////////////////
router.put('/:id/friends', async (req, res) => {
   try {
      const { error } = (req.body);                      // validate
      if (error) return res.status(400).send(error);
      const user = await User.findByIdAndUpdate(
         req.params.id,
         {
            friends: req.body.friends,

         },
         { new: true }
      );
      if (!user)
         return res.status(400).send(`The user with id "${req.params.id}" does not exist.`);
      await user.save();
      return res.send(user.friends);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});
//////////////////////////////////////////////////////////////////// PUT  Likes (works)////////////////////////////////////////
router.put('/:userId/:postId/likes', async (req, res) => {


   try {
      const user = await User.findById(req.params.userId)

      if (!user)
         return res.status(400).send(`The post with id "${req.params.userId}" does not exist.`);

      //ternary
      user.posts.filter((data) =>
         data._id == req.params.postId ? data.likes++ : console.log('post does not exist')
      );

      await user.save();
      return res.send(user);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});
//////////////////////////////////////////////////////////////////// DELETE Post (working)///////////////////////////////////////
router.put('/:userId/:postId', async (req, res) => {
   try {

      const user = await User.findById(req.params.userId)

      if (!user)
         return res.status(400).send(`The post with id "${req.params.postId}" does not exist.`);

      //const post = await Post.findByIdAndRemove(req.params.id);
      const updatedUser = user.posts.filter((data) => data._id != req.params.postId)
      user.posts = updatedUser;
      await user.save();
      return res.send(user);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;