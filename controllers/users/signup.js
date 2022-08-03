const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
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
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({email, password: hashPassword, subscription, avatarURL, token});
    res.status(201).json({
        user: {
            email,
            subscription,
            avatarURL
        }
    });
}

module.exports = signup;