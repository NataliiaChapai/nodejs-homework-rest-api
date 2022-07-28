const Joi = require('joi');

const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    subscription: Joi.string(),
    token: Joi.string()
})

module.exports = signupSchema;