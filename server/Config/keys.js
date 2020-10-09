/**
 * db connection keys
 * @type {{mongoURI: String}}
 */
const Keys = {
    mongoURI: process.env.MONGO_URI,
    secret: process.env.SECRET_KEY
}

module.exports = Keys