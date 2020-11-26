const mongoose = require('mongoose')
Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
} 
// ,{ versionKey: false }
);

const User = mongoose.model('users', UserSchema)
module.exports = User