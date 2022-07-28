const { Conflict } = require('http-errors');
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const createError = require('../../helpers/createError');
const { signupSchema } = require('../../schemas');


const signup = async(req, res) => {
    const {error} = signupSchema.validate(req.body);
    if (error) {
        throw createError(400, error.message)
    }
    const {email, password, subscription, token} = req.body;
    const user = await User.findOne({email});
    if (user) {
        throw new Conflict('Email in use')
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({email, password: hashPassword, subscription, token});
    res.status(201).json({
        user: {
            email,
            subscription
        }
    });
}

module.exports = signup;