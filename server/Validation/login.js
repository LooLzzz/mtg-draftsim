const isEmpty = require('is-empty')
const validator = require('validator')

function validateLoginInput(data)
{
    let errors = {};
    
    // Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    
    // Usename checks
    if (validator.isEmpty(data.username))
        errors.username = "Username field is required";    
    
    // Password checks
    if (validator.isEmpty(data.password))
        errors.password = "Password field is required";
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
}

module.exports = validateLoginInput