const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');
const JWT_SECRETE = '6thsemProj';

//end point for registering users api/auth/register
router.post('/register', [body('Phone').isLength({ min: 10, max: 10 }), body('Email').isEmail(), body('password').isAlphanumeric()], async (req, res) => {
    let success = false;
    // if error is present return error
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
    }

    //check if same user exists
    try {
        let user = await Users.findOne({ Email: req.body.Email });

        if (user) {
            return res.status(400).send(success,"user already exists");
        }

        //creating new user
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await Users.create({
            Phone: req.body.Phone,
            Email: req.body.Email,
            password: secPass,
            pan: req.body.pan,
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRETE);
        success = true;
        res.json({success, authToken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(success,"some error occured");
    }

})


//end point for login user /api/auth/login
router.post('/login', [body('Email').isEmail(), body('password', 'password cannot be blanked').exists()], async (req, res) => {

    let success = false;
    // if error is present return error
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
    }

    const { Email, password } = req.body;

    try {
        let user = await Users.findOne({ Email });

        if (!user) {
            return res.status(404).json({ success, errors: "use correct creadentials" });
        }

        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            success = false;
            return res.status(404).json({success, errors: "use correct creadentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRETE);
        success = true;
        res.json({ success,authToken });

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})


//get user details api/auth/getUser Login required
router.post('/getUser',fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await Users.findById(userId).select("-password");
        res.send(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})

module.exports = router;