const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const request = require('request');
const config = require('config');

const { check, validationResult } = require('express-validator');

//@route : GET api/profile/me
//@desc  : to get current profile
//@access: Private
router.get('/me', [auth], async (req, res) => {
    try {

        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            res.status(400).json({ errors: [{ msg: 'Profile not found!' }] })
        }
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route : POST api/profile
//@desc  : to add and update profile
//@access: Private
router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    // build profile object
    const ProfileFields = {};

    ProfileFields.user = req.user.id;
    if (company) ProfileFields.company = company;
    if (website) ProfileFields.website = website;
    if (location) ProfileFields.location = location;
    if (bio) ProfileFields.bio = bio;
    if (status) ProfileFields.status = status;
    if (githubusername) ProfileFields.githubusername = githubusername;
    if (skills) {
        ProfileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    // build social array 
    ProfileFields.social = {};
    if (youtube) ProfileFields.social.youtube = youtube;
    if (facebook) ProfileFields.social.facebook = facebook;
    if (twitter) ProfileFields.social.twitter = twitter;
    if (instagram) ProfileFields.social.instagram = instagram;
    if (linkedin) ProfileFields.social.linkedin = linkedin;
    try {
        //update profile
        var profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: ProfileFields }, { new: true });

            return res.json(profile);

        }

        //add new profile
        profile = new Profile(ProfileFields);
        profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }


});

//@route : GET api/profile
//@desc  : to get all profiles
//@access: Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('server error');
    }
});

//@route : GET api/profile/user/:user_id
//@desc  : to get profiles by id
//@access: Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            res.status(400).json({ errors: { msg: "user not found!" } });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            res.status(400).json({ errors: { msg: "user not found!" } });
        }
        res.status(400).send('server error');
    }
});


//@route : DELETE api/profile
//@desc  : delete profile, user and post
//@access: Private
router.delete('/', auth, async (req, res) => {
    try {
        // @todo remove posts

        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(400).send('server error');
    }
});

//@route : PUT api/profile/experience
//@desc  : add profile experience
//@access: Private

router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } = req.body;
    const newExp = {
        title, company, location, from, to, current, description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

});

//@route : DELETE api/profile/experience/:exp_id
//@desc  : Delete profile experience
//@access: Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(500).send('server error');
    }
});


//@route : PUT api/profile/education
//@desc  : add profile education
//@access: Private

router.put('/education', [auth, [
    check('school', 'Title is required').not().isEmpty(),
    check('degree', 'Company is required').not().isEmpty(),
    check('fieldofstudy', 'feield of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } = req.body;
    const newEdu = {
        school, degree, fieldofstudy, from, to, current, description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

});

//@route : DELETE api/profile/education/:edu_id
//@desc  : Delete profile education
//@access: Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(500).send('server error');
    }
});


//@route : GET api/profile/github/:username
//@desc  : Delete profile education
//@access: public

router.get('/github/:username', async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/respos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecrat')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        };
        console.log(`https://api.github.com/users/${req.params.username}/respos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecrat')}`);

        await request(options, (error, response, body) => {
            if (error) console.log(error);
            //console.log('req', response);
            // console.log('body', body);
            if (response.statusCode !== 200) {
                return res.status(400).json({ msg: 'No github profile found!' });
            }

            res.json(JSON.parse(body));
        });

        //res.send('hello');

    } catch (err) {
        console.log(err.message);
        res.send('Server error');
    }
});

module.exports = router;