const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');

//@route : POST api/post
//@desc  : add post
//@access: Private
router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }
        post = new Post(newPost);
        post = await post.save();
        res.json(post);
    } catch (err) {
        console.log(err.message);
        res.send('Server error');
    }
});

//@route : GET api/post
//@desc  : get all postes
//@access: Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.log(err.message);
        res.send('Server error');
    }
});

//@route : GET api/post
//@desc  : get poste by id
//@access: Private
router.get('/:id', auth, async (req, res) => {
    try {
        const posts = await Post.findById(req.param.id);
        res.json(posts);
    } catch (err) {
        console.log(err.message);
        res.send('Server error');
    }
});

module.exports = router;