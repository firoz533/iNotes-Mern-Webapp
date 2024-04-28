const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'For All Time Always.'
const fetchuser = require('../middleware/fetchuser');

//CREATING USER USING POST REQUEST '/api/auth' (Doesn't require Auth)'
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    // res.send('Hello World');


    // const user = User(req.body);
    // user.save();
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // res.send(req.body);
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'Email Already Registered' })
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success,authToken });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    // .then(user=>res.json(user)).catch(err=>{console.log(err);
    // res.json({error:'Email Already Exists',errorType:err})
    // })
})

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password Cannot be blank').exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'plz login with correct credentials' });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ error: 'plz login with correct credentials' });
        }
        const data = {
            user: {
                id: user.id
            }
        }; 
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success,authToken });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/getuser',fetchuser,async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // console.log(req);s
        let userId = req.user;
        const user = await User.findById(userId).select('-password')
        res.send(user)
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router