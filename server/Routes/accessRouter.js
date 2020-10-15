require('module-alias/register')

const express = require("express");
const { validateToken } = require('@Validation')

const router = express.Router()

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
router.get(
    "/user",
    [validateToken],
    (req, res) => res.json({user: true})
)

module.exports = router