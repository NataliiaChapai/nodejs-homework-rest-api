const Joi = require('joi');

const updateStatusContact = Joi.object({
    favorite: Joi.bool().required().messages({
        'any.required': 'missing field favorite'
      })
});

module.exports = updateStatusContact;