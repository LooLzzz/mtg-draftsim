require('module-alias/register')

const mongoose = require('mongoose');
const express = require("express");
const jwt = require("jsonwebtoken");
const { Keys } = require("@Config")

const router = express.Router()

function verifyToken(req, res, next)
{
    // let { accessToken } = req.headers
    let { accesstoken } = req.headers
    
    // console.log('headers', req.headers)
    // console.log('body', req.body)

    if (!accesstoken)
        return res.json({ error: "Token not provided!" });
        // return res.status(401).json({ error: "Token not provided!" });

    jwt.verify(accesstoken, Keys.secret, (err, decoded) => {
        if (err)
            return res.json({ error: "Unauthorized!" });
            // return res.status(401).json({ error: "Unauthorized!" });
        req.userid = decoded.id
        next()
    })
}

/**
 * @route POST api/access/all
 * @desc Test content access level
 */
router.get("/all", (
    (req, res) => res.json({public: true})
))

/**
 * @route POST api/access/user
 * @desc Test content access level
 */
router.get("/user", [verifyToken], (
    (req, res) => res.json({user: true})
))

module.exports = router