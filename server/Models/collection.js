const mongoose = require('mongoose')
Schema = mongoose.Schema

// Create Schema
const CollectionSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    cards: {
        type: Object,
    }
});

const Collection = mongoose.model('collection', CollectionSchema)
module.exports = Collection