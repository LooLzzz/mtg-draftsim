require('module-alias/register')

const mongoose = require('mongoose');
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Keys } = require("@Config");
const { validateSignupInput, validateLoginInput } = require("@Validation");
const { User, Collection } = require("@Models");

const router = express.Router()

/**
 * @route POST api/users/signup
 * @desc Signup user
 * @access Public
 */
router.post(
    "/signup",
    [validateSignupInput],
    (req, res) => {
        const {username, password} = req.body

        User.findOne({username})
            .then(user => {
                if (user)
                    return res
                        .status(400)
                        .json({username: "Username already exists"})
                //else
                const newUser = new User({
                    username,
                    password
                });
                // Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) =>
                {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => createCollection(user, res))
                            .catch(err => {console.error(err); return null});
                    })
                })
            })
    }
)

function createCollection(user, res)
{
    const newCollection = new Collection({
        userid: mongoose.Types.ObjectId(user.id),
        // cards: []
    })
    
    newCollection
        .save()
        .then(collection => sendUserDataAsJson(res, user))
        .catch(err => console.error(err))
}

/**
 * @route POST api/users/login
 * @desc Login user and return JWT token
 * @access Public
 */
router.post(
    "/login",
    [validateLoginInput],
    (req, res) => {
        const {username, password} = req.body;

        // Find user by username
        User.findOne({ username }).then(user =>
        {
            // Check if user exists
            if (!user)
                return res
                    .status(400)
                    .json({ username: "Username not found" });

            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch =>
                {
                    if (isMatch)
                    {
                        sendUserDataAsJson(res, user)

                        // Collection.findOne({ userid: user.id })
                        //     .then(collection => sendUserDataAsJson(res, user, collection))
                        //     .catch(err => {console.error(err); return null});
                    }
                    else
                        return res
                            .status(400)
                            .json({ password: "Password incorrect" });
                })
                .catch(err => console.error(err))
        })
    }
)

function sendUserDataAsJson(res, user) //, collection)
{
    let accessToken = jwt.sign(
        { id: user.id, username: user.username },
        Keys.secret,
        { expiresIn: 31556926 /*1 year*/ }
    )
    
    res.status(200)
        .json({
            // id: user.id,
            username: user.username,
            accessToken,
            // collection: {
            //     id: collection.id,
            //     cards: collection.cards ? collection.cards : {},
            // }
        })
}

module.exports = router