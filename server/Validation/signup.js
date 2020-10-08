const isEmpty = require('is-empty')
const validator = require('validator')

function validateSignupInput(data)
{
    let errors = {};
    
    // Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    
    // Usename checks
    if (validator.isEmpty(data.username))
        errors.username = "Username field is required";
    
    // Password checks
    let passErrs = []
    if (validator.isEmpty(data.password))
        passErrs.push("Password field is required");
    if (validator.isEmpty(data.password2))
        passErrs.push("Confirm password field is required");
    if (!validator.isLength(data.password, { min: 5, max: 30 }) || !validator.isLength(data.password2, { min: 5, max: 30 }))
        passErrs.push("Password must be at least 5 characters long");
    if (!validator.equals(data.password, data.password2))
        passErrs.push("Passwords must match");
    
    if (!isEmpty(passErrs))
        errors.password = passErrs

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

module.exports = validateSignupInput