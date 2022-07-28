const {add, updateStatusContact} = require('./contact');
const {signupSchema, loginSchema, patchSchema} = require('./user');

module.exports = {
    add, 
    updateStatusContact,
    signupSchema,
    loginSchema,
    patchSchema
}