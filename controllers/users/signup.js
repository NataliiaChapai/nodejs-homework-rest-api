const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { signupSchema } = require('../../schemas');
const { v4 } = require('uuid');
const {createError, sendEmail} = require('../../helpers')


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
    const verificationToken = v4();
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    await User.create({email, password: hashPassword, verificationToken, subscription, avatarURL, token});
    
    const mail = {
        to: email,
        subject: "Mail confirmation",
        html: `<a target="_blank" href='http://localhost:3000/api/users/verify/${verificationToken}'>Confirm email</a>`
    }

    await sendEmail(mail);
    
    res.status(201).json({
        user: {
            email,
            subscription,
            avatarURL
        }
    });
}

module.exports = signup;