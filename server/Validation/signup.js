const isEmpty = require('is-empty')
const validator = require('validator')

function validateSignupInput(req, res, next)
{
    const { body } = req
    let errors = {};
    
    // Convert empty fields to an empty string so we can use validator functions
    body.username = !isEmpty(body.username) ? body.username : "";
    body.password = !isEmpty(body.password) ? body.password : "";
    body.password2 = !isEmpty(body.password2) ? body.password2 : "";
    
    // Usename checks
    if (validator.isEmpty(body.username))
        errors.username = "Username field is required";
    
    // Password checks
    let passErrs = []
    if (validator.isEmpty(body.password))
        passErrs.push("Password field is required");
    if (validator.isEmpty(body.password2))
        passErrs.push("Confirm password field is required");
    if (!validator.isLength(body.password, { min: 5, max: 30 }) || !validator.isLength(body.password2, { min: 5, max: 30 }))
        passErrs.push("Password must be at least 5 characters long");
    if (!validator.equals(body.password, body.password2))
        passErrs.push("Passwords must match");
    
    if (!isEmpty(passErrs))
        errors.password = passErrs

    if (isEmpty(errors))
        next()
    else
        return res
            .status(400)
            .json(...errors);
}

module.exports = validateSignupInput