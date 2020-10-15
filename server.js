require('module-alias/register')

require('dotenv').config()
const express = require('express')
const favicon = require('express-favicon')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path');
const { Keys } = require('@Config')
const { userRouter, accessRouter, collectionRouter } = require("@Routes");
// const passport = require("passport");
// const configPassport = require("@Config/passport");

const app = express()
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
const db = Keys.mongoURI

// Set favicon for application
app.use(favicon(path.join(__dirname,'server','Resources','favicon','favicon-dark.png')))
// app.use(favicon(path.join(__dirname,'server','Resources','favicon','favicon-light.png')))
// app.use(favicon(__dirname+'client/src/Resources/favicon/favicon.png'))

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(bodyParser.json())

// Connect to MongoDB
mongoose.connect(
    db,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
    .then(() => console.log("MongoDB successfully connected"))
    .catch((err) => console.log(err));

// Passport middleware
// app.use(passport.initialize());
// configPassport(passport)
app.use("/api/users", userRouter);
app.use("/api/access", accessRouter);
app.use("/api/collection", collectionRouter);

if (process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port, (() => console.log(`Server up and running on port ${port} !`)));

module.exports = {
    port
}