function getKeys()
{
    if (!process.env.MONGO_URI || !process.env.SECRET_KEY)
        console.error('dotenv file not configured correctly, errors may occur..')

    return {
        mongoURI: process.env.MONGO_URI,
        secret: process.env.SECRET_KEY
    }
}

module.exports = Keys = getKeys()