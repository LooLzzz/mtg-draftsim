require('module-alias/register')

const mongoose = require('mongoose');
const express = require("express");
const jwt = require("jsonwebtoken");
const { allAccess, userAccess } = require('@Controllers')

const router = express.Router()

function verifyToken(req, res, next)
{
    // let token = req.body["accessToken"]
    let token = req.headers["x-access-token"]
    
    // console.log('headers', req.headers)
    // console.log('body', req.body)

    if (!token)
        return res.status(401).send({ message: "No token provided!" });

    jwt.verify(token, Keys.secret, (err, decoded) => {
        if (err)
            return res.status(401).send({ message: "Unauthorized!" });
        req.userid = decoded.id
        next()
    })
}

/**
 * @route POST api/access/all
 * @desc Test content access level
 * @access Public
 */
router.get("/all", allAccess);

/**
 * @route POST api/access/user
 * @desc Test content access level
 * @access Public
 */
router.get("/user", [verifyToken], userAccess);

module.exports = router