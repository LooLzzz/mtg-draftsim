const mongoose = require('mongoose')
Schema = mongoose.Schema

// Create Schema
const CollectionSchema = new Schema({
    userid: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    cards: {
        type: Object,
    }
});

const Collection = mongoose.model('collections', CollectionSchema)
module.exports = Collection