const isEmpty = require('is-empty')
const validator = require('validator')

function validateLoginInput(req, res, next)
{
    const { body } = req
    let errors = {};
    
    // Convert empty fields to an empty string so we can use validator functions
    body.username = !isEmpty(body.username) ? body.username : "";
    body.email = !isEmpty(body.email) ? body.email : "";
    body.password = !isEmpty(body.password) ? body.password : "";
    
    // Usename checks
    if (validator.isEmpty(body.username))
        errors.username = "Username field is required";    
    
    // Password checks
    if (validator.isEmpty(body.password))
        errors.password = "Password field is required";
    
    if (isEmpty(errors))
        next()
    else
        return res
            .status(400)
            .json(...errors);
}

module.exports = validateLoginInput