require('module-alias/register')

const mongoose = require('mongoose');
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Keys } = require("@Config");
const { validateSignupInput, validateLoginInput } = require("@Validation");
const { User, Collection } = require("@Models");
const isEmpty = require('is-empty');

const router = express.Router()

/**
 * @route POST api/users/signup
 * @desc Signup user
 * @access Public
 */
router.post("/signup", (req, res) =>
{
    // Form validation
    let { errors, isValid } = validateSignupInput(req.body);

    // Check validation
    if (!isValid)
        return res
            .status(400)
            .json({errors: errors});

    errors = {}
    User.findOne({username: req.body.username})
        .then(user => {
            if (user)
                errors.username = "Username already exists"
            
            User.findOne({email: req.body.email})
                .then(user => {
                    if (user)
                        errors.email = "Email already exists"
                    
                    if (!isEmpty(errors))
                        return res
                            .status(400)
                            .json({errors: errors})
                    //else
                    const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password
                    });
                    // Hash password before saving in database
                    bcrypt.genSalt(10, (err, salt) =>
                    {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => createNewUserCollection(user, res))
                                .catch(err => console.error(err));
                        })
                    })
                })
        })
})

function createNewUserCollection(user, res)
{
    const newCollection = new Collection({
        userid: mongoose.Types.ObjectId(user.id),
        cards: {}
    })
        .save()
        .then(collection => res.json({
            user,
            collection
        }))
        .catch(err => console.error(err));
}

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

                Collection.findOne({ userid: user.id })
                    .then(collection => {
                        res.status(202).send({
                            user: {
                                id: user.id,
                                username: user.username,
                                accessToken: token,
                                collection: {
                                    id: collection.id,
                                    cards: collection.cards ? collection.cards : {},
                                }
                            },
                        })
                    })
                    .catch(err => console.error(err))
            }
            else
                return res.status(400).json({ message: "Password incorrect" });
        })
    })
})

module.exports = router