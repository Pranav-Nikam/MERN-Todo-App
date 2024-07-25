const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
