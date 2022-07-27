const Joi = require('joi');

const patchSchema = Joi.object({
    subscription: Joi.valid('starter', 'pro', 'business')
})

module.exports = patchSchema;