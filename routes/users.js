const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const { User, validate } = require('../models/user');

// @ route POST api/users
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try{
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already exists');

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        });

        user = new User(_.pick(req.body,
            ['name', 'email', 'password','isAdmin']));
    
        //hash password    
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
    
        await user.save();

        //create jwt token
        const token = jwt.sign({ _id: user._id, isAdmin: this.isAdmin }, process.env.JWTPRIVATEKEY);
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name',
            'email', 'isAdmin']));

    }catch (error) {
        res.status(500).send(`Error during POST api/users : ${error.message}`);
      }
});

// @ route GET api/users/me
router.get('/me', auth, async (req, res )=> {
    try{
        const user = await User.findById(req.user._id).select('-password');
        if (!user) return res.status(404).send('The user with the given ID was not found.');

        res.send(user);

    }catch (error) {
        res.status(500).send(`Error during GET api/users/me : ${error.message}`);
      }
    
   });

module.exports = router;