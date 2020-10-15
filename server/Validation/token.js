const jwt = require("jsonwebtoken");
const { Keys } = require("@Config")

function validateToken(req, res, next)
{
    const { accesstoken, accessToken } = req.headers
    
    // console.log('headers', req.headers)
    // console.log('body', req.body)

    if (!accesstoken && !accessToken)
        return res.json({ error: "Token not provided!" });
        // return res.status(401).json({ error: "Token not provided!" });

    jwt.verify(accesstoken ? accesstoken : accessToken , Keys.secret, (err, decoded) => {
        if (err)
            return res.json({ error: "Unauthorized!" });
            // return res.status(401).json({ error: "Unauthorized!" });
        if (req.username !== decoded.username)
        req.userid = decoded.id
        next()
    })
}

module.exports = validateToken