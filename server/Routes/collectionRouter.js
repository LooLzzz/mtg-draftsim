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
 * @route POST api/collection/get
 * @desc Signup user
 * @access Public
 */
router.post("/get", (req, res) =>
{
    //TODO all this
})