const {add, updateStatusContact} = require('./contact');
const {signupSchema, loginSchema, patchSchema, emailSchema} = require('./user');

module.exports = {
    add, 
    updateStatusContact,
    signupSchema,
    loginSchema,
    patchSchema,
    emailSchema
}