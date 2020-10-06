function allAccess(req, res)
{
    res.status(200).json({message: 'Public'});
}

function userAccess(req, res)
{
    res.status(200).json({message: 'User'});
}

module.exports = {
    allAccess,
    userAccess
}