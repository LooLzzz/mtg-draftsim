require('module-alias/register')

const mongoose = require('mongoose');
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Keys } = require("@Config");
const { validateRegisterInput, validateLoginInput } = require("@Validation");
const { User } = require("@Models");

const router = express.Router()

/**
 * @route POST api/users/register
 * @desc Register user
 * @access Public
 */
router.post("/register", (req, res) =>
{
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid)
        return res.status(400).json(errors);

    User.findOne({
        $or: [
            { email: req.body.email },
            { username: req.body.username }
        ]
    }).then(user =>
    {
        if (!!user)
            return res.status(400).json({ message: "Username or Email already exist" });
        else
        {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) =>
            {
                bcrypt.hash(newUser.password, salt, (err, hash) =>
                {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                })
            })
        }
    })
})

/**
 * @route POST api/users/login
 * @desc Login user and return JWT token
 * @access Public
 */
router.post("/login", (req, res) =>
{
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid)
        return res.status(400).json(errors);
    const username = req.body.username;
    const password = req.body.password;

    // Find user by username
    User.findOne({ username }).then(user =>
    {
        // Check if user exists
        if (!user)
            return res.status(404).json({ message: "Username not found" });

        // Check password
        bcrypt.compare(password, user.password).then(isMatch =>
        {
            if (isMatch)
            {
                let token = jwt.sign({ id: user.id, username: user.username }, Keys.secret, { expiresIn: 31556926 /*1 year*/ })

                res.status(202).send({
                    id: user.id,
                    username: user.username,
                    accessToken: token
                })
            }
            else
                return res.status(400).json({ message: "Password incorrect" });
        })
    })
})

module.exports = router