const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../../middleware/auth');
const User = require('../../models/User');

//@route : GET api/auth
//@desc  : To check user
//@access: Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


//@route : POST api/auth/login
//@desc  : Register user
//@access: Public
router.post('/login', [
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        // Check user
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid username or password' }] });
        }

        const isMatch = await bcript.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ error: [{ msg: 'Invalid username or password' }] });
        }

        // Return jsonWebToken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

        //res.send('User registerd');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;