require('module-alias/register')

const mongoose = require('mongoose');
const express = require("express");
const { Collection } = require("@Models");
const { validateToken } = require("@Validation");

const router = express.Router()

/**
 * @route POST api/collection/get
 * @desc Get user's collection
 * @access Public
 */
router.post(
    "/get",
    [validateToken],
    (req, res) => {
        const { userid } = req

        Collection.findOne({ userid })
            .then(collection => {
                const data = {id: collection.id, cards: collection.cards} //dont send back userid
                // console.log(data) //DEBUG
                res.json(data)
            })
            .catch(err => console.error(err));
    }
)

/**
 * @route POST api/collection/commit
 * @desc Get user's collection
 * @access Public
 */
router.post(
    "/commit",
    [validateToken],
    (req, res) => {
        const { userid } = req

        //TODO this
    }
)

module.exports = router